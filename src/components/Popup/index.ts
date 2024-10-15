import { appVariables } from "./constants";
import { createPopup } from "./createPopup";
import { setToStorage } from "./setToStorage";
import { setInitialDate } from "./setInitialDate";
import { setRatings } from "./setRatings";

interface appData {
	[key: string]: any;
  }
export let appData: appData = {};

export const launchApp = (currentFioValue: string, login: string, loginIsPossible: Boolean, launchStatus: Boolean, appDataString: any) => {
  type CustomWindow = Window & typeof globalThis;

  appData = appDataString;
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
  appVariables.html = (document.querySelector("#formCanvas") as unknown as CustomWindow).document.querySelector("html") || document.querySelector("html");

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
