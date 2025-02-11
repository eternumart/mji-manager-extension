let appDataIsLoaded: boolean = false;
let lauchStarted: boolean = false;

export const getAppData = async (data: Object) => {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.contentScriptQuery === "appData-response") {
			console.log("11! ⚙️ Данные приложения получены. Запуск.");
			appDataIsLoaded = true;
			init(data);
		}
	});
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
