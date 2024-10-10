let scriptContent: string;
let appDataIsLoaded: boolean = false;
let uploadedAppData: any;

export const getAppData = async (currentIP: string, userData: any) => {
  console.log("Запрашиваем данные приложения");
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.contentScriptQuery) {
      case "appData-response": {
        console.log("Запуск приложения с данными");
        appDataIsLoaded = true;
        uploadedAppData = request.data;
        break;
      }
      case "fetchScript-response": {
        if (appDataIsLoaded) {
          console.log("Загрузка скрипта приложения");
          scriptContent = request.scriptContent;
          init(uploadedAppData, userData);
        }
        break;
      }
    }
  });
  chrome.runtime.sendMessage({
    contentScriptQuery: "fetchScript-request",
  });
  chrome.runtime.sendMessage({
    contentScriptQuery: "appData-request",
    data: "give me data",
    url: `appdata`,
  });
};

const init = (appData: any, userData: any) => {
  debugger;
  console.log(userData);
  console.log(appData);
  document.querySelector(".server-error")?.classList.remove("server-error_visible");
  chrome.tabs.query({ active: true }, (tabs) => {
    const tab = tabs[0];
    if (tab) {
      chrome.scripting.executeScript({
        args: [`${userData.currentFio}`, `${userData.currentlogin}`, userData.loginIsPossible, userData.launchStatusm],
        target: { tabId: tab.id ?? 0, allFrames: true },
        func: initApp,
      });
    }
  });
};

// Ваша функция initApp
export const initApp = (currentFio: string, login: string, loginIsPossible: boolean, launchStatus: boolean) => {
  debugger;
  console.log(currentFio, login, loginIsPossible, launchStatus);
  //document.querySelector("head")?.insertAdjacentHTML("beforeend", `<script src="http://mjimanager.ru:3000/public/appScript.js"></script>`);
  document.querySelector("body")?.insertAdjacentHTML("beforeend", `<script>${scriptContent}</script>`);
  //launchApp(currentFio, login, loginIsPossible, launchStatus);
};
