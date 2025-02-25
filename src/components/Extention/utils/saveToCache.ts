export const saveToCache = async (key: string, data: any) => {
	console.log(`[saveToCache.ts] Сохраняем данные: `, data);
	chrome.storage.local.set({ [key]: data }, () => {
		if (chrome.runtime.lastError) {
			console.error("8! ❌ Ошибка сохранения в chrome.storage:", chrome.runtime.lastError);
		} else {
			console.log("8! ✅ Данные успешно сохранены в chrome.storage.");
		}
	});
};
