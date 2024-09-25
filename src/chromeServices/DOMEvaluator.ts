import { apiConfig } from "../apiConfig";

console.log("DOMEvaluator.ts loaded");

const baseUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}/`

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.contentScriptQuery == "activation") {
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
					contentScriptQuery: "activation",
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
	// if (request.contentScriptQuery == "setUsid") {
	// 	fetch(`${request.url}`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json;charset=utf-8",
	// 		},
	// 		body: JSON.stringify({ data: request.data }),
	// 	})
	// 		.then(checkResponse)
	// 		.then((res) => {
	// 			chrome.runtime.sendMessage(res);
	// 		});
	// 	return true;
	// }
	if (request.contentScriptQuery == "logIn") {
		
		if(!request.data.login || !request.data.password){
			return;
		}
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
	if (request.contentScriptQuery == "savefio") {
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
	if (request.contentScriptQuery == "appData") {
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
					contentScriptQuery: "appData",
				});
			})
			.catch((err) => {
				chrome.runtime.sendMessage({
					contentScriptQuery: "Error",
					error: `${err}`,
					flow: "appData",
				});
			});
	}
	// if (request.contentScriptQuery == "checkusid") {
	// 	await fetch(`${request.url}`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json;charset=utf-8",
	// 		},
	// 		body: JSON.stringify({ data: request.data }),
	// 	})
	// 		.then(checkResponse)
	// 		.then((res) => {
	// 			chrome.runtime.sendMessage(res);
	// 		});
	// }
	// if (request.contentScriptQuery == "checkIP") {
	// 	const variants = request.data;
	// 	let result = undefined;

	// 	await fetch(`http://${variants.local.ip}:${variants.local.port}/checkip`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then(checkResponse)
	// 		.then((res) => {
	// 			result = res.IP;
	// 			if (result !== undefined) {
	// 				chrome.runtime.sendMessage({
	// 					contentScriptQuery: "checkIP",
	// 					url: res.IP,
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log("Внешний IP");
	// 		});

	// 	 await fetch(`http://${variants.out.ip}:${variants.out.port}/checkip`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then(checkResponse)
	// 		.then((res) => {
	// 			result = res.IP;
	// 			if (result !== undefined) {
	// 				chrome.runtime.sendMessage({
	// 					contentScriptQuery: "checkIP",
	// 					url: res.IP,
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log("Локальный IP");
	// 		});
	// }
});

function checkResponse(res: any) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res);
}

export {};