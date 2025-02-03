import React from "react";
import { LoginForm } from "./loginForm";
import { ActivateForm } from "./activateForm";
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

export const Authorization = () => {
	return (
		<div className='auth'>
			<Tabs />
			<ActivateForm />
			<LoginForm />
		</div>
	);
};
