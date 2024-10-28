import { getAppData } from "./launchApp";

export const checkStorage = async () => {
    const storageData = {
        currentFio: "",
        currentLogin: "",
        loginIsPossible: false,
        launchStatus: false,
      }

    storageData.currentFio = await getFromStorage("fio");
    storageData.currentLogin = await getFromStorage("login");
    if(storageData.currentFio !== "" && storageData.currentLogin !== "") {
        storageData.loginIsPossible = true;
    }

    getAppData(storageData);
}

async function getFromStorage(name: string) {
  await chrome.storage.sync.get([name]).then((res) => {
    if (res[name]) {
      return res[name] as string;
    }
  });
  return "";
}
