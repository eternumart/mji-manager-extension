import React from "react";
import { randomFio } from "../utils/randomFio";
import { checkLogin } from "../utils/checkLogin";
import { initLoader } from "../utils/loader";
import { apiConfig } from "../../../apiConfig";

const Tabs = () => {
	function changeTab(clickedTab: any) {
		document.querySelector(".tabs__button_active")?.classList.remove("tabs__button_active");
		clickedTab.classList.add("tabs__button_active");
		document.querySelector(".auth__form_active")?.classList.add("auth__form_deactive");
		document.querySelector(".auth__form_active")?.classList.remove("auth__form_active");
		document.querySelector(`#${clickedTab.id.split("-")[0]}-form`)?.classList.add("auth__form_active");
		document.querySelector(`#${clickedTab.id.split("-")[0]}-form`)?.classList.remove("auth__form_deactive");
	}
	return (
		<div className='tabs'>
			<button className='tabs__button tabs__button_active tabs__button_login' id='login-tab' onClick={(e) => changeTab(e.target)}>
				Войти
			</button>
			<button className='tabs__button tabs__button_activate' id='activate-tab' onClick={(e) => changeTab(e.target)}>
				Активировать
			</button>
		</div>
	);
};

const ActivateForm = () => {
	return (
		<form className='auth__form auth__form_first auth__form_deactive' id='activate-form' action='submit'>
			<fieldset className='auth__input-wrapper'>
				<input type='email' className='auth__input' placeholder='Логин' id='login' required />
				<span className='auth__error'>Не верный логин</span>
			</fieldset>
			<fieldset className='auth__input-wrapper'>
				<input type='password' className='auth__input' placeholder='Пароль' id='password' required />
				<span className='auth__error'>Или пароль</span>
			</fieldset>
			<fieldset className='auth__input-wrapper'>
				<input type='text' className='auth__input' placeholder='Ключ' id='key' required />
				<span className='auth__error' id='error-key'>
					Не верный ключ
				</span>
			</fieldset>
			<input className='auth__button' id='activate-btn' value='Активировать' type='submit' />
		</form>
	);
};

const LoginForm = () => {
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
				contentScriptQuery: "logIn",
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

const Loader = () => {
	return (
		<div className='loader'>
			<svg width='39.994888' height='39.995743' viewBox='0 0 39.9949 39.9957' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
				<defs />
				<path
					id='Эллипс 1'
					d='M39.9949 19.502C39.8837 14.9831 38.2694 10.8332 35.6337 7.53418C32.6994 3.84775 28.7186 1.47783 24.4496 0.507446C19.857 -0.545227 15.2671 0.0838928 11.3244 1.98691C7.07748 4.02733 3.88116 7.38095 1.98517 11.327C-0.0630493 15.5702 -0.471069 20.185 0.506897 24.4523C1.55112 29.0468 4.10944 32.9092 7.53464 35.6358C11.0756 38.4649 15.2894 39.8909 19.5011 39.9957C19.7771 39.9957 20.001 39.7781 20.001 39.502C20.001 39.2258 19.7771 38.9955 19.5011 38.9955C15.2178 38.8846 11.2847 37.3521 8.15663 34.853C4.65451 32.0655 2.40311 28.2837 1.48123 24.2281C0.481201 19.8652 1.07886 15.5047 2.88672 11.7592C4.8251 7.72459 8.01105 4.68811 11.7598 2.8869C15.7908 0.941101 20.1749 0.553497 24.2289 1.48256C28.5936 2.47456 32.2629 4.90495 34.8531 8.15892C37.5352 11.5158 38.8898 15.5093 38.9945 19.5021C38.9945 19.7781 39.2249 20.002 39.501 20.002C39.7772 20.002 39.9949 19.7781 39.9949 19.502Z'
					fill='#1F5473'
					fill-opacity='1.000000'
					fill-rule='evenodd'
				/>
			</svg>
		</div>
	);
};

export const Authorization = () => {
	return (
		<div className='auth'>
			<Tabs />
			<ActivateForm />
			<Loader />
			<LoginForm />
		</div>
	);
};
