import { apiConfig } from "../apiConfig";

console.log("DOMEvaluator.ts loaded");

export let baseUrl: string;
let isLoading = false;
const loadingFlags = new Map<string, boolean>();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.contentScriptQuery) {
    case "activation-request": {
      if (!request.data.login || !request.data.password) {
        return;
      }
      activation(request);
      break;
    }
    case "logIn-request": {
      if (!request.data.login || !request.data.password) {
        return;
      }
      login(request);
      console.log("logIn-request");
      break;
    }
    case "setUsid-request": {
      setUsid(request);
      break;
    }
    case "savefio-request": {
      saveFio(request);
      console.log("savefio-request");
      break;
    }
    case "appData-request": {
      console.log("appData-request");
      appData(request);
      break;
    }
    case "checkusid-request": {
      checkUsid(request);
      break;
    }
    case "enviromentSwitch-request": {
      console.log(`Запросы пойдут на ${request.enviroment} сервер.`);
      baseUrl = request.baseUrl;
      checkResponseFromServer(request);
      break;
    }
    case "app-loaded-response": {
      baseUrl = request.baseUrl;
      break;
    }
    case "enviroment-check-request": {
      console.log("enviroment-check-request");
      getCurrentEnviroment();
      break;
    }
  }
});

function saveToCache(url: string, data: any) {
  chrome.storage.local.set({ [url]: data }, () => {
    console.log(`Данные для ${url} сохранены в хранилище.`);
  });
}

async function fetchWithRetryAndCache(url: string, options: RequestInit, retries: number = 5): Promise<any> {
  // Проверяем, выполняется ли уже запрос
  if (loadingFlags.get(url)) {
    console.log("Запрос уже выполняется:", url);
    return; // Если запрос уже выполняется, просто выходим
  }

  // Устанавливаем флаг загрузки
  loadingFlags.set(url, true);
  isLoading = true;

  chrome.runtime.sendMessage({
    contentScriptQuery: "loader-state-response",
    isLoading: isLoading,
  });

  // Проверяем кэш в chrome.storage
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([url], async (result) => {
      if (result[url]) {
        console.log("Использование кешированных данных для:", url);
        loadingFlags.set(url, false); // Сбрасываем флаг загрузки
        isLoading = false;
        chrome.runtime.sendMessage({
          contentScriptQuery: "loader-state-response",
          isLoading: isLoading,
        });
        return resolve(result[url]);
      }

      // Выполняем запрос с повторными попытками
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! статус: ${response.status}`);
          }
          const data = await response.json();
          // Сохраняем результат в chrome.storage
          saveToCache(url, data);
          loadingFlags.set(url, false); // Сбрасываем флаг загрузки
          isLoading = false;
          chrome.runtime.sendMessage({
            contentScriptQuery: "loader-state-response",
            isLoading: isLoading,
          });
          return resolve(data);
        } catch (error) {
          console.warn(`Попытка ${i + 1} не удалась: ${error}`);
          if (i === retries - 1) {
            loadingFlags.set(url, false); // Сбрасываем флаг загрузки в случае ошибки
            isLoading = false;
            chrome.runtime.sendMessage({
              contentScriptQuery: "loader-state-response",
              isLoading: isLoading,
            });
            return reject(error); // Если это последняя попытка, выбрасываем ошибку
          }
        }
      }
    });
  });
}

async function getCurrentEnviroment() {
  chrome.runtime.sendMessage({
    contentScriptQuery: "enviroment-check-response",
    enviroment: baseUrl,
  });
}

async function checkResponseFromServer(request: any) {
  console.log("Проверка ответа сервера DOMEvaluator.ts");
  try {
    const url = `${baseUrl}${apiConfig.routes.api.checResponseFromServer}`;

    // Выполняем запрос без использования флагов загрузки
    const data = await fetchWithRetryAndCache(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log(`Сервер ${request.enviroment} доступен`);
    baseUrl = request.baseUrl;
  } catch (error) {
    console.error(`Сервер ${request.enviroment} не доступен`, error);
  }
}

async function activation(request: any) {
  console.log("Запуск процесса активации из расширения DOMEvaluator.ts");
  const url = `${baseUrl}${apiConfig.routes.api.activation}`;
  try {
    const data = await fetchWithRetryAndCache(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: request.data }),
    });
    chrome.runtime.sendMessage({ data, contentScriptQuery: "activation-response" });
  } catch (error) {
    chrome.runtime.sendMessage({
      contentScriptQuery: "Error-response",
      error: error,
      flow: "activation",
    });
  }
}

async function login(request: any) {
  console.log("Запуск процесса входа из расширения DOMEvaluator.ts");
  const url = `${baseUrl}${apiConfig.routes.api.login}`;
  try {
    const data = await fetchWithRetryAndCache(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: request.data }),
    });
    saveToCache(url, data);
    chrome.runtime.sendMessage({ data: data, contentScriptQuery: "logIn-response" });
  } catch (error) {
    chrome.runtime.sendMessage({
      contentScriptQuery: "Error-response",
      error: error,
      flow: "logIn",
    });
  }
}

async function saveFio(request: any) {
  const url = `${baseUrl}${apiConfig.routes.api.saveFio}`;
  try {
    const data = await fetchWithRetryAndCache(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: request.data }),
    });
    chrome.runtime.sendMessage({ data, contentScriptQuery: "savefio-response" });
  } catch (error) {
    chrome.runtime.sendMessage({
      contentScriptQuery: "Error-response",
      error: error,
      flow: "savefio",
    });
  }
}

async function appData(request: any) {
  console.log("Получение данных приложения из расширения DOMEvaluator.ts");
  const url = `${baseUrl}${apiConfig.routes.api.getAppData}`;
  try {
    const data = await fetchWithRetryAndCache(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: request.data }),
    });
    console.log(data);
    saveToCache(url, data);
    chrome.runtime.sendMessage({ data: data, contentScriptQuery: "appData-response" });
  } catch (error) {
    chrome.runtime.sendMessage({
      contentScriptQuery: "Error-response",
      error: error,
      flow: "appData",
    });
  }
}

async function setUsid(request: any) {
  fetch(`${request.url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: request.data }),
  })
    .then(checkResponse)
    .then((res) => {
      chrome.runtime.sendMessage(res);
    });
  return true;
}

async function checkUsid(request: any) {
  await fetch(`${request.url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: request.data }),
  })
    .then(checkResponse)
    .then((res) => {
      chrome.runtime.sendMessage(res);
    });
}

function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export {};
