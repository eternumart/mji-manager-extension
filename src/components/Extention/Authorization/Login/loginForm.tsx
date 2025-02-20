import styles from "../../../../styles/components/LoginForm.module.scss";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/Context";
import { apiConfig } from "../../../../apiConfig";
import { saveToCache } from "../../utils/saveToCache";
import { decodeToken } from "../../utils/decodeToken"; // ✅ Добавляем декодирование токена
import { getAppData } from "../../utils/launchApp";

export const LoginForm = () => {
	const { setIsLogged, setUserData, serverState, setLoading } = useAppContext();
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

		console.log("📤 Отправляем данные для авторизации...");
		setLoading(true);

		chrome.runtime.sendMessage({
			contentScriptQuery: "logIn-request",
			data: { login, password },
			url: `${baseUrl}${apiConfig.routes.api.login}`,
		});

		console.log("📨 logIn-request отправлен на сервер, ожидаем logIn-response...");
	};

	useEffect(() => {
		const handleLoginResponse = (message: any) => {
			if (message.contentScriptQuery !== "logIn-response") return;

			console.log("🔹 Получен logIn-response:", message.data);

			// ✅ Проверяем, есть ли `accessToken` в `message.data[0]`
			const accessToken = message.data[0]?.accessToken;
			if (!accessToken) {
				console.error("❌ Токен не найден в ответе сервера");
				setErrorMessage("Ошибка авторизации. Проверьте логин и пароль.");
				setLoading(false);
				return;
			}

			// ✅ Декодируем токен
			const decoded = decodeToken(accessToken);
			if (!decoded || !decoded.login) {
				console.error("❌ Ошибка декодирования токена");
				setErrorMessage("Ошибка аутентификации.");
				setLoading(false);
				return;
			}

			console.log("✅ Авторизация успешна:", decoded);

			// ✅ Обновляем состояние пользователя
			setUserData({ fio: decoded.fio, login: decoded.login });
			setIsLogged(true);
			setErrorMessage("");

			// ✅ Сохраняем в `chrome.storage.local`
			saveToCache(baseUrl, {
				appData: null,
				fio: decoded.fio,
				login: decoded.login,
				loginIsPossible: true,
			});

			getAppData(
				{
					appData: null,
					fio: decoded.fio,
					login: decoded.login,
					loginIsPossible: true,
				},
				setLoading
			);
		};

		// ✅ Добавляем слушатель сообщений
		chrome.runtime.onMessage.addListener(handleLoginResponse);

		// ✅ Удаляем слушатель при размонтировании
		return () => chrome.runtime.onMessage.removeListener(handleLoginResponse);
	}, [serverState]);

	return (
		<form className={`${styles.authForm} ${styles.authFormActive}`} id="login-form" action="submit" onSubmit={logIn}>
			<fieldset className={styles.authInputWrapper}>
				<input type="email" className={styles.authInput} placeholder="Логин" id="login-auth" required />
				<span className={styles.authError}>{errorMessage}</span>
			</fieldset>
			<fieldset className={styles.authInputWrapper}>
				<input type="password" className={styles.authInput} placeholder="Пароль" id="password-auth" required />
			</fieldset>
			<input className={styles.authButton} id="login-btn" value="Войти" type="submit" />
		</form>
	);
};
