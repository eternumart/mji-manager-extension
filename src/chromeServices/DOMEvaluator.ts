import { apiConfig } from "../apiConfig";
import { saveToCache } from "../components/Extention/utils/saveToCache";

console.log("DOMEvaluator.ts loaded");

export let baseUrl: string;
let isLoading = false;
const loadingFlags = new Map<string, boolean>();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	switch (request.contentScriptQuery) {
		case "activation-request": {
			if (!request.data.login || !request.data.password) {
				return;
			}
			activation(request);
			break;
		}
		case "logIn-request": {
			if (!request.data.login || !request.data.password) {
				console.log("logIn-request break");
				return;
			}

			console.log("🔹 logIn-request получен, начинаем авторизацию...");

			login(request)
				.then((response) => {
					console.log("✅ Авторизация завершена, отправляем logIn-response...");
					chrome.runtime.sendMessage({
						contentScriptQuery: "logIn-response",
						data: [response, request.data.login],
					});
				})
				.catch((error) => {
					console.error("❌ Ошибка авторизации:", error);
					chrome.runtime.sendMessage({
						contentScriptQuery: "logIn-response",
						data: { success: false, error: error.message },
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
			console.log("appData-request");
			await appData(request);
			break;
		}
		case "checkusid-request": {
			checkUsid(request);
			break;
		}
		case "enviromentSwitch-request": {
			console.log(`Запросы пойдут на ${request.enviroment} сервер.`);
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

async function fetchWithRetryAndCache(
	url: string,
	options: RequestInit,
	retries: number = 1, // ✅ По умолчанию запрос выполняется только 1 раз
	useCache: boolean = false
): Promise<any> {
	if (loadingFlags.get(url)) {
		console.log("Запрос уже выполняется:", url);
		return;
	}

	loadingFlags.set(url, true);
	isLoading = true;

	chrome.runtime.sendMessage({
		contentScriptQuery: "loader-state-response",
		isLoading: isLoading,
	});

	// ✅ Если `useCache = true`, проверяем кеш в локальном хранилище
	if (useCache) {
		const cachedData = await new Promise((resolve) => {
			chrome.storage.local.get([url], (result) => {
				resolve(result[url] || null);
			});
		});

		if (cachedData) {
			console.log("✅ Используем кешированные данные для:", url);
			loadingFlags.set(url, false);
			isLoading = false;
			chrome.runtime.sendMessage({
				contentScriptQuery: "loader-state-response",
				isLoading: isLoading,
			});
			return cachedData;
		}
	}

	// 🚀 Пытаемся выполнить запрос (для `login` и `appData` используется `retries = 5`)
	for (let i = 0; i < retries; i++) {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! статус: ${response.status}`);
			}
			const data = await response.json();

			// ✅ Если запрос успешен, кешируем только если `useCache === true`
			if (useCache) {
				saveToCache(url, data);
			}

			loadingFlags.set(url, false);
			isLoading = false;

			chrome.runtime.sendMessage({
				contentScriptQuery: "loader-state-response",
				isLoading: isLoading,
			});

			return data;
		} catch (error) {
			console.warn(`Попытка ${i + 1} не удалась: ${error}`);
			if (i === retries - 1) {
				throw new Error("❌ Все попытки подключения к серверу провалились.");
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
	console.log("Проверка ответа сервера DOMEvaluator.ts");
	try {
		const url = `${baseUrl}${apiConfig.routes.api.checResponseFromServer}`;

		// Выполняем запрос без использования флагов загрузки
		const data = await fetchWithRetryAndCache(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		console.log(`Сервер ${request.enviroment} доступен`);
		baseUrl = request.baseUrl;
	} catch (error) {
		console.error(`Сервер ${request.enviroment} не доступен`, error);
	}
}

async function activation(request: any) {
	console.log("Запуск процесса активации из расширения DOMEvaluator.ts");
	const url = `${baseUrl}${apiConfig.routes.api.activation}`;
	try {
		const data = await fetchWithRetryAndCache(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: request.data }),
		});
		chrome.runtime.sendMessage({ data, contentScriptQuery: "activation-response" });
	} catch (error) {
		chrome.runtime.sendMessage({
			contentScriptQuery: "Error-response",
			error: error,
			flow: "activation",
		});
	}
}

async function login(request: any) {
	console.log("🔹 Запуск процесса входа...");
	const url = `${baseUrl}${apiConfig.routes.api.login}`;

	try {
		const data = await fetchWithRetryAndCache(
			url,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: request.data }),
			},
			5, // ✅ Только `login()` использует 5 повторов
			true
		);

		chrome.runtime.sendMessage({ data, contentScriptQuery: "logIn-response" });

		return { success: true, user: data };
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
	console.log("🔹 Получение данных приложения...");
	const url = `${baseUrl}${apiConfig.routes.api.getAppData}`;

	try {
		const data = await fetchWithRetryAndCache(
			url,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: request.data }),
			},
			5, // ✅ `appData()` также использует 5 повторов
			true
		);

		chrome.runtime.sendMessage({ data, contentScriptQuery: "appData-response" });
	} catch (error) {
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
