import styles from "../../../styles/components/Logged.module.scss";
import React, { useEffect } from "react";
import { useAppContext } from "../../../context/Context";
import { logOut } from "../utils/logOut";
import { apiConfig } from "../../../apiConfig";
import { getAppData } from "../utils/launchApp";

export const Logged = () => {
	const { userData, isLogged, setIsLogged, setUserData, serverState, setLoading } = useAppContext();

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	useEffect(() => {
		console.log("⚙️ Компонент <Logged /> загружен");

		setTimeout(() => {
			chrome.storage.local.get(baseUrl, (result) => {
				console.log("📂 Все данные в storage по baseUrl:", result);

				if (isLogged) return;

				if (result[baseUrl].currentFio && result[baseUrl].currentLogin) {
					console.log("✅ Пользователь найден в storage, авторизация подтверждена.");
					setIsLogged(true);
					setUserData({ fio: result[baseUrl].currentFio, login: result[baseUrl].currentLogin });
					getAppData(result[baseUrl], setLoading);
				} else {
					console.warn("⚠️ В local storage нет данных для текущего `baseUrl`.");
				}
			});
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
			<div className={styles.logged} style={{ display: isLogged ? "flex" : "none" }}>
				<div className={styles.loggedTop}>
					<p className={styles.loggedUser}>{userData?.fio}</p>
					<button className={styles.loggedLogin}>{userData?.login}</button>
				</div>
				<div className={styles.loggedBottom}>
					<button className={styles.loggedButton} onClick={handleLogout}>
						Выйти
					</button>
				</div>
			</div>
			<div className={`${styles.account} ${styles.accountHidden}`}>
				<input className={styles.accountFio} value={userData?.fio} />
			</div>
		</>
	);
};
