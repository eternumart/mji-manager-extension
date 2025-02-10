import { useAuth } from "../../../context/AuthContext";
import { apiConfig } from "../../../apiConfig";

export const logOut = () => {
	console.log("🔴 Выход из аккаунта...");

	// Очищаем данные из локального хранилища
	chrome.storage.local.remove(["authToken", "userData"], () => {
	  console.log("✅ Данные авторизации удалены.");
	});
  
	const baseUrl = apiConfig.address.protocol + apiConfig.address.ip;
	chrome.storage.local.remove([baseUrl], () => {
	  console.log(`✅ Очистили данные авторизации для ${baseUrl}`);
	});

	// ✅ Закрываем всплывающее окно
	chrome.tabs.query({ active: true }, (tabs) => {
		const tab = tabs[0];
		if (tab) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id ?? 0, allFrames: true },
				func: () => {
					try {
						document.querySelector(".mji-manager-app")?.remove();
					} catch {}
					localStorage.setItem("status", JSON.stringify({ layout: false, init: false, authorized: false, uid: null }));
				},
			});
		}
	});
};
