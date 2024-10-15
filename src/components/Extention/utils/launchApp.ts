import { launchApp } from "../../Popup/index";

let scriptContent: string;
let appDataIsLoaded: boolean = false;
let uploadedAppData: any;
let lauchStarted: boolean = false;

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
          init(uploadedAppData, userData, scriptContent.toString());
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

const init = (appData: any, userData: any, script: string) => {
  if (lauchStarted) {
    return;
  }
  console.log(userData);
  console.log(scriptContent);
  document.querySelector(".server-error")?.classList.remove("server-error_visible");
  lauchStarted = true;
  chrome.tabs.query({ active: true }, (tabs) => {
    const tab = tabs[0];
    if (tab) {
      chrome.scripting.executeScript({
        args: [`${userData.currentFio}`, `${userData.currentLogin}`, userData.loginIsPossible, userData.launchStatus, appData],
        target: { tabId: tab.id ?? 0, allFrames: true },
        func: launchApp,
      });
    }
  });
};
