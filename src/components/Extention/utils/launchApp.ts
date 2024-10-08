// Объявление глобальной функции launchApp
declare global {
  function launchApp(
    currentFio: string,
    login: string,
    loginIsPossible: boolean,
    launchStatus: boolean
  ): void;
}

// Ваша функция initApp
export const initApp = (
  currentFio: string,
  login: string,
  loginIsPossible: boolean,
  launchStatus: boolean,
  appDataString: string // предполагается, что это строка, содержащая JSON
) => {
  // Парсим appDataString, чтобы получить javaScript
  const { javaScript } = JSON.parse(appDataString);

  // Создаём элемент script
  const script = document.createElement("script");
  script.textContent = javaScript; // Устанавливаем текст содержимого скрипта

  // Вставляем элемент script перед закрывающим тегом body
  document.querySelector("body")?.insertAdjacentElement("beforeend", script);

  // Вызываем launchApp после загрузки скрипта
  script.onload = () => {
    if (typeof launchApp === "function") {
      launchApp(currentFio, login, loginIsPossible, launchStatus);
    } else {
      console.error("launchApp is not defined");
    }
  };
};
