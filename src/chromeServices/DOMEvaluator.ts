import { apiConfig } from "../apiConfig";

console.log("DOMEvaluator.ts loaded");

const baseUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}/`;

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
			break;
		}
		case "setUsid-request": {
			setUsid(request);
			break;
		}
		case "savefio-request": {
			saveFio(request);
			break;
		}
		case "appData-request": {
			appData(request);
			break;
		}
		case "checkusid-request": {
			checkUsid(request);
			break;
		}
	}
});

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
				contentScriptQuery: "Error",
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
				contentScriptQuery: "logIn",
			});
		})
		.catch((err) => {
			chrome.runtime.sendMessage({
				contentScriptQuery: "Error",
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
				contentScriptQuery: "savefio",
			});
		})
		.catch((err) => {
			chrome.runtime.sendMessage({
				contentScriptQuery: "Error",
				error: `${err}`,
				flow: "savefio",
			});
		});
}

async function appData(request: any) {
	let reqData: Object
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
			reqData = res;
		})
		.catch((err) => {
			chrome.runtime.sendMessage({
				contentScriptQuery: "Error",
				error: `${err}`,
				flow: "appData-response",
			});
		})
		// .finally(() => {
		// 	console.log("finally reqData sended to extension")
		// 	chrome.runtime.sendMessage({
		// 		data: reqData,
		// 		contentScriptQuery: "appData-response",
		// 	});
		// })
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
