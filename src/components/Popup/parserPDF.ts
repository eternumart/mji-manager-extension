import { sendToBackground } from "./popupBridge";
import { searchAllInputs } from "./searchAllInputs";
import { renderPdfSteps } from "./pdfSteps";

/**
 * Загрузка PDF на сервер для анализа в DeepSeek.
 * Бэкенду передаём адрес и регистрационный № — чтобы выбирать только листы по этому дому, а не весь файл.
 * Запрос идёт через background (CORS), связь попап–background — через chrome.runtime или мост (postMessage).
 */
function initParserPDF(event: any) {
	event.preventDefault();

	const fileInput = window.appVariables.formParserPDFInput;
	const loader = window.appVariables.loaderPDF;

	if (!fileInput || !loader) {
		console.error("Не найдены элементы загрузки PDF");
		return;
	}

	const file = fileInput.files?.[0];
	if (!file) {
		alert("Файл не выбран");
		return;
	}

	const useAI = !!window.appVariables.aiswicherState;
	window.appVariables.pdfUseAI = useAI;

	// Обновляем данные формы: адрес и регистрационный № для выбора листов в PDF
	searchAllInputs();
	const address =
		(window.appVariables.address && String(window.appVariables.address).trim()) ||
		(window.appVariables.wholeAddress && String(window.appVariables.wholeAddress).trim()) ||
		"";
	const registrationNumber =
		(window.appVariables.registrationNumber && String(window.appVariables.registrationNumber).trim()) || "";

	renderPdfSteps(loader, useAI);
	loader.classList.add("form__loader_visible");

	const reader = new FileReader();
	console.log("Бэкенду передаём адрес / регистрационный №:", address || registrationNumber || "(не заданы)");
	reader.onload = function (e) {
		if (e.target?.result) {
			sendToBackground({
				type: "UPLOAD_PDF",
				fileName: file.name,
				fileData: e.target.result,
				useAI,
				address,
				registrationNumber,
			});
		}
	};
	reader.readAsDataURL(file);
}

export { initParserPDF };
