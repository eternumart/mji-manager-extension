import styles from "../../../../styles/components/ActivationForm.module.scss";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/Context";
import { apiConfig } from "../../../../apiConfig";

export const ActivateForm = () => {
	const { setLoading, setActiveTab, activated, setActivated, serverState } = useAppContext();
	const [errorMessage, setErrorMessage] = useState("");
	const [login, setLogin] = useState(""); // ✅ Используем `useState` вместо `useRef`

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	const activateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage(""); // ✅ Очищаем ошибки перед новым запросом

		const loginInput = document.querySelector("#login-activate") as HTMLInputElement;
		const passwordInput = document.querySelector("#password-activate") as HTMLInputElement;
		const keyInput = document.querySelector("#key-activate") as HTMLInputElement;

		if (!loginInput || !passwordInput || !keyInput) {
			console.error("❌ Поля ввода не найдены!");
			setErrorMessage("Ошибка: поля ввода не найдены.");
			return;
		}

		const loginValue = loginInput.value;
		const password = passwordInput.value;
		const key = keyInput.value;

		if (!loginValue || !password || !key) {
			console.error("❌ Все поля должны быть заполнены!");
			setErrorMessage("Введите логин, пароль и ключ активации.");
			return;
		}

		setLogin(loginValue); // ✅ Сохраняем логин в `useState`

		console.log("📤 Отправляем данные для активации...");
		setLoading(true);

		chrome.runtime.sendMessage({
			contentScriptQuery: "activate-request",
			data: { login: loginValue, password, key },
			url: `${baseUrl}${apiConfig.routes.api.activation}`,
		});

		console.log("📨 activate-request отправлен на сервер, ожидаем activate-response...");
	};

	useEffect(() => {
		const handleActivateResponse = (message: any) => {
			if (message.contentScriptQuery !== "activate-response") return;

			console.log("🔹 Получен activate-response:", message.data);

			const isActivated = message.data.activated;
			if (!isActivated) {
				console.error("❌ Ошибка активации");
				setErrorMessage("Ошибка активации. Проверьте ключ.");
				setLoading(false);
				return;
			}

			console.log("✅ Активация успешна:", login);
			console.log("Меняем стейт приложения");

			setActivated(true);
			setLoading(false); // ✅ Останавливаем загрузку

			// ✅ Через 4 секунды переключаемся на вкладку входа
			setTimeout(() => {
				setActiveTab("login");
			}, 4000);
		};

		chrome.runtime.onMessage.addListener(handleActivateResponse);
		return () => chrome.runtime.onMessage.removeListener(handleActivateResponse);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // ✅ Вызываем только при монтировании

	return (
		<>
			{!activated && (
				<form className={`${styles.authForm} ${styles.authFormActive}`} id="activate-form" action="submit" onSubmit={activateAccount}>
					<fieldset className={styles.authInputWrapper}>
						<input type="email" className={styles.authInput} placeholder="Логин" id="login-activate" required />
						<span className={`${styles.authError} ${errorMessage ? styles.authErrorVisible : ""}`} id="error-login"></span>
					</fieldset>
					<fieldset className={styles.authInputWrapper}>
						<input type="password" className={styles.authInput} placeholder="Пароль" id="password-activate" required />
						<span className={`${styles.authError} ${errorMessage ? styles.authErrorVisible : ""}`} id="error-password"></span>
					</fieldset>
					<fieldset className={styles.authInputWrapper}>
						<input type="text" className={styles.authInput} placeholder="Ключ активации" id="key-activate" required />
						<span className={`${styles.authError} ${errorMessage ? styles.authErrorVisible : ""}`}>{errorMessage}</span>
					</fieldset>
					<input className={styles.authButton} id="activate-btn" value="Активировать" type="submit" />
				</form>
			)}
			{activated && <p className={styles.authSuccess}>Аккаунт успешно активирован!</p>}
		</>
	);
};
