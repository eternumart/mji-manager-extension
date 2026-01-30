import { minimizeAppByEscape } from "./minimizeApp";
import { startDraggingDiv, removeDefaultDrag } from "./dragApp";
import { clearCache } from "./clearCache";
import { minimizeApp } from "./minimizeApp";
import { closeApp } from "./closeApp";
import { clearData } from "./clearData";
import { saveData } from "./saveData";
import { loadData } from "./loadData";
import { downloadPhotos } from "./downloadPhotos";
import { createFakeSelects } from "./createFakeSelects";
import { changeTab } from "./changeTab";
import { initParserUK } from "./parser";
import { initParserPDF } from "./parserPDF";
import { sendToBackground, onBackgroundResponse } from "./popupBridge";
import { updatePdfStep, hidePdfSteps } from "./pdfSteps";
import { normalizeDeepSeekResults } from "./normalizePdfResults";

export const createPopup = (currentPage: string) => {
	console.log("[MJI] createPopup старт", { currentPage, hasAppData: !!window.appData, hasAppLayout: !!window.appData?.appLayout });

	const popupLayout = window.appData.appLayout.popupLayout;
	const stylesLayout = window.appData.appLayout.stylesLayout;

	const htmlHead = window.appVariables.htmlHead ?? document.head;
	const htmlBody = window.appVariables.htmlBody ?? document.body;

	console.log("[MJI] Вставка разметки в", { htmlHead: !!htmlHead, htmlBody: !!htmlBody, bodyFirstChild: htmlBody?.firstElementChild?.tagName });

	try {
		htmlHead.insertAdjacentHTML("beforeEnd", stylesLayout);
		htmlBody.insertAdjacentHTML("afterBegin", popupLayout);
		console.log("[MJI] Разметка панели вставлена в document.body");
	} catch (e) {
		console.error("[MJI] Ошибка вставки разметки панели:", e);
		return;
	}

	window.appVariables.app = htmlBody.querySelector(".mji-manager-app");
	if (!window.appVariables.app) {
		console.error("[MJI] Не найден .mji-manager-app после вставки разметки");
		return;
	}

	window.appVariables.tabs = window.appVariables.app.querySelectorAll(".tabs__button");
	window.appVariables.tabsContent = window.appVariables.app.querySelectorAll(".content");
	window.appVariables.dragIco = window.appVariables.app.querySelector(".header__drag-button");
	window.appVariables.inputDate = window.appVariables.app.querySelector("#date");
	window.appVariables.cleanButton = window.appVariables.app.querySelector("#cleanButton");
	window.appVariables.minimizeButton = window.appVariables.app.querySelector("#minimizeButton");
	window.appVariables.closeButton = window.appVariables.app.querySelector("#closeButton");
	window.appVariables.copyButton = window.appVariables.app.querySelector("#copy");
	window.appVariables.clearDataButton = window.appVariables.app.querySelector("#clean");
	window.appVariables.pasteButton = window.appVariables.app.querySelector("#paste");
	window.appVariables.fakeSelectsButton = window.appVariables.app.querySelector("#fakeSelects");
	window.appVariables.photoDownload = window.appVariables.app.querySelector(".form");
	window.appVariables.submitButton = window.appVariables.photoDownload?.querySelector(".form__button");
	window.appVariables.formInput = window.appVariables.app.querySelector("#file");
	const accountLoginEl = window.appVariables.app.querySelector(".account-info__login");
	window.appVariables.userLogin = accountLoginEl?.querySelector("span");
	if (window.appData.functions.parser) {
		window.appVariables.formParser = window.appVariables.app.querySelector(".form_parser");
		window.appVariables.formParserInput = window.appVariables.app.querySelector("#fileInputParser");
		window.appVariables.formParserButton = window.appVariables.app.querySelector("#processBtnParser");
		window.appVariables.loader = window.appVariables.app.querySelector("#loader");
		window.appVariables.loaderText = window.appVariables.app.querySelector("#progressText");
		window.appVariables.formParser?.addEventListener("submit", initParserUK);
	}
	if (window.appData.functions.parserPDF) {
		window.appVariables.formParserPDF = window.appVariables.app.querySelector(".form_parserPDF");
		window.appVariables.formParserPDFInput = window.appVariables.app.querySelector("#fileInputParserPDF");
		window.appVariables.formParsefPDFButton = window.appVariables.app.querySelector("#processBtnParserPDF");
		window.appVariables.loaderPDF = window.appVariables.app.querySelector("#loaderPDF");
		window.appVariables.loaderPDFText = window.appVariables.app.querySelector("#progressTextPDF");
		window.appVariables.formParserPDF?.addEventListener("submit", initParserPDF);
	}
	window.appVariables.aiswicherState = false;
	if (window.appData.functions.useAI) {
		window.appVariables.aiswicher = window.appVariables.app.querySelector("#useAI");
		window.appVariables.aiswicher?.addEventListener("change", () => {
			window.appVariables.aiswicherState = window.appVariables.aiswicher?.checked ?? false;
		});
	}

	// Обработчики действий пользователя (все с ?. — элементы могут отсутствовать в layout)
	try {
		window.appVariables.dragIco?.addEventListener("mousedown", startDraggingDiv);
		window.appVariables.dragIco?.addEventListener("dragstart", removeDefaultDrag);
		window.appVariables.cleanButton?.addEventListener("click", clearCache);
		window.appVariables.minimizeButton?.addEventListener("click", minimizeApp);
		window.appVariables.closeButton?.addEventListener("click", closeApp);
		window.appVariables.clearDataButton?.addEventListener("click", clearData);
		window.appVariables.copyButton?.addEventListener("click", saveData);
		window.appVariables.pasteButton?.addEventListener("click", () => {
			const hasMJIDATA = localStorage.getItem("MJIDATA");
			// Перефразирование только если свитчер «AI обработка» включён и есть данные
			if (window.appData.functions.useAI && window.appVariables.aiswicherState && hasMJIDATA) {
				const MJIDATA = JSON.parse(hasMJIDATA);
				const results = MJIDATA["Результаты выборочного обследования"];
				if (results && typeof results === "object") {
					window.appVariables.pasteButton && (window.appVariables.pasteButton.textContent = "Перефразирование…");
					sendToBackground({ type: "REPHRASE_DEFECTS_BLOCK", results });
					return;
				}
			}
			loadData();
		});
		window.appVariables.photoDownload?.addEventListener("submit", downloadPhotos);
		window.appVariables.fakeSelectsButton?.addEventListener("click", createFakeSelects);

		window.appVariables.tabs?.forEach((tab: any) => {
			tab?.addEventListener("click", () => {
				changeTab(tab);
			});
		});
	} catch (e) {
		console.error("[MJI] Ошибка при подписке обработчиков:", e);
	}

	// Подстановка имени и логина пользователя
	if (window.appVariables.userLogin) {
		window.appVariables.userLogin.textContent = `${window.appVariables.currentFio}, ${window.appVariables.login}`;
	}

	// Установка табов и контента под текущую страницу
	window.appVariables.tabs?.forEach((tab: HTMLElement) => tab.classList.remove("tabs__button_active"));
	window.appVariables.tabsContent?.forEach((content: HTMLElement) => content.classList.add("content_deactive"));

	switch (currentPage) {
		case "main":
			window.appVariables.tabs?.[0]?.classList.add("tabs__button_active");
			window.appVariables.tabsContent?.[0]?.classList.remove("content_deactive");
			break;
		case "photo":
			window.appVariables.tabs?.[1]?.classList.add("tabs__button_active");
			window.appVariables.tabsContent?.[1]?.classList.remove("content_deactive");
			break;
		case "parser":
			window.appVariables.tabs?.[2]?.classList.add("tabs__button_active");
			window.appVariables.tabsContent?.[2]?.classList.remove("content_deactive");
			break;
		default:
			window.appVariables.tabs?.[0]?.classList.add("tabs__button_active");
			window.appVariables.tabsContent?.[0]?.classList.remove("content_deactive");
	}

	window.appVariables.html?.addEventListener("keyup", (evt: any) => {
		minimizeAppByEscape(evt);
	});

	// Вызывается из background через executeScript — ответ перефразирования доставляется в этот фрейм (в т.ч. iframe).
	(window as any).handleRephraseResponse = function (data: any, error: string | null) {
		if (error || !data) {
			console.warn("Ошибка перефразирования:", error);
			if (window.appVariables.pasteButton) {
				window.appVariables.pasteButton.textContent = "Вставка отчета";
			}
			return;
		}
		const MJIDATA = JSON.parse(localStorage.getItem("MJIDATA") || "{}");
		MJIDATA["Результаты выборочного обследования"] = data;
		localStorage.setItem("MJIDATA", JSON.stringify(MJIDATA));
		loadData();
		if (window.appVariables.pasteButton) {
			window.appVariables.pasteButton.textContent = "Вставка отчета";
		}
	};

	// Ответы от background: перефразирование (AI) и PDF. Связь через chrome.runtime или через мост (postMessage).
	onBackgroundResponse((message: any) => {
		if (message.type === "REPHRASE_DEFECTS_BLOCK_RESPONSE") {
			(window as any).handleRephraseResponse?.(message.data, message.error ?? null);
			return;
		}
		if (message.type === "UPLOAD_COMPLETE" && message.data && typeof (window as any).handleParsedPdfResult === "function") {
			(window as any).handleParsedPdfResult(message.data);
		}
		if (message.type === "UPLOAD_FAILED" && window.appVariables?.loaderPDF) {
			updatePdfStep(1, "error");
			hidePdfSteps(window.appVariables.loaderPDF, "Ошибка: " + (message.error || "загрузка не удалась"));
		}
	});

	// Ошибка загрузки/парсинга PDF — вызывается из background через executeScript.
	(window as any).handlePdfFailed = function (errorMessage: string) {
		if (!window.appVariables?.loaderPDF) return;
		updatePdfStep(1, "error");
		hidePdfSteps(window.appVariables.loaderPDF, "Ошибка: " + (errorMessage || "загрузка не удалась"));
	};

	// Обработчик результата анализа PDF (DeepSeek): парсинг готов → вставка на страницу.
	(window as any).handleParsedPdfResult = function (data: any) {
		console.log("[MJI] handleParsedPdfResult вызван, data:", !!data);
		if (!data || !window.appVariables) return;
		const raw = data.data || data;
		let results =
			raw["Результаты выборочного обследования"] ||
			raw["Результаты обследования"];
		const isEmptyResults =
			!results ||
			typeof results !== "object" ||
			Object.keys(results).length === 0;
		if (isEmptyResults && raw["результаты_обследования"]) {
			let rezObsled = raw["результаты_обследования"];
			if (typeof rezObsled === "string") {
				try {
					rezObsled = JSON.parse(rezObsled);
				} catch (_) {
					rezObsled = null;
				}
			}
			results = normalizeDeepSeekResults(rezObsled || {});
		}
		if (!results || typeof results !== "object" || Object.keys(results).length === 0) {
			console.warn("Нет блока «Результаты обследования» в ответе DeepSeek по PDF");
			if (window.appVariables.loaderPDF) {
				updatePdfStep(1, "error");
				hidePdfSteps(window.appVariables.loaderPDF, "Нет данных для вставки в ответе.");
			}
			return;
		}
		// Шаги: 1=Парсинг ✓, 2=Перефразирование (если AI) ✓, 3=Вставка — в процессе
		updatePdfStep(1, "done");
		if (window.appVariables.pdfUseAI) updatePdfStep(2, "done");
		updatePdfStep(3, "pending");
		const addressEl = window.appVariables.htmlBody?.querySelector("#comboboxTextcomp_12339");
		const addressValue = String(
			(addressEl && (addressEl as HTMLInputElement).value) ||
			window.appVariables.wholeAddress ||
			window.appVariables.address ||
			""
		).trim();
		const addr = addressValue;
		const parts = addr ? addr.split(",").map((s: string) => s.trim()) : ["", "", ""];
		let MJIDATA: Record<string, any> = {};
		try {
			const existing = localStorage.getItem("MJIDATA");
			if (existing) MJIDATA = JSON.parse(existing);
		} catch (_) {}
		MJIDATA.address = {
			area: parts[0] || "",
			district: parts[1] || "",
			address: addressValue || "",
		};
		MJIDATA["Результаты выборочного обследования"] = results;
		if (!MJIDATA["Выводы по результатам обследования"] || typeof MJIDATA["Выводы по результатам обследования"] !== "object") {
			MJIDATA["Выводы по результатам обследования"] = { "РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам": "" };
		} else if (MJIDATA["Выводы по результатам обследования"]["РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам"] === undefined) {
			MJIDATA["Выводы по результатам обследования"]["РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам"] = "";
		}
		localStorage.setItem("MJIDATA", JSON.stringify(MJIDATA));
		loadData();
		updatePdfStep(3, "done"); // Вставка выполнена
		if (window.appVariables.loaderPDF) {
			hidePdfSteps(window.appVariables.loaderPDF, "Готово. Данные вставлены.");
		}
	};
};
