import { buttonError } from "./buttonError";
import { searchAllInputs } from "./searchAllInputs";
import { openFakeSelect, closeFakeSelect } from "./openCloseFakeSelect";

/** Нормализация для сопоставления названий (пробелы, переносы слов, скобки). */
function normalizeRowKey(s: string): string {
	return (s ?? "")
		.replace(/\s+/g, " ")
		.replace(/\u00AD/g, "")
		.replace(/\s*-\s*/g, "")
		.replace(/\s*\(\s*/g, "(")
		.replace(/\s*\)\s*/g, ")")
		.trim()
		.toLowerCase();
}

/** Найти ключ в группе по нормализованному совпадению с rowName. */
function findRowData(groupData: Record<string, any> | undefined, rowName: string): any {
	if (!groupData || !rowName) return undefined;
	const exact = groupData[rowName];
	if (exact !== undefined) return exact;
	const normalized = normalizeRowKey(rowName);
	for (const key of Object.keys(groupData)) {
		if (normalizeRowKey(key) === normalized) return groupData[key];
	}
	return undefined;
}

export const createFakeSelects = () => {
	if (!window.appData.functions.createFakeSelects || window.appVariables.currentPage === "parser") {
		return;
	}
	if (!buttonError(window.appVariables.copyButton, window.appVariables.currentPage, "main", "Всплывающие поля")) {
		return;
	}

	const fakeSelectList = window.appData.appLayout.fakeSelectList;
	const selectsValues = window.appData.defectsData;
	const doc = window.appVariables.htmlBody?.ownerDocument ?? document;

	// Каждый раз заново собираем поля текущего документа (актуальные ссылки на узлы)
	window.resultsDefectsInputs.inputs = [];
	window.resultsDefectsInputs.empty = true;
	searchAllInputs();

	const inputs = (window.resultsDefectsInputs.inputs || []).filter(
		(el: any) => el && typeof el.closest === "function" && doc.contains(el)
	);

	let counterItems = 1;
	let insertedCount = 0;

	inputs.forEach((input: any) => {
		const groupTable = input.closest(".groupBorder");
		if (!groupTable) return;

		const container = input.parentElement;
		if (!container || !doc.contains(container)) return;

		// Имя строки: предыдущая ячейка (колонка «Элементы») или вторая ячейка строки в гриде
		const rowNameElem =
			container.previousElementSibling?.querySelector("span") ||
			container.closest("tr")?.querySelector("td:nth-child(2) span");
		const groupNameElem = groupTable.querySelector("legend");

		if (!rowNameElem || !groupNameElem) return;

		const rowName = rowNameElem.textContent.trim();
		const groupName = groupNameElem.textContent.trim();

		console.log(`Обрабатываем поле: ${rowName} в группе ${groupName}`);

		const groupData = selectsValues[groupName];
		if (!groupData || rowName === "Все элементы" || rowName === "Вся система") return;

		const rowData = findRowData(groupData, rowName);

		if (!container.querySelector(".fakeSelect")) {
			container.style.position = "relative";
			container.style.overflow = "visible";
			container.insertAdjacentHTML("afterBegin", fakeSelectList);

			const currentSelect = container.querySelector(".fakeSelect");
			if (!currentSelect) return;

			const currentSelectList = currentSelect.querySelector(".fakeSelect__list");
			const currentSelectOpenButton = container.querySelector(".fakeSelect__selector");
			const currentSelectCloseBtn = currentSelect.querySelector(".fakeSelect__close-selector");

			if (!currentSelectList || !currentSelectOpenButton || !currentSelectCloseBtn) return;

			currentSelectOpenButton.addEventListener("click", () => openFakeSelect(currentSelect));
			currentSelectCloseBtn.addEventListener("click", () => closeFakeSelect(currentSelect));

			let listOptions: string[] = [];

			// Проверяем, есть ли `conditionNode` и его значения
			let conditionNode: any = null;
			const objAddress = rowData?.conditionNode?.appVariables ?? rowData?.conditionNode;
			if (Array.isArray(objAddress) && objAddress.length >= 3) {
				const objAddressOpt = objAddress[0];
				const objAddressGroup = objAddress[1];
				const objAddressRow = objAddress[2];
				conditionNode = window.appVariables[objAddressOpt]?.[objAddressGroup]?.[objAddressRow];
			}

			// Если найден `conditionNode`, берем данные по его значению
			if (conditionNode) {
				const conditionValue = `${conditionNode.value}`;
				listOptions = rowData?.conditions?.[conditionValue] ?? [];
			} else {
				console.log(`${groupName}: ${rowName} - безусловно`);
				listOptions = rowData?.conditions?.["Безусловно"] ?? [];
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
			insertedCount += 1;
		}
	});

	console.log("[MJI] Всплывающие поля: обработано", inputs.length, "вставлено", insertedCount);
	window.appVariables.fakeSelectsButton.textContent = insertedCount ? `Создано (${insertedCount})!` : "Создано!";
	window.appVariables.fakeSelectsButton.classList.add("main__button_done");
	setTimeout(() => {
		window.appVariables.fakeSelectsButton.textContent = "Всплывающие поля";
		window.appVariables.fakeSelectsButton.classList.remove("main__button_done");
	}, 1500);
};