import "../../../styles/global.scss";
import styles from "../../../styles/components/App.module.scss";
import React, { useEffect, useState } from "react";
import { EnviromentSwitch } from "../EnviromentSwitch/EnviromentSwitch";
import { UpdateLink } from "../UpdateLink/UpdateLink";
import { Authorization } from "../Authorization/Authorization";
import { Logged } from "../Logged/Logged";
import { Loader } from "../Loader/Loader";
import { useAppContext } from "../../../context/Context";
import { apiConfig } from "../../../apiConfig";
import { getAppData } from "../utils/launchApp";
import { Errors } from "../Errors/Errors";

function App() {
	const { isLogged, setIsLogged, setUserData, serverState, errorText, setErrors, isLoading, setLoading } = useAppContext();

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	useEffect(() => {
		setLoading(true);
		console.log("🌍 Устанавливаем `baseUrl`:", baseUrl);

		chrome.storage.local.get(baseUrl, (result) => {
			console.log("📂 Все данные в `chrome.storage.local`:", result);

			if (result[baseUrl]?.currentFio && result[baseUrl]?.currentLogin) {
				console.log("✅ Пользователь найден в `chrome.storage.local`, авторизация подтверждена.");
				const userData = {
					fio: result[baseUrl].currentFio,
					login: result[baseUrl].currentLogin,
					loginIsPossible: true,
				};

				setIsLogged(true);
				setUserData(userData);

				// ✅ Загружаем `appData` с сервера или из кеша
				getAppData(userData, setLoading);
			} else {
				console.log(`⚠️ В кеше нет данных для текущего baseUrl: ${baseUrl}.`);
				setLoading(false);
			}
		});
	}, [serverState]);

	useEffect(() => {
		// ✅ Обрабатываем входящие ошибки
		const handleMessage = (request: any) => {
			if (request.contentScriptQuery === "Error-response") {
				console.error("🔴 Ошибка получена:", request.error);

				// ✅ Гарантируем, что `setErrors()` получает строку
				let errorMessage = "Произошла неизвестная ошибка";

				if (typeof request.error === "string") {
					errorMessage = request.error;
				} else if (request.error && typeof request.error === "object") {
					errorMessage = request.error.message || JSON.stringify(request.error);
				}

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

	useEffect(() => {
		const handleLoader = (request: any) => {
			if (request.contentScriptQuery === "loader-state-response") {
				console.log("🔄 Получен `loader-state-response`: ", request.isLoading);
				setLoading(request.isLoading);
			}
		};

		chrome.runtime.onMessage.addListener(handleLoader);

		return () => {
			chrome.runtime.onMessage.removeListener(handleLoader);
		};
	}, []);

	return (
		<div className={styles.mjiManagerApp}>
			<EnviromentSwitch />
			<UpdateLink />
			{isLogged ? <Logged /> : <Authorization />}
			{isLoading && <Loader />}
			<Errors />
		</div>
	);
}

export default App;
