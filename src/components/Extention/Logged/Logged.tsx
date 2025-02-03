import React, { useEffect } from "react";
import { logOut } from "../utils/logOut";
import { useAuth } from "../../../context/AuthContext"; // Используем контекст
import { checkStorage } from "../utils/checkStorage";

export const Logged = () => {
	const { userData, isLogged } = useAuth();

	useEffect(() => {
		console.log("Компонент <Logged /> загружен, вызываем checkStorage() с задержкой");
	
		setTimeout(() => {
		  checkStorage({ logged: userData.login, fio: userData.fio });
		}, 300); // ⏳ Даем 300 мс на отрисовку DOM
	  }, [userData]); // ✅ Теперь checkStorage() вызывается только после обновления userData

	  useEffect(() => {
		console.log("🔹 Компонент <Logged /> отрендерен!");
	  }, []);
	  

	return (
		<>
			<div className="logged" style={{ display: isLogged ? "flex" : "none" }}>
				<div className="logged__top">
					<p className="logged__user">{userData.fio}</p>
					<button className="logged__login">{userData.login}</button>
				</div>
				<div className="logged__bottom">
					<button className="logged__button" onClick={logOut}>
						Выйти
					</button>
				</div>
			</div>
			<div className="account account_hidden">
				<input className="account__fio" value={userData.fio} />
			</div>
			<p className="server-error">#####</p>
		</>
	);
};
