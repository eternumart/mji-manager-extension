import { createPopup } from "./createPopup";
import { setToStorage } from "./setToStorage";
import { setInitialDate } from "./setInitialDate";
import { setRatings } from "./setRatings";

// Лог в консоли целевой страницы — подтверждение, что скрипт инжектирован
console.log("[MJI] popup.js загружен на страницу");

export const runApp = (currentFioValue: string, login: string, loginIsPossible: Boolean, launchStatus: Boolean, appData: any) => {
	console.log("[MJI] runApp вызван", { login, hasAppData: !!appData, hasAppLayout: !!appData?.appLayout });

	const launchApp = (currentFioValue: string, login: string, loginIsPossible: Boolean, launchStatus: Boolean, appDataPayload: any) => {
		console.log("[MJI] launchApp (внутренняя) старт");
		interface IAppData {
			[key: string]: any;
		}
		interface IAppVariables {
			[key: string]: any;
		}
		interface IResultsDefectsInputs {
			[key: string]: any;
		}
		interface IRepresentativesInputs {
			[key: string]: any;
		}
		interface IAllRatesPercentsInputs {
			[key: string]: any;
		}

		// Хранилище всех переменных приложения
		const appVariables: IAppVariables = {};
		const resultsDefectsInputs: IResultsDefectsInputs = {
			empty: true,
			inputs: [],
		};
		const representativesInputs: IRepresentativesInputs = {
			empty: true,
		};
		const allRatesPercentsInputs: IAllRatesPercentsInputs = {};

		window.appData = appDataPayload as IAppData;
		window.appVariables = appVariables;
		window.resultsDefectsInputs = resultsDefectsInputs;
		window.representativesInputs = representativesInputs;
		window.allRatesPercentsInputs = allRatesPercentsInputs;

		appVariables.currentFio = currentFioValue;
		appVariables.login = login;

		// Предотвращение двойного старта (но при вызове из расширения после входа — всегда показываем панель)
		if (!localStorage.getItem("status")) {
			setToStorage(false, launchStatus, null, null);
		} else {
			const storageData = JSON.parse(localStorage.getItem("status") ?? "");
			// Не выходим, если runApp вызван после входа в расширении — панель должна отрисоваться
			if (storageData.init && !loginIsPossible) {
				return;
			}
			if (loginIsPossible) {
				setToStorage(false, launchStatus, null, null);
			}
		}

		// Документ, в котором выполняется скрипт (main frame или iframe, если инжект был в iframe)
		const topDoc = document;
		// Адрес и форма: по возможности из iframe #formCanvas (same-origin), иначе из текущего документа
		let contentDoc: Document | null = null;
		try {
			const formCanvas = topDoc.querySelector("#formCanvas") as HTMLIFrameElement | null;
			if (formCanvas?.contentWindow?.document) {
				contentDoc = formCanvas.contentWindow.document;
			}
		} catch {
			// Cross-origin iframe — доступа нет
		}
		const docForForm = contentDoc || topDoc;
		// Единый контекст: форма, поля (#comboboxTextcomp_12339 и др.) и панель — в одном документе (при форме в iframe — iframe)
		appVariables.html = docForForm.documentElement;
		appVariables.htmlHead = docForForm.head;
		appVariables.htmlBody = docForForm.body;

		appVariables.wholeAddress =
			docForForm.querySelector("#title")?.textContent ?? topDoc.querySelector("#title")?.textContent ?? "";

		appVariables.form =
			docForForm.querySelector("#formData107") || docForForm.querySelector("#formData181") || null;

		if (!appVariables.form) {
			console.log("[MJI] Форма не найдена в этом фрейме, выход");
			return;
		}

		if (window.location.origin === "https://dominfo3.ru") {
			appVariables.currentPage = "parser";
		} else if (appVariables.form.id === "formData107") {
			appVariables.currentPage = "photo";
		} else if (appVariables.form.id === "formData181") {
			appVariables.currentPage = "main";
		} else {
			appVariables.currentPage = "main";
		}

		console.log("[MJI] Вызов createPopup", { currentPage: appVariables.currentPage, doc: docForForm === topDoc ? "top" : "iframe" });
		createPopup(appVariables.currentPage);
		setToStorage(true, true, null, null);

		if (appVariables.inputDate) {
			setInitialDate(appVariables.inputDate);
		}
		if (appVariables.currentPage !== "parser") {
			setRatings();
		}
	};
	launchApp(currentFioValue, login, loginIsPossible, launchStatus, appData);
};

window.runApp = runApp;
