export const getAppData = async (currentIP: string) => {
	let appData: object;
	console.log("Запрашиваем данные приложения");
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.contentScriptQuery == "appData") {
			appData = request.data;
			return appData;
		}
	});
	chrome.runtime.sendMessage({
		contentScriptQuery: "appData",
		data: "give me data",
		url: `${currentIP}appdata`,
	});
};
