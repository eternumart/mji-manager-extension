import { apiConfig } from "../apiConfig";
import { checkStorage } from "../components/Extention/utils/checkStorage";

console.log("DOMEvaluator.ts loaded");

let baseUrl: string;

checkStorage();


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
      console.log("savefio-request")
      break;
    }
    case "appData-request": {
      appData(request);
      console.log("appData-request")
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
      getCurrentEnviroment();
      console.log("enviroment-check-request")
      break;
    }
  }
});

async function getCurrentEnviroment() {
  chrome.runtime.sendMessage({
    contentScriptQuery: "enviroment-check-response",
    enviroment: baseUrl,
  });
}

async function checkResponseFromServer(request: any) {
  console.log(request.baseUrl);
  await fetch(`${request.baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((res) => {
    if (res.ok) {
      console.log(`Сервер ${request.enviroment} доступен`);
      baseUrl = request.baseUrl;
      return;
    }
    return console.error(`Сервер ${request.enviroment} не доступен`);
  });
}

async function activation(request: any) {
  await fetch(`${baseUrl}${apiConfig.routes.api.activation}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: request.data }),
  })
    .then(checkResponse)
    .then((res) => {
      chrome.runtime.sendMessage({
        data: res,
        contentScriptQuery: "activation-response",
      });
    })
    .catch((err) => {
      chrome.runtime.sendMessage({
        contentScriptQuery: "Error-response",
        error: `${err}`,
        flow: "activation",
      });
    });
}

async function login(request: any) {
  console.log("logIn flow from extention started", `${baseUrl}${apiConfig.routes.api.login}`);
  await fetch(`${baseUrl}${apiConfig.routes.api.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: request.data }),
  })
    .then(checkResponse)
    .then((res) => {
      chrome.runtime.sendMessage({
        data: res,
        contentScriptQuery: "logIn-response",
      });
    })
    .catch((err) => {
      chrome.runtime.sendMessage({
        contentScriptQuery: "Error-response",
        error: `${err}`,
        flow: "logIn",
      });
    });
}

async function saveFio(request: any) {
  await fetch(`${baseUrl}${apiConfig.routes.api.saveFio}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: request.data }),
  })
    .then(checkResponse)
    .then((res) => {
      chrome.runtime.sendMessage({
        data: res,
        contentScriptQuery: "savefio-response",
      });
    })
    .catch((err) => {
      chrome.runtime.sendMessage({
        contentScriptQuery: "Error-response",
        error: `${err}`,
        flow: "savefio",
      });
    });
}

async function appData(request: any) {
  await fetch(`${baseUrl}${apiConfig.routes.api.getAppData}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: request.data }),
  })
    .then(checkResponse)
    .then((res) => {
      console.log("Пришел ответ с данными");
      chrome.runtime.sendMessage({
        data: res,
        contentScriptQuery: "appData-response",
      });
    })
    .catch((err) => {
      chrome.runtime.sendMessage({
        contentScriptQuery: "Error-response",
        error: `${err}`,
        flow: "appData",
      });
    });
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
