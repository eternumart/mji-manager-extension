import React from "react";
import { checkLogin } from "../utils/checkLogin";
import { initLoader } from "../utils/loader";
import { apiConfig } from "../../../apiConfig";
import { getCurrentIp } from "../utils/getCurrentIp";

export const ActivateForm = () => {
	const activate = (e: React.FormEvent<HTMLFormElement>) => {
		console.log("Запуск активации продукта");
		const currentIP = getCurrentIp() as any;
		const activateForm = document.querySelector("#login-form") as HTMLFormElement;
		const login = activateForm.querySelector("#login") as HTMLInputElement;
		const password = activateForm.querySelector("#password") as HTMLInputElement;
		const activateFormKey = activateForm.querySelector("#key") as HTMLInputElement;
		const activateFormKeyError = activateForm.querySelector("#error-key") as HTMLInputElement;
		//initLoader(form, true);

		//const usid = generateID();

		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			console.log("Отправка данных формы логина в DOMEvaluator.ts из activateForm.ts")
			if (request.contentScriptQuery == "activation-response") {
				if (request.data.boolean == true) {
					chrome.storage.local.set({ logged: `${login}` }).then(() => {});
					checkLogin(login.value, true, true);
					//initLoader(form, false);
				}
				if (request.data.boolean === false) {
					activateFormKeyError.classList.add("auth__error_visible");
					//initLoader(form, false);
				}
			}
		});

		if (login.value !== "" && password.value !== "") {
			chrome.runtime.sendMessage({
				contentScriptQuery: "activation-request",
				data: {
					login: login.value,
					password: password.value,
					key: activateFormKey.value,
					//usid: usid,
				},
				url: `activation`,
			});
		} else {
			activateFormKeyError.classList.add("auth__error_visible");
			activateFormKeyError.textContent = "Поля не могут быть пустыми";
			//initLoader(form, false);
		}
	};

	return (
		<form className='auth__form auth__form_first auth__form_deactive' id='activate-form' action='submit' onSubmit={activate}>
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
