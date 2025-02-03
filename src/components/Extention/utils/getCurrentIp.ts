export const getCurrentIp = async (): Promise<string> => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { contentScriptQuery: "enviroment-check-request" },
        (response) => {
          if (response && response.enviroment) {
            resolve(response.enviroment);
          } else {
            console.error("Не удалось получить environment");
            resolve(""); // Возвращаем пустую строку в случае ошибки
          }
        }
      );
    });
  };