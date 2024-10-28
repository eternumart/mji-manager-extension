import { createPopup } from "./createPopup";
import { setToStorage } from "./setToStorage";
import { setInitialDate } from "./setInitialDate";
import { setRatings } from "./setRatings";

export const runApp = (currentFioValue: string, login: string, loginIsPossible: Boolean, launchStatus: Boolean, appData: any) => {
  const launchApp = (currentFioValue: string, login: string, loginIsPossible: Boolean, launchStatus: Boolean, appData: any) => {
    interface appData {
      [key: string]: any;
    }
    interface appVariables {
      [key: string]: any;
    }
    interface resultsDefectsInputs {
      [key: string]: any;
    }
    interface representativesInputs {
      [key: string]: any;
    }
    interface allRatesPercentsInputs {
      [key: string]: any;
    }
    
    // Хранилище всех переменных приложения
    const appVariables: appVariables = {};
    const resultsDefectsInputs: resultsDefectsInputs = {
      empty: true,
      inputs: [],
    };
    const representativesInputs: representativesInputs = {
      empty: true,
    };
    const allRatesPercentsInputs: allRatesPercentsInputs = {};

    window.appData = appData as appData;
    window.appVariables = appVariables;
    window.resultsDefectsInputs = resultsDefectsInputs;
    window.representativesInputs = representativesInputs;
    window.allRatesPercentsInputs = allRatesPercentsInputs;

    appVariables.currentFio = currentFioValue;
    appVariables.login = login;

    // Предотвращение двойного старта
    if (!localStorage.getItem("status")) {
      setToStorage(false, launchStatus, null, null);
    } else {
      const storageData = JSON.parse(localStorage.getItem("status") ?? "");
      if (storageData.init) {
        return;
      } else {
        if (loginIsPossible) {
          setToStorage(false, launchStatus, null, null);
        }
      }
    }

    // Определение наличия iFrame на странице встраивания
    const formCanvas = document.querySelector("#formCanvas") as HTMLIFrameElement | null;

    appVariables.html = formCanvas?.contentWindow?.document.querySelector("html") || document.querySelector("html");

    appVariables.wholeAddress = document.querySelector("#title")?.textContent;

    // Определение тегов head и body в документе
    appVariables.htmlHead = appVariables.html.querySelector("head");
    appVariables.htmlBody = appVariables.html.querySelector("body");

    // Определение страницы встраивания с фото или с отчетом
    appVariables.form = appVariables.htmlBody.querySelector("#formData107") || appVariables.htmlBody.querySelector("#formData181");

    if (appVariables.form.id === "formData107") {
      appVariables.currentPage = "photo";
    }
    // } else {
    if (appVariables.form.id === "formData181") {
      appVariables.currentPage = "main";
    }

    createPopup(appVariables.currentPage);
    setToStorage(true, true, null, null);

    setInitialDate(appVariables.inputDate);

    setRatings();
  };
  launchApp(currentFioValue, login, loginIsPossible, launchStatus, appData);
};

window.runApp = runApp;
