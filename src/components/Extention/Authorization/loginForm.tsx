import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { apiConfig } from "../../../apiConfig";
import { saveToCache } from "../utils/saveToCache";

export const LoginForm = () => {
	const { setIsLogged, setUserData, serverState } = useAuth();
	const [errorMessage, setErrorMessage] = useState("");

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const loginInput = document.querySelector("#login-auth") as HTMLInputElement;
		const passwordInput = document.querySelector("#password-auth") as HTMLInputElement;

		if (!loginInput || !passwordInput) {
			console.error("❌ Поля ввода не найдены!");
			return;
		}

		const login = loginInput.value;
		const password = passwordInput.value;

		if (!login || !password) {
			console.error("❌ Поля логина и пароля должны быть заполнены!");
			setErrorMessage("Введите логин и пароль.");
			return;
		}

		console.log("1!📤 Отправляем данные для авторизации...");

		chrome.runtime.sendMessage({
			contentScriptQuery: "logIn-request",
			data: { login, password },
			url: `${baseUrl}${apiConfig.routes.api.login}`
		});

		console.log(`2!📨 logIn-request отправлен на сервер (${serverState}), ожидаем logIn-response...`);
	};

	useEffect(() => {
		const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
		const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;


		const handleLoginResponse = (message: any) => {
			if (message.contentScriptQuery === "logIn-response") {
				const loginResponseData = message.data[0];
				const login = message.data[1];
	
				console.log("6! 🔹 Получен logIn-response:", message.data);
	
				if (loginResponseData.loginIsPossible) {
					console.log("7! ✅ Авторизация успешна:", login);
	
					setUserData({ fio: loginResponseData.fio, login: login });
					setIsLogged(true);
					setErrorMessage("");

					saveToCache(baseUrl, {
						fio: loginResponseData.fio,
						login: login,
						loginIsPossible: loginResponseData.loginIsPossible, // ✅ Передаём loginIsPossible
					});
					
					chrome.runtime.sendMessage({
						contentScriptQuery: "appData-request",
						serverState,
					});
				} else {
					console.error("❌ Ошибка авторизации");
					setErrorMessage("Ошибка авторизации. Проверьте логин и пароль.");
				}
			}
		};
	
		chrome.runtime.onMessage.addListener(handleLoginResponse);
		return () => chrome.runtime.onMessage.removeListener(handleLoginResponse);
	}, [serverState]);

	return (
		<form className="auth__form auth__form_login auth__form_active" id="login-form" action="submit" onSubmit={logIn}>
			<fieldset className="auth__input-wrapper">
				<input type="email" className="auth__input" placeholder="Логин" id="login-auth" required />
				<span className="auth__error" id="error-login"></span>
			</fieldset>
			<fieldset className="auth__input-wrapper">
				<input type="password" className="auth__input" placeholder="Пароль" id="password-auth" required />
				<span className="auth__error" id="error-activation">
					{errorMessage}
				</span>
			</fieldset>
			<input className="auth__button" id="login-btn" value="Войти" type="submit" />
		</form>
	);
};
