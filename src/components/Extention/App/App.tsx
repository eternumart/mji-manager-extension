import React, { useEffect, useState } from "react";
import { EnviromentSwitch } from "../EnviromentSwitch/EnviromentSwitch";
import { UpdateLink } from "../UpdateLink";
import { Authorization } from "../Authorization";
import { Logged } from "../Logged";
import { Loader } from "../Loader";
import { useAppContext } from "../../../context/Context";
import { apiConfig } from "../../../apiConfig";
import { getAppData } from "../utils/launchApp";
import { Errors } from "../Errors/Errors";

function App() {
	const { isLogged, setIsLogged, setUserData, serverState, errorText, setErrors } = useAppContext();
	const [isLoaded, setIsLoaded] = useState(false);

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	useEffect(() => {
		console.log("🌍 Устанавливаем baseUrl:", baseUrl);

		chrome.storage.local.get(null, (result) => {
			console.log("📂 Все данные в storage:", result);

			if (result[baseUrl]?.currentFio && result[baseUrl]?.currentLogin) {
				console.log("✅ Пользователь найден в storage, авторизация подтверждена.");
				setIsLogged(true);
				setUserData({ fio: result[baseUrl].currentFio, login: result[baseUrl].currentLogin });
				getAppData(result[baseUrl]);
			} else {
				console.warn(`⚠️ В local storage нет данных для текущего baseUrl: ${baseUrl}.`);
			}
			setIsLoaded(true);
		});
	}, [serverState]);

	useEffect(() => {
		// ✅ Обрабатываем входящие ошибки
		const handleMessage = (request: any) => {
			if (request.contentScriptQuery === "Error-response") {
				console.error("🔴 Ошибка получена:", request.error);

				// ✅ Гарантируем, что `setErrors()` получает строку
				const errorMessage =
					typeof request.error === "string"
						? request.error
						: request.error?.message || "Произошла неизвестная ошибка";

				setErrors(errorMessage);
			}
		};

		chrome.runtime.onMessage.addListener(handleMessage);

		return () => {
			chrome.runtime.onMessage.removeListener(handleMessage);
		};
	}, []);

	// ✅ Убираем ошибку через 5 секунд, но только если она есть
	useEffect(() => {
		if (errorText) {
			const timer = setTimeout(() => {
				setErrors("");
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errorText]);

	return (
		<>
			<EnviromentSwitch />
			<UpdateLink />
			{isLogged && isLoaded ? <Logged /> : <Authorization />}
			{!isLoaded && <Loader />}
			<Errors />
		</>
	);
}

export default App;
