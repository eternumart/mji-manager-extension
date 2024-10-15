export const buttonError = (button: HTMLElement, currentPage: string, needPage: string, stdValue: string) => {
    if (currentPage !== needPage) {
        button.classList.add("main__button_error");
        button.textContent = "Ошибка!";
        setTimeout(() => {
            button.classList.remove("main__button_error");
            button.textContent = stdValue;
        }, 1500);
        return false;
    } else {
        return true;
    }
}