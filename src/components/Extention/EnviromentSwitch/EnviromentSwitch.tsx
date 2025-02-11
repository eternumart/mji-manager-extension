import { useState } from "react";
import { useAppContext } from "../../../context/Context";
import { apiConfig } from "../../../apiConfig";

export const EnviromentSwitch = () => {
	const { serverState, setServerState } = useAppContext();
	const [isDev, setIsDev] = useState(serverState === "test");

	const handleSwitch = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const dev = evt.target.checked;
		setIsDev(dev);
		setServerState(dev ? "test" : "prod");

		chrome.runtime.sendMessage({
			contentScriptQuery: "enviromentSwitch-request",
			enviroment: dev ? "тестовый" : "основной",
			baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${dev ? ":" + apiConfig.address.devPort : ""}`,
		});

		console.log(dev ? "✅ Сервер изменен на тестовый" : "✅ Сервер изменен на основной");
	};

	return (
		<div className="switcher">
			<label className="switch">
				<input type="checkbox" checked={isDev} onChange={handleSwitch} />
				<span className="slider"></span>
			</label>{" "}
			<span>{isDev ? "Тестовый" : "Основной"}&nbsp;сервер</span>
		</div>
	);
};
