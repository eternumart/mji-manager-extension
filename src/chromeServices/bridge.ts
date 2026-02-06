/**
 * Content script-мост между попапом и background.
 * Для UPLOAD_PDF сначала открываем порт "pdf-upload" (keep-alive), затем шлём запрос в SW — SW не уходит в неактивен за счёт пинг/понг по порту каждую 1 с.
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

// Запросы от страницы/попапа
window.addEventListener("message", (ev: MessageEvent) => {
	if (!isFromPage(ev)) return;
	const payload = ev.data.payload;
	const isPdfUpload = (payload as any)?.type === "UPLOAD_PDF";
	let pdfPort: chrome.runtime.Port | null = null;
	if (isPdfUpload) {
		pdfPort = chrome.runtime.connect({ name: "pdf-upload" });
		pdfPort.onMessage.addListener((msg: { type?: string }) => {
			if (msg?.type === "ping" && pdfPort) pdfPort.postMessage({ type: "pong" });
		});
	}
	chrome.runtime.sendMessage(payload).catch((err) => {
		if (pdfPort) pdfPort.disconnect();
		console.warn("[MJI bridge] sendMessage error:", err);
		window.postMessage(
			{
				type: MJI_EXTENSION_RESPONSE,
				payload: { type: (payload as any)?.type + "_RESPONSE" || "ERROR", error: String(err) },
			},
			"*"
		);
	});
});

// Ответы от background — пересылаем на страницу: postMessage + CustomEvent (попап может быть в iframe)
chrome.runtime.onMessage.addListener((message: any) => {
	const forwardTypes = [
		"REPHRASE_DEFECTS_BLOCK_RESPONSE",
		"UPLOAD_COMPLETE",
		"UPLOAD_FAILED",
		"PDF_STEP_UPDATE",
	];
	if (message && forwardTypes.includes(message.type)) {
		window.postMessage({ type: MJI_EXTENSION_RESPONSE, payload: message }, "*");
		try {
			document.dispatchEvent(new CustomEvent("MJI_PDF_UPDATE", { detail: message }));
		} catch (_) {}
	}
});

	console.log("[MJI] bridge content script загружен");

export {};
