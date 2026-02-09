/**
 * Связь попапа с background расширения.
 * Попап встроен в целевой сайт; у него может не быть прямого доступа к chrome.*, с сайта нельзя делать fetch (CORS).
 * Сначала пробуем chrome.runtime.sendMessage; если нет доступа — шлём через window.postMessage, мост (content script) перешлёт в background.
 */

const MJI_EXTENSION_REQUEST = "MJI_EXTENSION_REQUEST";
export const MJI_EXTENSION_RESPONSE = "MJI_EXTENSION_RESPONSE";

function hasChromeRuntime(): boolean {
	try {
		return typeof (window as any).chrome !== "undefined" && !!(window as any).chrome?.runtime;
	} catch {
		return false;
	}
}

/**
 * Отправить сообщение в background. Если есть chrome.runtime — напрямую, иначе через postMessage (подхватит мост).
 * frameId из appVariables подмешивается, чтобы background доставлял ответы в правильный фрейм (попап может быть в iframe).
 */
export function sendToBackground(message: object): void {
	const payload = { ...message } as Record<string, unknown>;
	const frameId = (window as any).appVariables?.frameId;
	if (frameId !== undefined && frameId !== null) {
		payload.frameId = frameId;
	}
	if (hasChromeRuntime()) {
		(window as any).chrome.runtime.sendMessage(payload).catch((err: unknown) => {
			console.warn("[MJI] sendToBackground error:", err);
		});
		return;
	}
	window.postMessage({ type: MJI_EXTENSION_REQUEST, payload }, "*");
}

/**
 * Подписаться на ответы от background. Вызывать один раз при инициализации попапа.
 * handler вызывается для сообщений REPHRASE_DEFECTS_BLOCK_RESPONSE, UPLOAD_COMPLETE, UPLOAD_FAILED
 * (приходят либо из chrome.runtime.onMessage, либо из window message от моста).
 */
export function onBackgroundResponse(handler: (message: any) => void): () => void {
	const forwardTypes = [
		"REPHRASE_DEFECTS_BLOCK_RESPONSE",
		"UPLOAD_COMPLETE",
		"UPLOAD_FAILED",
		"PDF_STEP_UPDATE",
	];

	const handleChromeMessage = (message: any) => {
		if (message && forwardTypes.includes(message.type)) handler(message);
	};

	const handleWindowMessage = (ev: MessageEvent) => {
		try {
			if (ev.data?.type === MJI_EXTENSION_RESPONSE && ev.data?.payload)
				handleChromeMessage(ev.data.payload);
		} catch (_) {}
	};

	if (hasChromeRuntime()) {
		(window as any).chrome.runtime.onMessage.addListener(handleChromeMessage);
	}
	window.addEventListener("message", handleWindowMessage);

	return () => {
		if (hasChromeRuntime()) {
			(window as any).chrome.runtime.onMessage.removeListener(handleChromeMessage);
		}
		window.removeEventListener("message", handleWindowMessage);
	};
}
