import { changePopupState } from "./changePopupState";
import { checkLayoutBeforeInit } from "./checkLayoutBeforeInit";
import { getAppData } from "./launchApp";

export const checkLogin = async (log: string, loginIsPossible: boolean, launchStatus: boolean) => {
	const loggedLogin = document.querySelector(".logged__login") as HTMLButtonElement;
	const accountFio = document.querySelector(".account__fio") as HTMLInputElement;

	console.log("Запуск проверки логина");
	let currentLogin = "";
	let currentFio = "";
	await chrome.storage.local.get(["fio"]).then((result) => {
		if (result.fio !== undefined) {
			accountFio.value = result.fio;
			currentFio = result.fio;
			console.log(`set to storage: logged, ${result.fio}`)
		}
	});
	await chrome.storage.local.get(["logged"]).then((result) => {
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
			const userData = {
				currentFio: currentFio,
				currentLogin: currentLogin,
				loginIsPossible: loginIsPossible,
				launchStatus: launchStatus,
			}
			changePopupState("logged");
			checkLayoutBeforeInit();
			getAppData(userData);
		}
	});
};
