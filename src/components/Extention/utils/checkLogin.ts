import { changePopupState } from "./changePopupState";
import { checkLayoutBeforeInit } from "./checkLayoutBeforeInit";
import { initialization } from "./initialization";

export const checkLogin = (log: string, loginIsPossible: boolean, launchStatus: boolean, currentIP: string) => {
	const loggedLogin = document.querySelector(".logged__login") as HTMLButtonElement;
	const accountFio = document.querySelector(".account__fio") as HTMLInputElement;

	console.log("Запуск проверки логина");
	let currentLogin = "";
	let currentFio = "";
	chrome.storage.local.get(["fio"]).then((result) => {
		if (result.fio !== undefined) {
			accountFio.value = result.fio;
			currentFio = result.fio;
		}
	});
	chrome.storage.local.get(["logged"]).then((result) => {
		if (result.logged !== undefined) {
			if (loggedLogin) {
				if (log !== undefined && log !== result.logged) {
					loggedLogin.textContent = log;
					currentLogin = log;
				} else {
					loggedLogin.textContent = result.logged;
					currentLogin = result.logged;
				}
			}
			changePopupState("logged");
			checkLayoutBeforeInit();
			initialization(currentFio, currentLogin, loginIsPossible, launchStatus, currentIP);
		}
	});
};
