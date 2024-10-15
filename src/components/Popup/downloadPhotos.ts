import { appVariables } from "./constants";
import { buttonError } from "./buttonError";
import { appData } from ".";

export const downloadPhotos = (evt: any) => {
    evt.preventDefault();
    if (!appData.availableFunctions.downloadPhotos) {
        return;
    }
    // Если страница не подходит для вставки фото - выдаем ошибку и выходим из функции
    if (!buttonError(appVariables.submitButton, appVariables.currentPage, "photo", "Загрузить")) {
        return;
    }

    const files = appVariables.formInput.files;
    let counter = 0;
    if (files.length < 1) {
        appVariables.submitButton.classList.add("form__button_error");
        appVariables.submitButton.value = "Ошибка!";
        setTimeout(() => {
            appVariables.submitButton.classList.remove("form__button_error");
            appVariables.submitButton.value = "Загрузить";
        }, 1500);
        return;
    }
    const interval = setInterval(upload, 3000);
    const saveButton = appVariables.html.querySelector("#buttonFormSave");
    const addImgBtnContainer = appVariables.html.querySelector("#\\32 1184 > caption");
    const addImgButton = addImgBtnContainer.querySelector(".button");

    function upload() {
        // 1. Клик по кнопке добавления поля
        addImgButton.click();

        const photoTable = appVariables.html.querySelector("#\\32 1184");
        const downloadInputs = photoTable.querySelectorAll(".fileLoad");
        const downloadInput = downloadInputs[downloadInputs.length - 1];
        const textareas = photoTable.querySelectorAll("textarea");
        const currentTextarea = textareas[textareas.length - 1];
        const currentFile = files[`${counter}`];
        const prepareDate = appVariables.inputDate.value.split("-");
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
                appVariables.submitButton.value = "Сохранено";
                appVariables.submitButton.classList.add("form__button_done");
                setTimeout(() => {
                    appVariables.submitButton.value = "Загрузить";
                    appVariables.submitButton.classList.remove("form__button_done");
                }, 1500);
            }, 3000);
        }
    }
}