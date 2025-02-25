import { buttonError } from "./buttonError";
import { searchAllInputs } from "./searchAllInputs";
import { openFakeSelect, closeFakeSelect } from "./openCloseFakeSelect";

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
		if (!groupTable) return;

		const container = input.parentElement;
		if (!container) return;

		const rowNameElem = container.previousElementSibling?.querySelector("span");
		const groupNameElem = groupTable.querySelector("legend");

		if (!rowNameElem || !groupNameElem) return;

		const rowName = rowNameElem.textContent.trim();
		const groupName = groupNameElem.textContent.trim();

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

			let listOptions = [];

			// Проверяем, есть ли `conditionNode` и его значения
			let conditionNode, objAddress, objAddressOpt, objAddressGroup, objAddressRow;
			try {
				objAddress = selectsValues[groupName][rowName]?.conditionNode?.appVariables || selectsValues[groupName][rowName]?.conditionNode;
				objAddressOpt = objAddress[0];
				objAddressGroup = objAddress[1];
				objAddressRow = objAddress[2];
				conditionNode = window.appVariables[objAddressOpt]?.[objAddressGroup]?.[objAddressRow];
			} catch (error) {
				console.log(`⚠️ Ошибка получения conditionNode для ${groupName} - ${rowName}`, error);
			}

			// Если найден `conditionNode`, берем данные по его значению
			if (conditionNode) {
				const conditionValue = `${conditionNode.value}`;
				listOptions = selectsValues[groupName][rowName]?.conditions?.[conditionValue] || [];
			} else {
				console.log(`${groupName}: ${rowName} - безусловно`);
				listOptions = selectsValues[groupName][rowName]?.conditions?.["Безусловно"] || [];
			}

			if (!listOptions.length) {
				console.log(`⚠️ Нет данных для ${groupName} - ${rowName}`);
				listOptions = ["Нет данных"];
			}

			listOptions.forEach((item: any) => {
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
				const selectedValues: any = [];
				currentSelectList.querySelectorAll(".fakeSelect__item-wrapper input:checked").forEach((checkbox: any) => {
					selectedValues.push(checkbox.nextElementSibling?.textContent || "");
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