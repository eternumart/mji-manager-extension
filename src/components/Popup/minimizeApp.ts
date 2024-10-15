import { appVariables } from "./constants";

export const minimizeApp = () => {
    appVariables.app.style.transition = "0.5s";
    appVariables.app.classList.toggle("app_minimized");
    setTimeout(() => {
        appVariables.app.style.transition = null;
    }, 500);
}

export const minimizeAppByEscape = (evt: any) => {
    if (evt.key === "Escape") {
        minimizeApp();
    }
}