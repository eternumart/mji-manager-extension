import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
//import { checkStorage } from "../utils/checkStorage";
import { logOut } from "../utils/logOut";
import { apiConfig } from "../../../apiConfig";
import { getAppData } from "../utils/launchApp";

export const Logged = () => {
	const { userData, isLogged, setIsLogged, setUserData, serverState } = useAuth();

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	useEffect(() => {
		console.log("Компонент <Logged /> загружен");

		setTimeout(() => {
			chrome.storage.local.get(baseUrl, (result) => {
				console.log("📂 Все данные в storage по baseUrl:", result);

				if (result[baseUrl].fio && result[baseUrl].login) {
					console.log("✅ Пользователь найден в storage, авторизация подтверждена.");
					setIsLogged(true);
					setUserData({ fio: result[baseUrl].fio, login: result[baseUrl].login });
					getAppData(result[baseUrl]);
				} else {
					console.warn("⚠️ В local storage нет данных для текущего `baseUrl`.");
				}
				// setIsLoaded(true);
			});
			//checkStorage({ logged: userData?.login, fio: userData?.fio });
		}, 300);
	}, [userData]);

	// Функция выхода из профиля
	const handleLogout = async () => {
		await logOut();
		setUserData(null);
		setIsLogged(false);
	};

	return (
		<>
			<div className="logged" style={{ display: isLogged ? "flex" : "none" }}>
				<div className="logged__top">
					<p className="logged__user">{userData?.fio}</p>
					<button className="logged__login">{userData?.login}</button>
				</div>
				<div className="logged__bottom">
					<button className="logged__button" onClick={handleLogout}>
						Выйти
					</button>
				</div>
			</div>
			<div className="account account_hidden">
				<input className="account__fio" value={userData?.fio} />
			</div>
			<p className="server-error">#####</p>
		</>
	);
};
