import { apiConfig } from "../apiConfig";
import { decodeToken } from "../components/Extention/utils/decodeToken";
import { pdfParserListener } from "../components/Extention/utils/messageUtils";

console.log("DOMEvaluator.ts loaded");

const STORAGE_KEY_API_BASE_URL = "apiBaseUrl";
const defaultBaseUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
export let baseUrl = defaultBaseUrl;
const loadingFlags = new Map<string, boolean>();

/** Всегда возвращает актуальный baseUrl: при перезапуске service worker читает из storage. */
function getBaseUrl(): Promise<string> {
	return new Promise((resolve) => {
		chrome.storage.local.get([STORAGE_KEY_API_BASE_URL], (result) => {
			const stored = result[STORAGE_KEY_API_BASE_URL];
			if (stored && typeof stored === "string") {
				baseUrl = stored;
			} else {
				baseUrl = defaultBaseUrl;
			}
			resolve(baseUrl);
		});
	});
}

// Восстановить выбранный сервер при старте service worker
chrome.storage.local.get([STORAGE_KEY_API_BASE_URL], (result) => {
	if (result[STORAGE_KEY_API_BASE_URL]) {
		baseUrl = result[STORAGE_KEY_API_BASE_URL];
		console.log("🛠 Восстановлен сервер из storage:", baseUrl);
	}
});

pdfParserListener();

// Keep-alive для долгого PDF: частые события и вызовы API, чтобы SW не ушёл в сон (таймер 30s сбрасывается при событии/API).
const PDF_KEEPALIVE_INTERVAL_MS = 300;
const PDF_KEEPALIVE_STORAGE_KEY = "mjiPdfKeepAlive";
let pdfUploadPort: chrome.runtime.Port | null = null;
let pdfKeepAliveIntervalId: ReturnType<typeof setInterval> | null = null;

chrome.runtime.onConnect.addListener((port) => {
	if (port.name === "pdf-upload") {
		pdfUploadPort = port;
		port.onMessage.addListener(() => {});
		port.onDisconnect.addListener(() => {
			pdfUploadPort = null;
			if (pdfKeepAliveIntervalId) {
				clearInterval(pdfKeepAliveIntervalId);
				pdfKeepAliveIntervalId = null;
			}
			chrome.storage.local.remove(PDF_KEEPALIVE_STORAGE_KEY, () => {});
		});
	}
});

function stopPdfKeepAlive() {
	if (pdfKeepAliveIntervalId) {
		clearInterval(pdfKeepAliveIntervalId);
		pdfKeepAliveIntervalId = null;
	}
	if (pdfUploadPort) {
		try {
			pdfUploadPort.disconnect();
		} catch (_) {}
		pdfUploadPort = null;
	}
	chrome.storage.local.remove(PDF_KEEPALIVE_STORAGE_KEY, () => {});
}

/** Одно "касание" — сброс таймера неактивности (вызов API). Вызывать из цикла чтения потока и из тика. */
function pdfKeepAliveTouch() {
	chrome.storage.local.set({ [PDF_KEEPALIVE_STORAGE_KEY]: Date.now() }, () => {});
}

function startPdfKeepAlive() {
	if (pdfKeepAliveIntervalId) return;
	const tick = () => {
		if (pdfUploadPort) {
			try {
				pdfUploadPort.postMessage({ type: "ping" });
			} catch (_) {}
		}
		pdfKeepAliveTouch();
		chrome.runtime.getPlatformInfo?.().then(() => {}).catch(() => {});
	};
	tick();
	pdfKeepAliveIntervalId = setInterval(tick, PDF_KEEPALIVE_INTERVAL_MS);
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.type === "REPHRASE_DEFECTS_BLOCK") {
		const REPHRASE_TIMEOUT_MS = 120000; // 2 минуты — перефразирование может долго выполняться
		const tabId = sender.tab?.id;
		const frameId = sender.frameId ?? 0;

		const deliverRephraseResponse = (data: any, error: string | null) => {
			// Доставляем ответ в тот же таб/фрейм, откуда пришёл запрос (попап может быть в iframe — sendMessage туда не доходит)
			if (tabId != null) {
				chrome.scripting.executeScript(
					{
						target: { tabId, frameIds: [frameId] },
						func: (responseData: any, responseError: string | null) => {
							if (typeof (window as any).handleRephraseResponse === "function") {
								(window as any).handleRephraseResponse(responseData, responseError);
							}
						},
						args: [data, error],
					},
					() => {
						if (chrome.runtime.lastError) {
							console.warn("[MJI] executeScript handleRephraseResponse:", chrome.runtime.lastError.message);
						}
					}
				);
			}
			// Дублируем через sendMessage для попапа в main frame и моста
			chrome.runtime.sendMessage({
				type: "REPHRASE_DEFECTS_BLOCK_RESPONSE",
				data,
				error,
			}).catch((err) => {
				if (!String(err?.message || err).includes("Receiving end does not exist")) {
					console.warn("[MJI] sendMessage REPHRASE_DEFECTS_BLOCK_RESPONSE:", err);
				}
			});
		};
		try {
			const apiBase = await getBaseUrl();
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), REPHRASE_TIMEOUT_MS);
			const response = await fetch(
				`${apiBase}${apiConfig.routes.api.rephraseDefectsBlock}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ results: message.results }),
					signal: controller.signal,
				},
			);
			clearTimeout(timeoutId);
			const result = await response.json();
			deliverRephraseResponse(result.success ? result.data : null, result.error ?? result.message ?? null);
		} catch (error: any) {
			deliverRephraseResponse(null, error?.message || String(error));
		}
		return;
	}
	// Инжект панели на целевую вкладку. Если форма в iframe — инжектируем в тот фрейм, иначе в main.
	if (message.type === "INJECT_POPUP") {
		const data = message.data;
		const tabId = message.tabId;
		if (!data?.appData || !data.currentFio || !data.currentLogin) {
			console.error("❌ INJECT_POPUP: неполные данные");
			return;
		}
		if (!tabId) {
			console.error("❌ INJECT_POPUP: не передан tabId");
			return;
		}
		console.log("📌 [background] Инжект в вкладку:", tabId);

		const injectIntoFrame = (frameId: number) => {
			chrome.scripting.executeScript(
				{ target: { tabId, frameIds: [frameId] }, files: ["static/js/popup.js"] },
				() => {
					if (chrome.runtime.lastError) {
						console.error("❌ Инжект popup.js:", chrome.runtime.lastError.message);
						return;
					}
					setTimeout(() => {
						chrome.scripting.executeScript(
							{
								target: { tabId, frameIds: [frameId] },
								func: (currentFio: string, login: string, loginIsPossible: boolean, launchStatus: boolean, appData: unknown) => {
									if (typeof (window as any).runApp === "function") {
										(window as any).runApp(currentFio, login, loginIsPossible, launchStatus, appData);
									} else {
										console.error("runApp не найден на странице");
									}
								},
								args: [data.currentFio, data.currentLogin, data.loginIsPossible, false, data.appData],
							},
							() => {
								if (chrome.runtime.lastError) {
									console.error("❌ Вызов runApp:", chrome.runtime.lastError.message);
								}
							}
						);
					}, 100);
				}
			);
		};

		// Определить фрейм, в котором есть форма МЖИ (#formData107 или #formData181)
		chrome.scripting.executeScript(
			{
				target: { tabId, allFrames: true },
				func: () => !!(document.querySelector("#formData107") || document.querySelector("#formData181")),
			},
			(results) => {
				if (chrome.runtime.lastError) {
					console.error("❌ Поиск фрейма с формой:", chrome.runtime.lastError.message);
					injectIntoFrame(0);
					return;
				}
				const frameWithForm = results?.find((r: { result?: boolean }) => r.result === true);
				const frameId = frameWithForm && "frameId" in frameWithForm ? (frameWithForm as { frameId: number }).frameId : 0;
				console.log("📌 [background] Фрейм с формой:", frameId, frameId === 0 ? "(main)" : "(iframe)");
				injectIntoFrame(frameId);
			}
		);
		return;
	}
	// Загрузка PDF: fetch в service worker; keep-alive (порт + пинг каждую 1 с) не даёт SW уйти в неактивен.
	if (message.type === "UPLOAD_PDF") {
		const tabId = sender.tab?.id;
		const frameId = sender.frameId ?? 0;
		startPdfKeepAlive();

		const deliverPdfStepUpdate = (stepIndex: number, status: "done" | "pending" | "error") => {
			if (tabId != null) {
				chrome.scripting.executeScript(
					{
						target: { tabId, frameIds: [frameId] },
						world: "MAIN",
						func: (step: number, st: string) => {
							if (typeof (window as any).handlePdfStepUpdate === "function") {
								(window as any).handlePdfStepUpdate(step, st);
							}
						},
						args: [stepIndex, status],
					},
					() => {
						if (chrome.runtime.lastError) {
							console.warn("[MJI] executeScript handlePdfStepUpdate:", chrome.runtime.lastError.message);
						}
					}
				);
			}
			chrome.runtime.sendMessage({ type: "PDF_STEP_UPDATE", step: stepIndex, status }).catch(() => {});
		};

		const deliverPdfResult = (data: any, error: string | null) => {
			stopPdfKeepAlive();
			const runInFrame = () => {
				chrome.scripting.executeScript(
					{
						target: { tabId: tabId!, frameIds: [frameId] },
						world: "MAIN",
						func: (payload: any, err: string | null) => {
							if (err) {
								if (typeof (window as any).handlePdfFailed === "function") {
									(window as any).handlePdfFailed(err);
								}
								return;
							}
							if (typeof (window as any).handleParsedPdfResult === "function") {
								(window as any).handleParsedPdfResult(payload);
							}
						},
						args: [data, error],
					},
					() => {
						if (chrome.runtime.lastError) {
							console.warn("[MJI] executeScript handleParsedPdfResult:", chrome.runtime.lastError.message);
						}
					}
				);
			};
			if (tabId != null) {
				runInFrame();
			}
			chrome.runtime.sendMessage({ type: "UPLOAD_COMPLETE", data, error }).catch(() => {});
		};

		try {
			const apiBase = await getBaseUrl();
			pdfKeepAliveTouch();
			console.log(`PDF для анализа в DeepSeek: ${message.fileName} → ${apiBase}`);
			if (message.useAI) {
				console.log("Включено перефразирование дефектов через AI");
			}
			const payload = {
				fileName: message.fileName,
				fileData: message.fileData,
				useAI: message.useAI,
				address: message.address || "",
				registrationNumber: message.registrationNumber || "",
			};

			pdfKeepAliveTouch();
			const response = await fetch(`${apiBase.replace(/\/$/, "")}${apiConfig.routes.api.uploadPDF}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const text = await response.text();
				let result: any;
				try {
					result = text ? JSON.parse(text) : {};
				} catch {
					result = {};
				}
				deliverPdfResult(null, result?.message || result?.error || `HTTP ${response.status}`);
				return;
			}

			const body = response.body;
			if (body) {
				pdfKeepAliveTouch();
				const reader = body.getReader();
				const decoder = new TextDecoder();
				let buffer = "";
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;
						pdfKeepAliveTouch();
						buffer += decoder.decode(value, { stream: true });
						const lines = buffer.split("\n");
						buffer = lines.pop() || "";
						for (const line of lines) {
							const trimmed = line.trim();
							if (!trimmed) continue;
							pdfKeepAliveTouch();
							try {
								const obj = JSON.parse(trimmed);
								if (obj.keepalive === true) continue;
								if (obj.step !== undefined && obj.status) {
									deliverPdfStepUpdate(Number(obj.step), obj.status);
								} else if (obj.done && obj.data !== undefined) {
									deliverPdfResult(obj.data, obj.error ?? null);
									return;
								} else if (obj.data !== undefined || obj.error !== undefined) {
									deliverPdfResult(obj.data ?? null, obj.error ?? null);
									return;
								}
							} catch (_) {}
						}
					}
					if (buffer.trim()) {
						try {
							const obj = JSON.parse(buffer.trim());
							if (obj.keepalive === true) {
							} else if (obj.done && obj.data !== undefined) {
								deliverPdfResult(obj.data, obj.error ?? null);
								return;
							} else if (obj.data !== undefined || obj.error !== undefined) {
								deliverPdfResult(obj.data ?? null, obj.error ?? null);
								return;
							}
						} catch (_) {}
					}
				} finally {
					reader.releaseLock();
				}
				return;
			}

			const text = await response.text();
			console.log(`[MJI] PDF ответ получен: status=${response.status}, длина=${text?.length ?? 0}`);
			let result: any;
			try {
				result = text ? JSON.parse(text) : {};
			} catch {
				console.error("[MJI] Ответ бэкенда не JSON:", text?.slice(0, 200));
				deliverPdfResult(null, "Ответ сервера не JSON");
				return;
			}
			const parsedData = result?.data ?? result;
			deliverPdfResult(parsedData, result?.error ?? null);
		} catch (error: any) {
			console.error("Ошибка загрузки PDF:", error);
			deliverPdfResult(null, error?.message ?? "Ошибка загрузки");
			chrome.runtime.sendMessage({ type: "UPLOAD_FAILED", error: error?.message }).catch(() => {});
		}
	}
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	switch (request.contentScriptQuery) {
		case "activate-request": {
			if (!request.data.login || !request.data.password || !request.data.key) {
				console.error("❌ Поля активации не заполнены!");
				return;
			}
			console.log("📩 Запрос на активацию получен:", request.data);
			activation(request);
			break;
		}
		case "logIn-request": {
			login(request).then((response) => {
				console.log("✅ Авторизация завершена, отправляем logIn-response...");
				const decoded = decodeToken(response.accessToken);
				if (decoded) {
					response.fio = decoded.fio;
					response.login = decoded.login;
				}
				console.log("decoded token: ", decoded.fio, decoded.login);
				chrome.runtime.sendMessage({
					contentScriptQuery: "logIn-response",
					data: [response, decoded.login],
				});
				chrome.runtime.sendMessage({
					contentScriptQuery: "userData-response",
					data: [response, decoded.login],
				});
			});
			return;
		}
		case "savefio-request": {
			saveFio(request);
			console.log("savefio-request");
			break;
		}
		case "appData-request": {
			appData(request.data);
			break;
		}
		case "enviromentSwitch-request": {
			baseUrl = request.baseUrl;
			chrome.storage.local.set({ [STORAGE_KEY_API_BASE_URL]: request.baseUrl }, () => {
				console.log(`🛠 Сервер сохранён в storage: ${request.baseUrl}`);
			});
			console.log(`🛠 Запросы пойдут на ${request.enviroment} сервер: ${request.baseUrl}`);
			checkResponseFromServer(request);
			break;
		}
		case "app-loaded-response": {
			baseUrl = request.baseUrl;
			chrome.storage.local.set({ [STORAGE_KEY_API_BASE_URL]: request.baseUrl });
			break;
		}
		case "enviroment-check-request": {
			console.log("enviroment-check-request");
			getCurrentEnviroment();
			break;
		}
		case "logOut-request": {
			console.log("🔴 Получен запрос на выход");

			chrome.storage.local.clear(() => {
				console.log("✅ Кеш полностью очищен.");
			});

			sendResponse({ success: true });
			return true;
		}
	}
});

async function fetchWithRetry(url: string, options: RequestInit, retries: number = 1, useCache: boolean = false): Promise<any> {
	if (loadingFlags.get(url)) {
		return;
	}

	loadingFlags.set(url, true);

	for (let i = 0; i < retries; i++) {
		try {
			console.info(`⏳ Попытка доступа к серверу №${i + 1} по URL ${url}`);
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 5000); // ⏳ 5 секунд

			const response = await fetch(url, { ...options, signal: controller.signal });

			clearTimeout(timeout);

			if (!response.ok) {
				chrome.runtime.sendMessage({
					contentScriptQuery: "Error-response",
					error: `❌ Сервер недоступен. Статус: ${response.status}`,
				});
				loadingFlags.set(url, false);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			loadingFlags.set(url, false);

			if (retries === 3) {
				console.log("4! 📦 Сервер вернул данные пользователя.");
			}
			if (retries === 5) {
				console.log("9! 📦 Сервер прислал приложение.", data);
			}
			return data;
		} catch (error) {
			chrome.runtime.sendMessage({
				contentScriptQuery: "Error-response",
				error: `⚠️ Попытка загрузки #${i + 1} из ${retries} не удалась. Повторная попытка`,
			});
			if (i === retries - 1) {
				if (useCache) {
					const cachedData = await new Promise((resolve) => {
						chrome.storage.local.get([url], (result) => {
							resolve(result[url] || null);
						});
					});

					if (cachedData) {
						loadingFlags.set(url, false);

						chrome.runtime.sendMessage({
							contentScriptQuery: "Error-response",
							error: "⚠️ Все попытки подключения к серверу провалились, используем кешированные данные",
						});
						return cachedData;
					}
					chrome.runtime.sendMessage({
						contentScriptQuery: "Error-response",
						error: "❌ Все попытки подключения к серверу провалились. Данные в кеше отсутствуют.",
					});
				} else {
					chrome.runtime.sendMessage({
						contentScriptQuery: "Error-response",
						error: "❌ Все попытки подключения к серверу провалились.",
					});
				}
			}
		}
	}
}

async function getCurrentEnviroment() {
	const apiBase = await getBaseUrl();
	chrome.runtime.sendMessage({
		contentScriptQuery: "enviroment-check-response",
		enviroment: apiBase,
	});
}

async function checkResponseFromServer(request: any) {
	console.log("⏳ Проверка ответа сервера DOMEvaluator.ts");
	try {
		const url = `${request.baseUrl}${apiConfig.routes.api.checkResponseFromServer}`;

		// Выполняем запрос без использования флагов загрузки
		await fetchWithRetry(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			console.log(`🟢 Сервер ${request.enviroment} доступен: ${request.baseUrl}`);
		});
	} catch (error) {
		console.error(`🔴 Сервер ${request.enviroment} не доступен`, error);
	}
}

async function activation(request: any) {
	const apiBase = await getBaseUrl();
	console.log("⏳ Начат процесс активации через расширение...", apiBase);
	const url = `${apiBase}${apiConfig.routes.api.activation}`;

	try {
		// ✅ Отправляем запрос на сервер
		const data = await fetchWithRetry(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				login: request.data.login,
				password: request.data.password,
				key: request.data.key,
			}),
		});

		console.log("✅ Сервер вернул данные по активации:", data);

		// ✅ Отправляем данные обратно в `activateForm.tsx`
		chrome.runtime.sendMessage({
			contentScriptQuery: "activate-response", // 🔥 Здесь было "activation-response"
			data,
		});
	} catch (error) {
		console.error("❌ Ошибка при активации:", error);
		chrome.runtime.sendMessage({
			contentScriptQuery: "activate-response",
			error: "❌ Ошибка активации. Проверьте данные.",
		});
	}
}

async function login(request: any) {
	const apiBase = await getBaseUrl();
	const url = `${apiBase}${apiConfig.routes.api.login}`;

	try {
		const data = await fetchWithRetry(
			url,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: request.data }),
			},
			3, // 3 попытки доступа к серверу
			true
		);

		return data;
	} catch (error) {
		chrome.runtime.sendMessage({
			contentScriptQuery: "Error-response",
			error: error,
			flow: "logIn",
		});
		return { success: false, error: error };
	}
}

async function saveFio(request: any) {
	const apiBase = await getBaseUrl();
	const url = `${apiBase}${apiConfig.routes.api.saveFio}`;
	try {
		const data = await fetchWithRetry(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: request.data }),
		});
		chrome.runtime.sendMessage({ data, contentScriptQuery: "savefio-response" });
	} catch (error) {
		chrome.runtime.sendMessage({
			contentScriptQuery: "Error-response",
			error: error,
			flow: "savefio",
		});
	}
}
async function appData(request: any) {
	const apiBase = await getBaseUrl();
	console.log("8! ⏳ Получение данных приложения с сервера:", apiBase);
	const url = `${apiBase}${apiConfig.routes.api.getAppData}`;

	try {
		// ✅ Запрашиваем `appData` с сервера
		const data = await fetchWithRetry(
			url,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: request.data }),
			},
			5, // 5 попыток запроса к серверу
			true
		);

		console.log("10! ✅ Данные приложения получены с сервера:", data);
		chrome.runtime.sendMessage({
			contentScriptQuery: "appData-response",
			data: data,
			baseUrl: apiBase,
		});
	} catch (error: any) {
		console.warn("❌ Ошибка запроса `appData`, отправляем `empty` в `appData-response`...");
		chrome.runtime.sendMessage({
			contentScriptQuery: "appData-response",
			data: "empty",
			baseUrl: apiBase,
		});
	}
}

export {};
