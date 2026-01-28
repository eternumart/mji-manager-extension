import styles from "../../../styles/components/Authorization.module.scss";
import React from "react";
import { LoginForm } from "./Login/loginForm";
import { ActivateForm } from "./Activation/activateForm";
import { useAppContext } from "../../../context/Context";

const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
	return (
		<div className={styles.tabs}>
			<button className={`${styles.tabsButton} ${activeTab === "login" ? styles.tabsButtonActive : ""}`} id="login-tab" onClick={() => setActiveTab("login")}>
				Войти
			</button>
			<button className={`${styles.tabsButton} ${activeTab === "activate" ? styles.tabsButtonActive : ""}`} id="activate-tab" onClick={() => setActiveTab("activate")}>
				Активировать
			</button>
		</div>
	);
};

export const Authorization = () => {
	const {activeTab, setActiveTab} = useAppContext(); // ✅ Состояние активной вкладки

	return (
		<>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === "login" ? <LoginForm /> : <ActivateForm />}
		</>
	);
};
