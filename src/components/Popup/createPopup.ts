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

export const createPopup = (currentPage: any) => {
    const popupLayout = window.appData.appLayout.popupLayout;
	const stylesLayout = window.appData.appLayout.stylesLayout;

    window.appVariables.htmlHead.insertAdjacentHTML("beforeEnd", stylesLayout);
    window.appVariables.htmlBody.insertAdjacentHTML("afterBegin", popupLayout);
    window.appVariables.app = window.appVariables.htmlBody.querySelector(".mji-manager-app");
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
	window.appVariables.submitButton = window.appVariables.photoDownload.querySelector(".form__button");
	window.appVariables.formInput = window.appVariables.app.querySelector("#file");
	window.appVariables.userLogin = window.appVariables.app.querySelector(".account-info__login").querySelector("span");

	// Обработчики действий пользователя
	window.appVariables.dragIco.addEventListener("mousedown", startDraggingDiv);
	window.appVariables.dragIco.addEventListener("dragstart", removeDefaultDrag);
	window.appVariables.cleanButton.addEventListener("click", clearCache);
	window.appVariables.minimizeButton.addEventListener("click", minimizeApp);
	window.appVariables.closeButton.addEventListener("click", closeApp);
	window.appVariables.clearDataButton.addEventListener("click", clearData);
	window.appVariables.copyButton.addEventListener("click", saveData);
	window.appVariables.pasteButton.addEventListener("click", loadData);
	window.appVariables.photoDownload.addEventListener("submit", downloadPhotos);
	window.appVariables.fakeSelectsButton.addEventListener("click", createFakeSelects);
	window.appVariables.tabs.forEach((tab: any) => {
		tab.addEventListener("click", () => {
			changeTab(tab);
		});
	});

    // Подстановка имени и логина пользователя
	window.appVariables.userLogin.textContent = `${window.appVariables.currentFio}, ${window.appVariables.login}`;

    // Установка табов и контента под текущую страницу
    currentPage === "main" ? window.appVariables.tabs[0].classList.add("tabs__button_active") : window.appVariables.tabs[1].classList.add("tabs__button_active");
    currentPage === "main" ? window.appVariables.tabsContent[1].classList.add("content_deactive") : window.appVariables.tabsContent[0].classList.add("content_deactive");

    window.appVariables.html.addEventListener("keyup", (evt: any) => {
        minimizeAppByEscape(evt);
    });
}