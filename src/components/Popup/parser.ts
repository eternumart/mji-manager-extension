export function initParserUK(event: Event) {
	if (!window.appData.functions.parser || window.appVariables.currentPage !== "parser") {
		console.warn("⚠️ Парсер УК отключён.");
		return;
	}

	if (!window.appVariables.formParserInput.files.length) {
		console.warn("⚠️ Файл не выбран.");
		return;
	}

	const file = window.appVariables.formParserInput.files[0];
	const reader = new FileReader();

	reader.onload = async (event: Event) => {
		const fileReader = event.target as FileReader;
		const csvText = fileReader.result as string;
		const rows = csvText
			.split("\n")
			.map((row) => row.split(";"))
			.filter((row) => row.length > 1 && row.some((cell) => cell.trim() !== ""));

		if (rows.length < 2) {
			alert("⚠️ CSV файл пустой или содержит только заголовки.");
			return;
		}

		const dataRows = rows.slice(1);

		console.log("Распарсенные строки:", dataRows);

		if (dataRows.length === 0) {
			alert("⚠️ Нет данных для продолжения.");
			return;
		}

		showLoader(dataRows.length);
		await processAddresses(dataRows);
	};

	reader.readAsText(file, "UTF-8");
}

async function processAddresses(dataRows: string[][]) {
	let currentIndex = 0;
	const total = dataRows.length;

	async function processNext() {
		if (currentIndex >= total) {
			console.log("✅ Парсинг адресов завершён.");
			const csvData = convertToCSV(dataRows);
			downloadCSV(csvData);
			hideLoader();
			return;
		}

		const row = dataRows[currentIndex];
		const address = row[1];

		try {
			const searchResult = await searchAddress(address);
			row.push(searchResult);
		} catch (error) {
			console.error("⚠️ Ошибка при обработке адреса:", error);
			row.push("⚠️ Ошибка поиска");
		}

		currentIndex++;
		updateLoader(currentIndex, total);
		processNext();
	}

	processNext();
}

export async function searchAddress(address: string): Promise<string> {
	return new Promise((resolve) => {
		const searchInput = document.querySelector(".manageSearch__input") as HTMLInputElement;

		if (!searchInput) {
			resolve("⚠️ Поле ввода для поиска не найдено.");
			return;
		}

		// Вводим адрес в поле поиска
		searchInput.focus();
		searchInput.value = address;
		searchInput.dispatchEvent(new Event("input", { bubbles: true }));

		const hintsContainer = document.querySelector(".manageSearch__hints");
		if (!hintsContainer) {
			resolve("⚠️ Элемент manageSearch__hints не найден.");
			return;
		}

		// Таймер на случай, если результат не появится
		const timeout = setTimeout(() => {
			observer.disconnect();
			resolve("⚠️ Для этого адреса УК не определена.");
		}, randomInterval());

		const observer = new MutationObserver(() => {
			const hintItem = hintsContainer.querySelector(".manageSearch__hintDataTitle_address");

			if (hintItem) {
				const resultText = `${hintItem.textContent?.trim()}`;
				clearTimeout(timeout); // Очищаем таймер
				observer.disconnect(); // Останавливаем наблюдение
				resolve(resultText);
			}
		});

		observer.observe(hintsContainer, { childList: true, subtree: true });
	});
}

function randomInterval(): number {
	const min = 5000;
	const max = 10000;
	const step = 500;

	// Генерируем случайное число от 0 до количества возможных шагов
	const randomStep = Math.floor(Math.random() * ((max - min) / step + 1));

	// Вычисляем случайное значение в заданном диапазоне с шагом 500
	return min + randomStep * step;
}

function showLoader(total: number) {
	if (!window.appVariables.loader || !window.appVariables.loaderText) {
		console.warn("⚠️ Лоадер или текст лоадера не найден.");
		return;
	}

	window.appVariables.loader.style.display = "flex";
	window.appVariables.formParser.style.display = "none";
	window.appVariables.formParserButton.style.display = "none";
	window.appVariables.loaderText.textContent = `Завершено: 0 / ${total}`;
}

function hideLoader() {
	if (!window.appVariables.loader) {
		console.warn("⚠️ Лоадер не найден.");
		return;
	}
	window.appVariables.formParser.style.display = "block";
	window.appVariables.formParserButton.style.display = "block";
	window.appVariables.loader.style.display = "none";
}

function updateLoader(processed: number, total: number) {
	if (!window.appVariables.loaderText) {
		console.warn("⚠️ Текст лоадера не найден.");
		return;
	}
	window.appVariables.loaderText.textContent = `Завершено: ${processed} / ${total}`;
}

function convertToCSV(data: string[][]) {
	if (!data || !data.length) {
		return "";
	}

	const csvContent = data.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(";")).join("\n");
	const bom = "\uFEFF"; // Add BOM for UTF-8
	return bom + csvContent;
}

function downloadCSV(data: string) {
	const csvBlob = new Blob([data], { type: "text/csv;charset=utf-8;" });
	const csvUrl = URL.createObjectURL(csvBlob);
	const csvLink = document.createElement("a");
	csvLink.href = csvUrl;
	csvLink.download = "ProcessedAddresses.csv";
	document.body.appendChild(csvLink);
	csvLink.click();
	document.body.removeChild(csvLink);
	URL.revokeObjectURL(csvUrl);
}
