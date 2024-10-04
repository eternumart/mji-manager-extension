import { launchApp } from "./launchApp";

export const getAppData = async (currentIP: string, userData: any) => {
	console.log("Запрашиваем данные приложения");
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.contentScriptQuery === "appData-response") {
			console.log("Запуск приложения с данными");
			init(request.data, userData);
		}
	});
	chrome.runtime.sendMessage({
		contentScriptQuery: "appData-request",
		data: "give me data",
		url: `${currentIP}appdata`,
	});
};

const init = (appData: any, userData: any) => {
	document.querySelector(".server-error")?.classList.remove("server-error_visible");
	chrome.tabs.query({ active: true }, (tabs) => {
		const tab = tabs[0];
		if (tab) {
			chrome.scripting.executeScript({
				args: [`${userData.currentFio}`, `${userData.login}`, userData.loginIsPossible, userData.launchStatus, JSON.stringify(appData)],
				target: { tabId: tab.id ?? 0, allFrames: true },
				func: launchApp,
			});
		}
	});
};
