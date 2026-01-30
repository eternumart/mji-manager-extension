import { saveToCache } from "./saveToCache";

export const getAppData = async (data: any, setLoading: (loading: boolean) => void) => {
	const fullData = {
		appData: {},
		currentFio: data.fio || "",
		currentLogin: data.login || "",
		loginIsPossible: data.loginIsPossible || false,
	};

	const listener = function (request: any) {
		if (request.contentScriptQuery === "appData-response") {
			if (request.data === "empty") {
				const baseUrl = request.baseUrl;
				console.log("⚠️ `appData` пустая, пытаемся взять из кеша...");

				chrome.storage.local.get(baseUrl, (result) => {
					const cachedData = result[baseUrl];
					if (cachedData?.currentFio && cachedData?.currentLogin && cachedData?.loginIsPossible && cachedData?.appData) {
						console.log("✅ Пользователь найден в `chrome.storage.local`, авторизация подтверждена.");
						saveToCache(baseUrl, cachedData);
						chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
							chrome.runtime.sendMessage({ type: "INJECT_POPUP", data: cachedData, tabId: tabs[0]?.id });
						});
					} else {
						console.log("⚠️ В кеше нет данных!");
						setLoading(false);
					}
				});

				chrome.runtime.onMessage.removeListener(listener);
				return;
			}

			fullData.appData = request.data;
			if (fullData.currentFio !== "" && fullData.currentLogin !== "" && fullData.loginIsPossible) {
				console.log("11! ⚙️ Все данные приложения получены. Запуск.");
				setLoading(false);
				console.log("📦 Полные данные:", fullData);
				saveToCache(request.baseUrl, fullData);
				// Вкладку определяем здесь (попап открыт из нужного окна), tabId передаём в background
				chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
					const tabId = tabs[0]?.id;
					chrome.runtime.sendMessage({ type: "INJECT_POPUP", data: fullData, tabId });
				});
			}

			chrome.runtime.onMessage.removeListener(listener);
		}
	};

	chrome.runtime.onMessage.addListener(listener);

	console.log("📤 Отправляем `appData-request`...");
	chrome.runtime.sendMessage({
		contentScriptQuery: "appData-request",
		data: "⛓️",
	});
};
