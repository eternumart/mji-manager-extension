export function pdfParserListener() {
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.type === "UPLOAD_COMPLETE") {
			// Логируем полученные данные для отладки
			console.log("Данные после загрузки:", message.data);

			// Передаем данные в инжектированный попап с использованием executeScript
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const tab = tabs[0];
				if (tab && tab.id !== undefined) {
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						func: sendDataToPopup,
						args: [message.data], // Передаем данные в функцию
					});
				} else {
					console.error("Не удалось найти активную вкладку или получить tabId.");
				}
			});
		}
	});
}

// Функция для отправки данных в попап
function sendDataToPopup(data: any) {
	console.log("Данные, полученные в попапе:", data);
	localStorage.setItem("parsedPDF", JSON.stringify(data));
    window.appVariables.loaderPDF.style.display = "none";
}
