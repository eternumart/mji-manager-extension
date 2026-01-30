/**
 * Слушает ответ сервера после загрузки PDF. Данные приходят от бэкенда:
 * бэкенд отдаёт куски файла в DeepSeek, парсинг выполняется только в DeepSeek, не программно.
 */
export function pdfParserListener() {
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.type === "UPLOAD_COMPLETE") {
			console.log("Результат анализа DeepSeek (PDF):", message.data);

			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const tab = tabs[0];
				if (tab && tab.id !== undefined) {
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						func: sendDataToPopup,
						args: [message.data],
					});
				} else {
					console.error("Не удалось найти активную вкладку или получить tabId.");
				}
			});
		}
	});
}

/** Передаёт результат анализа DeepSeek в попап: сохраняем, вызываем вставку (MJIDATA + loadData), скрываем лоадер. */
function sendDataToPopup(data: any) {
	console.log("Результат анализа PDF (DeepSeek):", data);
	localStorage.setItem("parsedPDF", JSON.stringify(data));
	if (window.appVariables && window.appVariables.loaderPDF) {
		window.appVariables.loaderPDF.style.display = "none";
	}
	if (typeof (window as any).handleParsedPdfResult === "function") {
		(window as any).handleParsedPdfResult(data);
	}
}
