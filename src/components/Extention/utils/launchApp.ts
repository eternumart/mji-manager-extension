import { saveToCache } from "./saveToCache";

let lauchStarted: boolean = false;

export const getAppData = async (data: any, setLoading: (loading: boolean) => void) => {
	const fullData = {
		appData: {},
		currentFio: data.fio || "",
		currentLogin: data.login || "",
		loginIsPossible: data.loginIsPossible || false,
	};

	const listener = function (request: any) {
		if (request.contentScriptQuery === "appData-response") {
			// ✅ Проверяем, есть ли данные
			if (request.data === "empty") {
				const baseUrl = request.baseUrl;
				console.log("⚠️ `appData` пустая, пытаемся взять из кеша...");

				chrome.storage.local.get(baseUrl, (result) => {
					const cachedData = result[baseUrl]; // ✅ Используем `result[baseUrl]`
					if (cachedData?.currentFio && cachedData?.currentLogin && cachedData?.loginIsPossible && cachedData?.appData) {
						console.log("✅ Пользователь найден в `chrome.storage.local`, авторизация подтверждена.");
						init(cachedData);
					} else {
						console.log("⚠️ В кеше нет данных!");
						setLoading(false);
					}
				});

				chrome.runtime.onMessage.removeListener(listener);
				return;
			}

			// ✅ Обновляем `fullData` и запускаем приложение
			fullData.appData = request.data;
			if (fullData.currentFio !== "" && fullData.currentLogin !== "" && fullData.loginIsPossible) {
				console.log("11! ⚙️ Все данные приложения получены. Запуск.");
				setLoading(false);
				console.log("📦 Полные данные:", fullData);
				init(fullData);

				// ✅ Сохраняем `fullData` в `chrome.storage.local`
				saveToCache(request.baseUrl, fullData);
			}

			// ✅ Удаляем слушатель после успешного ответа
			chrome.runtime.onMessage.removeListener(listener);
		}
	};

	// ✅ Добавляем слушатель ОДИН раз
	chrome.runtime.onMessage.addListener(listener);

	// ✅ Отправляем запрос на сервер
	console.log("📤 Отправляем `appData-request`...");
	chrome.runtime.sendMessage({
		contentScriptQuery: "appData-request",
		data: "⛓️",
	});
};


const init = (data: any) => {
	if (lauchStarted) {
		return;
	}

	document.querySelector(".server-error")?.classList.remove("server-error_visible");
	lauchStarted = true;
	chrome.tabs.query({ active: true }, (tabs) => {
		const tab = tabs[0];
		if (tab) {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id ?? 0, allFrames: false },
					files: ["static/js/popup.js"],
				},
				() => {
					// После успешной инъекции вызываем функцию runApp с необходимыми аргументами
					chrome.scripting.executeScript({
						target: { tabId: tab.id ?? 0, allFrames: false },
						func: (currentFio, login, loginIsPossible, launchStatus, appData) => {
							// Вызов функции runApp, экспортированной из popup.js
							if (typeof window.runApp === "function") {
								window.runApp(currentFio, login, loginIsPossible, launchStatus, appData);
							} else {
								console.error("runApp is not defined.");
							}
						},
						args: [`${data.currentFio}`, `${data.currentLogin}`, data.loginIsPossible, false, data.appData],
					});
				}
			);
		}
	});
};
