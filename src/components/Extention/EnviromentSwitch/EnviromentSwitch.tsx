import { useState } from "react";
import { apiConfig } from "../../../apiConfig";

export const EnviromentSwitch = () => {
	const [isDev, setIsDev] = useState(false);

	document.addEventListener("DOMContentLoaded", () => {
		chrome.runtime.sendMessage({
			contentScriptQuery: "app-loaded-response",
			enviroment: isDev ? "тестовый" : "основной",
			baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${isDev ? ":" + apiConfig.address.devPort : ""}/`,
		});
		console.log(isDev ? "Запущено сообщение с тестовым сервером" : "Запущено сообщение с основным сервером");
	});

	const handleSwitch = (evt: any) => {
		let dev = evt.target.checked;
		if (evt.target.checked) {
			setIsDev(true);
		} else {
			setIsDev(false);
		}
		chrome.runtime.sendMessage({
			contentScriptQuery: "enviromentSwitch-request",
			enviroment: dev ? "тестовый" : "основной",
			baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${dev ? ":" + apiConfig.address.devPort : ""}/`,
		});
		console.log(dev ? "Сервер изменен на тестовый" : "Сервер изменен на основной");
	};

	return (
		<div className='switcher'>
			<label className='switch'>
				<input type='checkbox' onChange={handleSwitch} />
				<span className='slider'></span>
			</label>{" "}
			<span>{isDev ? "Тестовый" : "Основной"}&nbsp;сервер</span>
		</div>
	);
};
