/**
 * Content script-мост между попапом (целевая страница) и background расширения.
 * Инжектируется во все фреймы (all_frames: true), чтобы работало и когда попап в iframe:
 * запрос от попапа приходит в window того же фрейма, ответ уходит в тот же window.
 * Попап может не иметь доступа к chrome.* (контекст страницы), с сайта нельзя делать fetch из-за CORS.
 * Запросы: попап -> window.postMessage -> bridge -> chrome.runtime.sendMessage -> background.
 * Ответы: background -> chrome.runtime.sendMessage -> bridge -> window.postMessage -> попап.
 */

const MJI_EXTENSION_REQUEST = "MJI_EXTENSION_REQUEST";
const MJI_EXTENSION_RESPONSE = "MJI_EXTENSION_RESPONSE";

function isFromPage(ev: MessageEvent): boolean {
	try {
		return ev.data?.type === MJI_EXTENSION_REQUEST && ev.data?.payload != null;
	} catch {
		return false;
	}
}

// Запросы от страницы/попапа — пересылаем в background.
// Для UPLOAD_PDF держим порт открытым, чтобы service worker не засыпал во время долгого запроса.
window.addEventListener("message", (ev: MessageEvent) => {
	if (!isFromPage(ev)) return;
	const payload = ev.data.payload;
	const isPdfUpload = (payload as any)?.type === "UPLOAD_PDF";
	let keepAlivePort: chrome.runtime.Port | null = null;
	if (isPdfUpload) {
		keepAlivePort = chrome.runtime.connect({ name: "pdf-upload" });
	}
	chrome.runtime.sendMessage(payload).catch((err) => {
		if (keepAlivePort) keepAlivePort.disconnect();
		console.warn("[MJI bridge] sendMessage error:", err);
		window.postMessage(
			{
				type: MJI_EXTENSION_RESPONSE,
				payload: { type: (payload as any)?.type + "_RESPONSE" || "ERROR", error: String(err) },
			},
			"*"
		);
	});
	// Порт закроет background после доставки результата (onConnect в DOMEvaluator).
});

// Ответы от background — пересылаем на страницу (попап без доступа к chrome получит через window message)
chrome.runtime.onMessage.addListener((message: any) => {
	const forwardTypes = [
		"REPHRASE_DEFECTS_BLOCK_RESPONSE",
		"UPLOAD_COMPLETE",
		"UPLOAD_FAILED",
		"PDF_STEP_UPDATE",
	];
	if (message && forwardTypes.includes(message.type)) {
		window.postMessage({ type: MJI_EXTENSION_RESPONSE, payload: message }, "*");
	}
});

	console.log("[MJI] bridge content script загружен");

export {};
