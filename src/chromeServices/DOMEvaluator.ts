import { apiConfig } from "../apiConfig";
import { saveToCache } from "../components/Extention/utils/saveToCache";
import { decodeToken } from "../components/Extention/utils/decodeToken";

console.log("DOMEvaluator.ts loaded");

export let baseUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`; // По умолчанию выбран сервер Prod
let isLoading = false;
const loadingFlags = new Map<string, boolean>();

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
				console.log(response);
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
			});
			return;
		}
		case "setUsid-request": {
			setUsid(request);
			break;
		}
		case "savefio-request": {
			saveFio(request);
			console.log("savefio-request");
			break;
		}
		case "appData-request": {
			await appData(request);
			break;
		}
		case "checkusid-request": {
			checkUsid(request);
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

async function fetchWithRetryAndCache(url: string, options: RequestInit, retries: number = 1, useCache: boolean = false): Promise<any> {
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
				console.log("9! 📦 Сервер прислал приложение.");
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
		await fetchWithRetryAndCache(url, {
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
		const data = await fetchWithRetryAndCache(url, {
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
		const data = await fetchWithRetryAndCache(
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
		const data = await fetchWithRetryAndCache(url, {
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
	console.log("8! ⏳ Получение данных приложения.");
	const url = `${baseUrl}${apiConfig.routes.api.getAppData}`;

	try {
		const data = await fetchWithRetryAndCache(
			url,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: request.data }),
			},
			5, // 5 попыток доступа к серверу
			true
		);

		console.log("10! ✅ Данные приложения получены, сохраняем в кеш...");

		// ✅ Сохраняем в `chrome.storage.local` и ждем завершения
		await new Promise<void>((resolve) => {
			chrome.storage.local.set({ [baseUrl]: data }, () => {
				console.log("📦 ✅ Данные успешно сохранены в chrome.storage.local");
				resolve(); // 🔥 Теперь мы точно знаем, что данные сохранены
			});
		});

		// ✅ Теперь загружаем данные из `chrome.storage.local`
		chrome.storage.local.get(baseUrl, (result) => {
			if (result[baseUrl] && Object.keys(result[baseUrl]).length > 0) {
				console.log("📦 ✅ Загружены полные данные из кеша:", result[baseUrl]);
				chrome.runtime.sendMessage({
					contentScriptQuery: "appData-response",
					data: result[baseUrl], // ✅ Отправляем полные данные
				});
			} else {
				console.log("⚠️ ❌ Данных в кеше нет или они пустые!");
			}
		});
	} catch (error) {
		console.log("10.1! ❌ Данные приложения не получены. Загружаем из кеша...");

		// ✅ Если сервер недоступен, пробуем загрузить из кеша
		chrome.storage.local.get(baseUrl, (result) => {
			if (result[baseUrl] && Object.keys(result[baseUrl]).length > 0) {
				console.log("📦 ✅ Загружены полные данные из кеша.");
				chrome.runtime.sendMessage({
					contentScriptQuery: "appData-response",
					data: result[baseUrl],
				});
			} else {
				console.log("⚠️ ❌ Данных в кеше нет!");
			}
		});

		chrome.runtime.sendMessage({
			contentScriptQuery: "Error-response",
			error: error,
			flow: "appData",
		});
	}
}

async function setUsid(request: any) {
	fetch(`${request.url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({ data: request.data }),
	})
		.then(checkResponse)
		.then((res) => {
			chrome.runtime.sendMessage(res);
		});
	return true;
}

async function checkUsid(request: any) {
	await fetch(`${request.url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({ data: request.data }),
	})
		.then(checkResponse)
		.then((res) => {
			chrome.runtime.sendMessage(res);
		});
}

function checkResponse(res: any) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res);
}

export {};
