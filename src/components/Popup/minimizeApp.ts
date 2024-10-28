export const minimizeApp = () => {
    window.appVariables.app.style.transition = "0.5s";
    window.appVariables.app.classList.toggle("app_minimized");
    setTimeout(() => {
        window.appVariables.app.style.transition = null;
    }, 500);
}

export const minimizeAppByEscape = (evt: any) => {
    if (evt.key === "Escape") {
        minimizeApp();
    }
}