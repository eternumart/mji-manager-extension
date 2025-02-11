export const saveToCache = async (key: string, data: any) => {
	const finalObject = {
		currentFio: "",
		currentLogin: "",
		loginIsPossible: "",
		appData: {},
	};

	try {
		const cachedData: any = await new Promise((resolve) => {
			chrome.storage.local.get([key], (result) => {
				resolve(result[key] || {});
			});
		});

		// Если есть кешированные данные, используем их
		if (cachedData.currentFio) {
			finalObject.currentFio = cachedData.currentFio;
			finalObject.currentLogin = cachedData.currentLogin;
			finalObject.loginIsPossible = cachedData.loginIsPossible;
		}
		if (cachedData.appData) {
			finalObject.appData = cachedData.appData;
		}

		// Если переданы новые данные, обновляем их
		if (data.fio) {
			finalObject.currentFio = data.fio;
			finalObject.currentLogin = data.login;
			finalObject.loginIsPossible = data.loginIsPossible;
		}
		if (!data.fio) {
			finalObject.appData = data;
		}

		console.log(`💾 Сохранение данных в chrome.storage.local (ключ: ${key})`, finalObject);

		// Сохраняем обновленный объект в `chrome.storage.local`
		chrome.storage.local.set({ [key]: finalObject }, () => {
			if (chrome.runtime.lastError) {
				console.error("❌ Ошибка сохранения в chrome.storage:", chrome.runtime.lastError);
			} else {
				console.log("8! ✅ Данные успешно сохранены в chrome.storage.");
			}
		});
	} catch (error) {
		console.error("❌ Ошибка при получении данных из chrome.storage:", error);
	}
};
