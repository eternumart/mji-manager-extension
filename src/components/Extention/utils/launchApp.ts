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
  launchStatus: boolean
) => {
  console.log(currentFio, login, loginIsPossible, launchStatus);
};
