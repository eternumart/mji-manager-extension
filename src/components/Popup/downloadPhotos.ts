import { buttonError } from "./buttonError";

export const downloadPhotos = (evt: any) => {
    evt.preventDefault();
    if (!window.appData.functions.downloadPhotos) {
        return;
    }
    // Если страница не подходит для вставки фото - выдаем ошибку и выходим из функции
    if (!buttonError(window.appVariables.submitButton, window.appVariables.currentPage, "photo", "Загрузить")) {
        return;
    }

    const files = window.appVariables.formInput.files;
    let counter = 0;
    if (files.length < 1) {
        window.appVariables.submitButton.classList.add("form__button_error");
        window.appVariables.submitButton.value = "Ошибка!";
        setTimeout(() => {
            window.appVariables.submitButton.classList.remove("form__button_error");
            window.appVariables.submitButton.value = "Загрузить";
        }, 1500);
        return;
    }
    const interval = setInterval(upload, 3000);
    const saveButton = window.appVariables.html.querySelector("#buttonFormSave");
    const addImgBtnContainer = window.appVariables.html.querySelector("#\\32 1184 > caption");
    const addImgButton = addImgBtnContainer.querySelector(".button");

    function upload() {
        // 1. Клик по кнопке добавления поля
        addImgButton.click();

        const photoTable = window.appVariables.html.querySelector("#\\32 1184");
        const downloadInputs = photoTable.querySelectorAll(".fileLoad");
        const downloadInput = downloadInputs[downloadInputs.length - 1];
        const textareas = photoTable.querySelectorAll("textarea");
        const currentTextarea = textareas[textareas.length - 1];
        const currentFile = files[`${counter}`];
        const prepareDate = window.appVariables.inputDate.value.split("-");
        const downloadDate = `Дата загрузки: ${prepareDate[2]}.${prepareDate[1]}.${prepareDate[0]} г.`;

        currentTextarea.value = downloadDate;

        // Копируем данные файла из расширения
        interface fileObj {
            [key: string]: any;
        }
        const fileObj = {
            type: currentFile.type,
            size: currentFile.size,
            webkitRelativePath: currentFile.webkitRelativePath,
            lastModified:currentFile.lastModified,
            lastModifiedDate: currentFile.lastModifiedDate,
        }
        const myFile = new File(["file"], `${currentFile.name}`, fileObj);

        if (myFile.lastModified < 1) {
            return;
        }

        // 2. Выделяем инпут для подгрузки фото и вставляем в него данные
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(currentFile);
        downloadInput.files = dataTransfer.files;
        downloadInput.dispatchEvent(new Event("change"));

        counter++;
        // 3. Сохраняем после добавления всех файлов
        if (counter >= files.length) {
            clearInterval(interval);
            setTimeout(() => {
                saveButton.click();
                window.appVariables.submitButton.value = "Сохранено";
                window.appVariables.submitButton.classList.add("form__button_done");
                setTimeout(() => {
                    window.appVariables.submitButton.value = "Загрузить";
                    window.appVariables.submitButton.classList.remove("form__button_done");
                }, 1500);
            }, 3000);
        }
    }
}