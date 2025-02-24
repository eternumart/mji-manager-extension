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
			await appData(baseUrl);
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

// ✅ 1. Функция загрузки `appData`, сначала из кеша, затем с сервера, если нужно
async function appData(request: any) {
	console.log("8! ⏳ Получение данных приложения.");
	const url = `${baseUrl}${apiConfig.routes.api.getAppData}`;

	try {
		// ✅ Сначала пробуем загрузить данные из кеша
		let data = await waitForStorageData(baseUrl);

		// ✅ Если данных нет – запрашиваем с сервера
		if (!data) {
			console.log("🌍 🔄 Данных нет в кеше, запрашиваем `appData` с сервера...");
			data = await fetchWithRetryAndCache(
				url,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: request.data }),
				},
				5, // 5 попыток запроса к серверу
				true
			);

			console.log("10! ✅ Данные приложения получены, сохраняем в `chrome.storage.local` через `saveToCache`...");

			// ✅ Ждем завершения сохранения в `chrome.storage.local` через `saveToCache`
			await saveToCache(baseUrl, { appData: data });
		}

		// ✅ Теперь загружаем данные из кеша (после завершения записи)
		const cachedData = await waitForStorageData(baseUrl);

		// ✅ Отправляем `appData-response`
		console.log("🚀 Отправляем `appData-response` с актуальными данными.");
		chrome.runtime.sendMessage({
			contentScriptQuery: "appData-response",
			data: cachedData,
		});
	} catch (error) {
		console.log("10.1! ❌ Ошибка получения данных. Пробуем загрузить из кеша...");

		try {
			// ✅ Если сервер недоступен, пробуем загрузить из кеша
			const cachedData = await waitForStorageData(baseUrl);

			console.log("🚀 Отправляем `appData-response` после загрузки из кеша.");
			chrome.runtime.sendMessage({
				contentScriptQuery: "appData-response",
				data: cachedData,
			});
		} catch (cacheError) {
			console.log("⚠️ ❌ Данных нет ни на сервере, ни в кеше!");

			chrome.runtime.sendMessage({
				contentScriptQuery: "Error-response",
				error: cacheError,
				flow: "appData",
			});
		}
	}
}

// ✅ 2. Функция ожидания данных в `chrome.storage.local`
async function waitForStorageData(baseUrl: string, retries = 5, delay = 100) {
	for (let attempt = 1; attempt <= retries; attempt++) {
		const cachedData = await new Promise((resolve) => {
			chrome.storage.local.get(baseUrl, (result) => {
				resolve(result[baseUrl] || null);
			});
		});

		if (cachedData && Object.keys(cachedData).length > 0) {
			console.log(`📦 ✅ Данные найдены в 'chrome.storage.local' на попытке ${attempt}:`, cachedData);
			return cachedData;
		}

		console.log(`⚠️ ❌ Данных в кеше нет, попытка ${attempt}/${retries}. Ждем ${delay}мс...`);
		await new Promise((resolve) => setTimeout(resolve, delay));
	}

	throw new Error("Данных в кеше нет после всех попыток.");
}

// ✅ 3. Обработчик `appData-request`
chrome.runtime.onMessage.addListener((message) => {
	if (message.contentScriptQuery === "appData-request") {
		console.log("📥 Получен `appData-request`, загружаем данные...");
		appData(message.data);
	}
});

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
