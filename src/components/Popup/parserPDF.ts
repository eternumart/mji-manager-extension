function initParserPDF(event: any) {
	event.preventDefault();

	const fileInput = window.appVariables.formParserPDFInput;
	const progressText = window.appVariables.loaderPDFText;
	const loader = window.appVariables.loaderPDF;

	if (!fileInput || !progressText || !loader) {
		console.error("Не найдены элементы для парсинга PDF");
		return;
	}

	const file = fileInput.files?.[0];
	if (!file) {
		alert("Файл не выбран");
		return;
	}

	loader.style.display = "block";
	progressText.textContent = `Файл загружен, идет обработка: ${file.name}`;

	const reader = new FileReader();
	reader.onload = function (e) {
		if (e.target?.result) {
			chrome.runtime.sendMessage({
				type: "UPLOAD_PDF",
				fileName: file.name,
				fileData: e.target.result,
				useAI: window.appVariables.aiswicherState
			});
		}
	};
	reader.readAsDataURL(file);
}

export { initParserPDF };
