import { useState } from "react";
import { apiConfig } from "../../../apiConfig";

export const EnviromentSwitch = () => {
	const [isDev, setIsDev] = useState(false);

    chrome.runtime.sendMessage({
        contentScriptQuery: "app-loaded-response",
        enviroment: isDev ? "тестовый" : "основной",
        baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${isDev ? ":" + apiConfig.address.devPort : ""}/`,
    });

    console.log(isDev ? "Запущено сообщение с тестовым сервером" : "Запущено сообщение с основным сервером");

	const handleSwitch = (evt: any) => {
		evt.target.checked ? setIsDev(true) : setIsDev(false);
        chrome.runtime.sendMessage({
            contentScriptQuery: "enviromentSwitch-request",
            enviroment: isDev ? "тестовый" : "основной",
            baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${isDev ? ":" + apiConfig.address.devPort : ""}/`,
        });
        console.log(isDev ? "Сервер изменен на тестовый" : "Сервер изменен на основной")
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
