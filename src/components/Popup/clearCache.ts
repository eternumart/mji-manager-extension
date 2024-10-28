export const clearCache = () => {
    window.appVariables.cleanButton.firstElementChild.firstElementChild.classList.add("animation");
    localStorage.removeItem("MJIDATA");
    localStorage.removeItem("DataLoaded");
    setTimeout(() => {
        window.appVariables.cleanButton.firstElementChild.firstElementChild.classList.remove("animation");
    }, 1100);
}