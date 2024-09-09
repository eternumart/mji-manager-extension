import { getAppData } from "./getAppData";
import { launchApp } from "./launchApp";

export const initialization = async (currentFio: string, login: string, loginIsPossible: boolean, launchStatus: boolean, currentIP: string) => {
	console.log("Запуск приложения");
	let appData: any;
    appData = getAppData(currentIP);
    console.log(appData);
	// function getAppDataFromServer() {
	// 	appData = getAppData(currentIP);
	// 	if (appData) {
	// 		setTimeout(getAppDataFromServer, 1000);
	// 	} else {
	// 		console.log(appData);
	// 		init();
	// 	}
	// }

	function init() {
		document.querySelector(".server-error")?.classList.remove("server-error_visible");
		chrome.tabs.query({ active: true }, (tabs) => {
			const tab = tabs[0];
			if (tab) {
				chrome.scripting.executeScript({
					args: [currentFio, login, loginIsPossible, launchStatus, appData],
					target: { tabId: tab.id ?? 0, allFrames: true },
					func: launchApp,
				});
			}
		});
	}
    init();
	//getAppDataFromServer();
};
