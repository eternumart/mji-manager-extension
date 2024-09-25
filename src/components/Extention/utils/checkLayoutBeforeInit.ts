export const checkLayoutBeforeInit = () => {
	console.log("Проверяем статус запуска");
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
}