import { apiConfig } from "../apiConfig";
import { decodeToken } from "../components/Extention/utils/decodeToken";
import { pdfParserListener } from "../components/Extention/utils/messageUtils";

console.log("DOMEvaluator.ts loaded");

export let baseUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`; // По умолчанию выбран сервер Prod
let isLoading = false;
const loadingFlags = new Map<string, boolean>();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.type === "UPLOAD_PDF") {
		pdfParserListener(); // Подписываемся на события парсинга PDF
		try {
			console.log(`Получен PDF-файл: ${message.fileName}`);
			if(message.useAI){
				console.log("PDF будет обработан через AI")
			}
			// 🔹 Декодируем base64 (убираем префикс `data:application/pdf;base64,`)
			const base64Data = message.fileData.split(",")[1]; // Убираем префикс
			const binaryData = atob(base64Data);
			const uint8Array = new Uint8Array(binaryData.length);

			for (let i = 0; i < binaryData.length; i++) {
				uint8Array[i] = binaryData.charCodeAt(i);
			}

			// Подготавливаем base64 для отправки
			const fileBase64 = message.fileData; // Передаем полностью base64 строку

			// Теперь отправляем base64 строку как JSON
			const payload = {
				fileName: message.fileName,
				fileData: fileBase64,
				useAI: message.useAI,
				prevSurveyNumber: message.prevSurveyNumber,
			};

			const response = await fetch(`${baseUrl}${apiConfig.routes.api.uploadPDF}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const result = await response.json();
			chrome.runtime.sendMessage({ type: "UPLOAD_COMPLETE", data: result });
		} catch (error: any) {
			console.error("Ошибка загрузки PDF:", error);
			chrome.runtime.sendMessage({ type: "UPLOAD_FAILED", error: error.message });
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
			console.log(`🛠 Запросы пойдут на ${request.enviroment} сервер.`);
			baseUrl = request.baseUrl;
			checkResponseFromServer(request);
			break;
		}
		case "app-loaded-response": {
			baseUrl = request.baseUrl;
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
	isLoading = true;

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
					error: "❌ Сервер недоступен. Статус: ${response.status}",
				});
			}
			const data = await response.json();

			loadingFlags.set(url, false);
			isLoading = false;

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
						isLoading = false;

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
	chrome.runtime.sendMessage({
		contentScriptQuery: "enviroment-check-response",
		enviroment: baseUrl,
	});
}

async function checkResponseFromServer(request: any) {
	console.log("⏳ Проверка ответа сервера DOMEvaluator.ts");
	try {
		const url = `${baseUrl}${apiConfig.routes.api.checResponseFromServer}`;

		// Выполняем запрос без использования флагов загрузки
		await fetchWithRetry(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			console.log(`🟢 Сервер ${request.enviroment} доступен`);
			baseUrl = request.baseUrl;
		});
	} catch (error) {
		console.error(`🔴 Сервер ${request.enviroment} не доступен`, error);
	}
}

async function activation(request: any) {
	console.log("⏳ Начат процесс активации через расширение...");
	const url = `${baseUrl}${apiConfig.routes.api.activation}`;

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
	const url = `${baseUrl}${apiConfig.routes.api.login}`;

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
	const url = `${baseUrl}${apiConfig.routes.api.saveFio}`;
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
	console.log("8! ⏳ Получение данных приложения напрямую с сервера.");
	const url = `${baseUrl}${apiConfig.routes.api.getAppData}`;

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
			baseUrl: baseUrl,
		});
	} catch (error: any) {
		console.warn("❌ Ошибка запроса `appData`, отправляем `empty` в `appData-response`...");
		chrome.runtime.sendMessage({
			contentScriptQuery: "appData-response",
			data: "empty",
			baseUrl: baseUrl,
		});
	}
}

export {};
