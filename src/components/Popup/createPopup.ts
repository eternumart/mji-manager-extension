import { appVariables } from "./constants";
import { minimizeAppByEscape } from "./minimizeApp";
import { startDraggingDiv, removeDefaultDrag  } from "./dragApp";
import { clearCache } from "./clearCache";
import { minimizeApp } from "./minimizeApp";
import { closeApp } from "./closeApp";
import { clearData } from "./clearData";
import { saveData } from "./saveData";
import { loadData } from "./loadData";
import { downloadPhotos } from "./downloadPhotos";
import { createFakeSelects } from "./createFakeSelects";
import { changeTab } from "./changeTab";
import { appData } from ".";

export const createPopup = (currentPage: any) => {
    const popupLayout = appData.appLayout.popupLayout;
	const stylesLayout = appData.appLayout.stylesLayout;

    appVariables.htmlHead.insertAdjacentHTML("beforeEnd", stylesLayout);
    appVariables.htmlBody.insertAdjacentHTML("afterBegin", popupLayout);
    appVariables.app = appVariables.htmlBody.querySelector(".mji-manager-app");
    appVariables.tabs = appVariables.app.querySelectorAll(".tabs__button");
    appVariables.tabsContent = appVariables.app.querySelectorAll(".content");
    appVariables.dragIco = appVariables.app.querySelector(".header__drag-button");
	appVariables.inputDate = appVariables.app.querySelector("#date");
	appVariables.cleanButton = appVariables.app.querySelector("#cleanButton");
	appVariables.minimizeButton = appVariables.app.querySelector("#minimizeButton");
	appVariables.closeButton = appVariables.app.querySelector("#closeButton");
	appVariables.copyButton = appVariables.app.querySelector("#copy");
	appVariables.clearDataButton = appVariables.app.querySelector("#clean");
	appVariables.pasteButton = appVariables.app.querySelector("#paste");
	appVariables.fakeSelectsButton = appVariables.app.querySelector("#fakeSelects");
	appVariables.photoDownload = appVariables.app.querySelector(".form");
	appVariables.submitButton = appVariables.photoDownload.querySelector(".form__button");
	appVariables.formInput = appVariables.app.querySelector("#file");
	appVariables.userLogin = appVariables.app.querySelector(".account-info__login").querySelector("span");

	// Обработчики действий пользователя
	appVariables.dragIco.addEventListener("mousedown", startDraggingDiv);
	appVariables.dragIco.addEventListener("dragstart", removeDefaultDrag);
	appVariables.cleanButton.addEventListener("click", clearCache);
	appVariables.minimizeButton.addEventListener("click", minimizeApp);
	appVariables.closeButton.addEventListener("click", closeApp);
	appVariables.clearDataButton.addEventListener("click", clearData);
	appVariables.copyButton.addEventListener("click", saveData);
	appVariables.pasteButton.addEventListener("click", loadData);
	appVariables.photoDownload.addEventListener("submit", downloadPhotos);
	appVariables.fakeSelectsButton.addEventListener("click", createFakeSelects);
	appVariables.tabs.forEach((tab: any) => {
		tab.addEventListener("click", () => {
			changeTab(tab);
		});
	});

    // Подстановка имени и логина пользователя
	appVariables.userLogin.textContent = `${appVariables.currentFio}, ${appVariables.login}`;

    // Установка табов и контента под текущую страницу
    currentPage === "main" ? appVariables.tabs[0].classList.add("tabs__button_active") : appVariables.tabs[1].classList.add("tabs__button_active");
    currentPage === "main" ? appVariables.tabsContent[1].classList.add("content_deactive") : appVariables.tabsContent[0].classList.add("content_deactive");

    appVariables.html.addEventListener("keyup", (evt: any) => {
        minimizeAppByEscape(evt);
    });
}