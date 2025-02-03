import { changePopupState } from "./changePopupState";
import { checkLayoutBeforeInit } from "./checkLayoutBeforeInit";
import { getAppData } from "./launchApp";

export function checkStorage(request: any) {
  const userData = {
    currentFio: request.fio || "",
    currentLogin: request.logged || "",
    loginIsPossible: false,
    launchStatus: false,
  };

  const loggedLogin = document.querySelector(".logged__login") as HTMLButtonElement | null;
  const accountFio = document.querySelector(".account__fio") as HTMLInputElement | null;

  if (userData.currentLogin && userData.currentFio) {
    if (loggedLogin) {
      loggedLogin.textContent = userData.currentLogin;
    } else {
      console.warn("Элемент .logged__login не найден в DOM");
    }

    if (accountFio) {
      accountFio.value = userData.currentFio;
    } else {
      console.warn("Элемент .account__fio не найден в DOM");
    }

    changePopupState("logged");
    checkLayoutBeforeInit();
    getAppData(userData);
  } else {
    console.error("Не удалось получить данные из хранилища для автозаполнения.");
  }
}