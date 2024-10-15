import { appVariables, resultsDefectsInputs } from "./constants";
import { buttonError } from "./buttonError";
import { searchAllInputs } from "./searchAllInputs";
import { openFakeSelect, closeFakeSelect } from "./openCloseFakeSelect";
import { splitBySentences } from "./splitBySentences";
import { appData } from ".";

export const createFakeSelects = () => {
    if(!appData.availableFunctions.createFakeSelects) {
        return;
    }
    if (!buttonError(appVariables.copyButton, appVariables.currentPage, "main", "Всплывающие поля")) {
        return;
    }

    const fakeSelectList = appData.appLayout.fakeSelectList;
	const selectsValues = appData.defectsData;

    // Поиск полей отчета
    searchAllInputs();

    let counterItems = 1;

    resultsDefectsInputs.inputs.forEach((input: any) => {
        const groupTable = input.closest(".groupBorder");
        const container = input.parentElement;
        const rowName = container.previousElementSibling.querySelector("span").textContent;
        const groupName = groupTable.querySelector("legend").textContent;

        input.style.boxSizing = "border-box";

        if (selectsValues[groupName]) {
            if (rowName !== "Все элементы" && rowName !== "Вся система") {
                if (!container.querySelector(".fakeSelect")) {
                    container.style.position = "relative";
                    container.insertAdjacentHTML("afterBegin", fakeSelectList);
                    const currentSelect = container.querySelector(".fakeSelect");
                    const currentSelectList = currentSelect.querySelector(".fakeSelect__list");
                    const currentSelectOpenButton = container.querySelector(".fakeSelect__selector");
                    const currentSelectCloseBtn = currentSelect.querySelector(".fakeSelect__close-selector");

                    currentSelectOpenButton.addEventListener("click", () => {
                        openFakeSelect(currentSelect);
                    });
                    currentSelectCloseBtn.addEventListener("click", () => {
                        closeFakeSelect(currentSelect);
                    });
                    let listOptions, conditionNode, objAddress, objAddressOpt, objAddressGroup, objAddressRow;
                    try {
                        objAddress = selectsValues[`${groupName}`][`${rowName}`][`conditionNode`]["appVariables"] || selectsValues[`${groupName}`][`${rowName}`][`conditionNode`];
                        objAddressOpt = objAddress[0];
                        objAddressGroup = objAddress[1];
                        objAddressRow = objAddress[2];
                        conditionNode = appVariables[objAddressOpt][objAddressGroup][objAddressRow];
                    } catch {}

                    if (conditionNode) {
                        const conditionValue = `${conditionNode.value}`;
                        const conditions = selectsValues[`${groupName}`][`${rowName}`][`conditions`];
                        listOptions = conditions[`${conditionValue}`];
                    } else {
                        console.info(`${groupName}: ${rowName} - безусловно`);
                        if (!selectsValues[`${groupName}`][`${rowName}`]) {
                            listOptions = ["#", "#"];
                        } else {
                            listOptions = selectsValues[`${groupName}`][`${rowName}`][`conditions`]["Безусловно"];
                        }
                    }

                    listOptions.forEach((item: any) => {
                        const listItem = `
                            <div class="fakeSelect__item-wrapper">
                                <input type="checkbox" id="fakselect-item-${counterItems}" />
                                <label for="fakselect-item-${counterItems}">${item}</label>
                            </div>`;
                        currentSelectList.insertAdjacentHTML("beforeend", listItem);
                        counterItems += 1;
                    });

                    const allGroupItems = currentSelectList.querySelectorAll(".fakeSelect__item-wrapper");

                    currentSelectCloseBtn.addEventListener("click", () => {
                        const resultValue: any = [];
                        allGroupItems.forEach((item: any) => {
                            const checkbox = item.querySelector("input");
                            const value = item.querySelector("label");

                            if (checkbox.checked) {
                                if (!input.value.includes(value.textContent)) {
                                    resultValue.push(value.textContent);
                                }
                            } else {
                                const sentences = splitBySentences(input.value);
                                const toDelete = sentences.find((str: any) => `${str}.` === value.textContent);
                                if (toDelete) {
                                    input.value = input.value.trimStart().trimEnd().replace(`${toDelete}.`, "");
                                }
                            }
                        });
                        input.value = `${input.value.trimStart().trimEnd()} ${resultValue.join(" ").trimStart().trimEnd()}`.trimStart().trimEnd();
                    });
                }
            }
        }
    });

    appVariables.fakeSelectsButton.textContent = "Создано!";
    appVariables.fakeSelectsButton.classList.add("main__button_done");
    setTimeout(() => {
        appVariables.fakeSelectsButton.textContent = "Всплывающие поля";
        appVariables.fakeSelectsButton.classList.remove("main__button_done");
    }, 1500);
}