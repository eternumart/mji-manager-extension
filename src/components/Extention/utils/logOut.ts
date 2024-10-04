export const logOut = () => {
	console.log("Вышли из аккаунта");
	chrome.tabs.query({ active: true }, (tabs) => {
		const tab = tabs[0];
		if (tab) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id ?? 0, allFrames: true },
				func: () => {
					localStorage.setItem("status", JSON.stringify({ layout: false, init: false, authorized: false, uid: null }));
					try {
						document.querySelector(".mji-manager-app")?.remove();
					} catch {}
				},
			});
		}
	});
}