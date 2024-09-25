import { getAppData } from "./getAppData";
import { launchApp } from "./launchApp";

export const initialization = async (currentFio: string, login: string, loginIsPossible: boolean, launchStatus: boolean, currentIP: string) => {
	console.log("Запуск приложения");
	let appData: any;
	appData = await getAppData(currentIP);
	console.log(appData);

	function init() {
		debugger
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
	appData ?? init();
};
