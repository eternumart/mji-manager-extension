import { buttonError } from "./buttonError";
import { searchAllInputs } from "./searchAllInputs";
import { openFakeSelect, closeFakeSelect } from "./openCloseFakeSelect";
import { splitBySentences } from "./splitBySentences";

export const createFakeSelects = () => {
    if (!window.appData.functions.createFakeSelects || window.appVariables.currentPage === "parser") {
        return;
    }
    if (!buttonError(window.appVariables.copyButton, window.appVariables.currentPage, "main", "Всплывающие поля")) {
        return;
    }

    const fakeSelectList = window.appData.appLayout.fakeSelectList;
    const selectsValues = window.appData.defectsData;

    // Поиск полей отчета
    searchAllInputs();

    let counterItems = 1;

    window.resultsDefectsInputs.inputs.forEach((input: any) => {
        const groupTable = input.closest(".groupBorder");
        if (!groupTable) return; // Пропускаем, если нет родительской таблицы

        const container = input.parentElement;
        if (!container) return;

        const rowNameElem = container.previousElementSibling?.querySelector("span");
        const groupNameElem = groupTable.querySelector("legend");

        if (!rowNameElem || !groupNameElem) return; // Пропускаем, если не нашли заголовки

        const rowName = rowNameElem.textContent;
        const groupName = groupNameElem.textContent;

        console.log(`Обрабатываем поле: ${rowName} в группе ${groupName}`);

        if (!selectsValues[groupName] || rowName === "Все элементы" || rowName === "Вся система") return;

        if (!container.querySelector(".fakeSelect")) {
            container.style.position = "relative";
            container.insertAdjacentHTML("afterBegin", fakeSelectList);

            const currentSelect = container.querySelector(".fakeSelect");
            if (!currentSelect) return;

            const currentSelectList = currentSelect.querySelector(".fakeSelect__list");
            const currentSelectOpenButton = container.querySelector(".fakeSelect__selector");
            const currentSelectCloseBtn = currentSelect.querySelector(".fakeSelect__close-selector");

            if (!currentSelectOpenButton || !currentSelectCloseBtn) return;

            currentSelectOpenButton.addEventListener("click", () => openFakeSelect(currentSelect));
            currentSelectCloseBtn.addEventListener("click", () => closeFakeSelect(currentSelect));

            let listOptions = selectsValues[groupName]?.[rowName]?.conditions?.["Безусловно"] || [];
            if (!listOptions.length) {
                console.warn(`Нет условий для ${groupName} - ${rowName}`);
                listOptions = ["Нет данных"];
            }

            listOptions.forEach((item: string) => {
                const listItem = `
                    <div class="fakeSelect__item-wrapper">
                        <input type="checkbox" id="fakeSelect-item-${counterItems}" />
                        <label for="fakeSelect-item-${counterItems}">${item}</label>
                    </div>`;
                currentSelectList.insertAdjacentHTML("beforeend", listItem);
                counterItems += 1;
            });

            // Закрытие и обновление значений input'а
            currentSelectCloseBtn.addEventListener("click", () => {
                const selectedValues: string[] = [];
                currentSelectList.querySelectorAll(".fakeSelect__item-wrapper input:checked").forEach((checkbox: any) => {
                    selectedValues.push((checkbox as HTMLInputElement).nextElementSibling?.textContent || "");
                });

                input.value = selectedValues.join(", ");
                console.log(`Выбрано: ${input.value}`);
            });
        }
    });

    window.appVariables.fakeSelectsButton.textContent = "Создано!";
    window.appVariables.fakeSelectsButton.classList.add("main__button_done");
    setTimeout(() => {
        window.appVariables.fakeSelectsButton.textContent = "Всплывающие поля";
        window.appVariables.fakeSelectsButton.classList.remove("main__button_done");
    }, 1500);
};
