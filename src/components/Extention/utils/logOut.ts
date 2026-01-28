export const logOut = () => {
	console.log("🔴 Выход из аккаунта...");

	// ✅ Полностью очищаем локальное хранилище
	chrome.storage.local.clear(() => {
		console.log("✅ Полностью очистили chrome.storage.local");
	});

	// ✅ Очищаем `localStorage`
	chrome.tabs.query({ active: true }, (tabs) => {
		const tab = tabs[0];
		if (tab) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id ?? 0, allFrames: true },
				func: () => {
					try {
						console.log("🛑 Очищаем localStorage...");
						localStorage.clear();
						sessionStorage.clear();
						document.querySelector(".mji-manager-app")?.remove();
						console.log("✅ localStorage и sessionStorage очищены!");
					} catch (error) {
						console.error("❌ Ошибка очистки localStorage:", error);
					}
				},
			});
		}
	});
};

