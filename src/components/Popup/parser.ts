export function initParserUK(event: Event) {
	if (!window.appData.functions.parser) {
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
			.map((row: any) => row.split(";"))
			.filter((row: any) => row.length > 1 && row.some((cell: any) => cell.trim() !== ""));

		if (rows.length < 2) {
			alert("⚠️ CSV файл пустой или содержит только заголовки.");
			return;
		}

		// const headers = rows[0];
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

async function processAddresses(dataRows: any) {
	let currentIndex = 0;
	const total = dataRows.length;

	function processNext() {
		if (currentIndex >= total) {
			console.log("Парсинг адресов завершился.");
			const csvData = convertToCSV(dataRows);
			downloadCSV(csvData);
			hideLoader();
			return;
		}

		const row = dataRows[currentIndex];
		const address = row[1];

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length === 0) {
				console.error("⚠️ Не найдено активных вкладок.");
				row.push("⚠️ Нет активных вкладок");
				currentIndex++;
				updateLoader(currentIndex, total);
				processNext();
				return;
			}

			const tabId = tabs[0].id;

			chrome.tabs.sendMessage(tabId || 0, { action: "searchAddress", address }, (response) => {
				if (chrome.runtime.lastError) {
					console.error("⚠️ Ошибка отправки запроса:", chrome.runtime.lastError.message);
					row.push("⚠️ Error: Запрос не удался");
				} else if (response && response.result) {
					row.push(response.result);
				} else {
					row.push("⚠️ Результат не найден");
				}

				currentIndex++;
				updateLoader(currentIndex, total);
				processNext();
			});
		});
	}

	processNext();
}

function showLoader(total: any) {

	if (!window.appVariables.loader || !window.appVariables.parserProgress) {
		console.warn("⚠️ Лоадер или текст лоадера. Элемент не найден.");
		return;
	}

	window.appVariables.loader.style.display = "flex";
	window.appVariables.formParser.display = "none";
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

function updateLoader(processed: any, total: any) {
	const progressText = document.getElementById("progressText");
	if (!progressText) {
		console.warn("⚠️ Текст лоадера. Элемент не найден");
		return;
	}
	window.appVariables.loaderText.textContent = `Завершено: ${processed} / ${total}`;
}

function convertToCSV(data: any) {
	if (!data || !data.length) {
		return "";
	}

	const headers = Object.keys(data[0]);
	const rows = data.map((row: any) => headers.map((header) => `"${(row[header] || "").toString().replace(/"/g, '""')}"`).join(","));

	const csvContent = [headers.join(","), ...rows].join("\n");
	const bom = "\uFEFF"; // Add BOM for UTF-8
	return bom + csvContent;
}

function downloadCSV(data: any) {
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
