import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { randomFio } from "../utils/randomFio";
import { checkStorage } from "../utils/checkStorage";
import { apiConfig } from "../../../apiConfig";
import { useState } from "react";

export const LoginForm = () => {
  const { setIsLogged, setUserData } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginForm = document.querySelector("#login-form") as HTMLFormElement;
    const login = loginForm.querySelector("#login") as HTMLInputElement;
    const password = loginForm.querySelector("#password") as HTMLInputElement;
    const errorActivation = loginForm.querySelector("#error-activation") as HTMLSpanElement;

    console.log("Запуск авторизации");
    const baseUrl = apiConfig.address.protocol + apiConfig.address.ip;

    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "logIn-request",
        data: {
          login: login.value,
          password: password.value,
        },
        url: `${baseUrl}/auth/login`,
      },
      (response) => {
        if (!response || response.error) {
          setErrorMessage("Ошибка авторизации. Попробуйте еще раз.");
          console.error("Ошибка авторизации:", response?.error || "Неизвестная ошибка");
          return;
        }

        const fio = response.data?.fio || randomFio();
        if (response.data?.loginIsPossible === true && response.data?.activated) {
          console.log("Авторизация успешна!");

          const storageKey = baseUrl; // Используем только домен как ключ

          chrome.storage.local.get(storageKey, (existingData) => {
            if (!existingData[storageKey]) {
              chrome.storage.local.set(
                { [storageKey]: { logged: login.value, fio: fio } },
                () => {
                  console.log("✅ Данные сохранены в storage по ключу:", storageKey);
                }
              );
            } else {
              console.log("Данные для", storageKey, "уже существуют в storage");
            }
          });

          setIsLogged(true);
          setUserData({ fio, login: login.value });
          checkStorage({ logged: login.value, fio });
        } else {
          errorActivation.classList.add("auth__error_visible");
          errorActivation.textContent = response.data?.activation || "Ошибка активации аккаунта.";
        }
      }
    );
  };

  return (
    <form className="auth__form auth__form_login auth__form_active" id="login-form" action="submit" onSubmit={logIn}>
      <fieldset className="auth__input-wrapper">
        <input type="email" className="auth__input" placeholder="Логин" id="login" required />
        <span className="auth__error" id="error-login"></span>
      </fieldset>
      <fieldset className="auth__input-wrapper">
        <input type="password" className="auth__input" placeholder="Пароль" id="password" required />
        <span className="auth__error" id="error-activation">{errorMessage}</span>
      </fieldset>
      <input className="auth__button" id="login-btn" value="Войти" type="submit" />
    </form>
  );
};
