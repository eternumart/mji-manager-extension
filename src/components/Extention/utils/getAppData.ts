import { initApp } from "./launchApp";

export const getAppData = async (currentIP: string, userData: any) => {
  console.log("Запрашиваем данные приложения");
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.contentScriptQuery === "appData-response") {
      console.log("Запуск приложения с данными");
      init(request.data, userData);
    }
  });
  chrome.runtime.sendMessage({
    contentScriptQuery: "appData-request",
    data: "give me data",
    url: `appdata`,
  });

  // Отправляем сообщение в background.js, чтобы загрузить файл
  chrome.runtime.sendMessage({ action: "fetchScript" }, (response) => {
    if (response.error) {
      console.error("Ошибка при получении скрипта:", response.error);
      return;
    }

    const scriptContent = response.scriptContent;

    // Выполняем полученный код
    try {
      const scriptFunc = new Function(scriptContent);
      scriptFunc(); // Выполняем код
    } catch (error) {
      console.error("Ошибка при выполнении динамического скрипта:", error);
    }
  });
};

const init = (appData: any, userData: any) => {
  console.log(appData);
  document.querySelector(".server-error")?.classList.remove("server-error_visible");
  chrome.tabs.query({ active: true }, (tabs) => {
    const tab = tabs[0];
    if (tab) {
      chrome.scripting.executeScript({
        args: [`${userData.currentFio}`, `${userData.currentlogin}`, userData.loginIsPossible, userData.launchStatus],
        target: { tabId: tab.id ?? 0, allFrames: true },
        func: initApp,
      });
    }
  });
};
