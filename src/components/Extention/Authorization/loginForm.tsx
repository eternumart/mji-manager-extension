import React from "react";
import { randomFio } from "../utils/randomFio";
import { checkLogin } from "../utils/checkLogin";
import { initLoader } from "../utils/loader";
import { apiConfig } from "../../../apiConfig";

export const LoginForm = () => {
	const logIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const currentIP = `${apiConfig.address.protocol}${apiConfig.address.ip}/`;
		const loginForm = document.querySelector("#login-form") as HTMLFormElement;
		const login = loginForm.querySelector("#login") as HTMLInputElement;
		const password = loginForm.querySelector("#password") as HTMLInputElement;
		const error = loginForm.querySelector("#error-login") as HTMLSpanElement;
		const errorActivation = loginForm.querySelector("#error-activation") as HTMLSpanElement;

		console.log("Запуск авторизации");
		//initLoader(loginForm, true);
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
			if (request.contentScriptQuery === "logIn") {
				let fio = "";
				if (request.data.loginIsPossible === true && request.data.activated) {
					if (request.data.fio) {
						fio = request.data.fio;
					} else {
						fio = randomFio();
					}
					chrome.storage.local.set({ logged: `${login.value}`, fio: `${fio}` }).then(() => {
						checkLogin(login.value, request.data.loginIsPossible, true, currentIP);
						//initLoader(loginForm, false);
					});
				} else {
					errorActivation.classList.add("auth__error_visible");
					errorActivation.textContent = request.data.activation;
					//initLoader(loginForm, false);
				}
			}
		});
		if (login.value !== "" && password.value !== "") {
			console.log("Step 1. Отправка запроса на сервер")
			chrome.runtime.sendMessage({
				contentScriptQuery: "logIn-request",
				data: {
					login: login.value,
					password: password.value,
				},
				url: `${currentIP}logIn`,
			});
		} else {
			errorActivation.classList.add("auth__error_visible");
			errorActivation.textContent = "Поля не могут быть пустыми";
			//initLoader(loginForm, false);
		}
	};
	return (
		<form className='auth__form auth__form_login auth__form_active' id='login-form' action='submit' onSubmit={logIn}>
			<fieldset className='auth__input-wrapper'>
				<input type='email' className='auth__input' placeholder='Логин' id='login' required multiple />
				<span className='auth__error' id='error-login'></span>
			</fieldset>
			<fieldset className='auth__input-wrapper'>
				<input type='password' className='auth__input' placeholder='Пароль' id='password' required />
				<span className='auth__error' id='error-activation'></span>
			</fieldset>
			<input className='auth__button' id='login-btn' value='Войти' type='submit' />
		</form>
	);
};