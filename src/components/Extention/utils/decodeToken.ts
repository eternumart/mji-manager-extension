/**
 * 🔥 Функция безопасного декодирования JWT-токена
 * @param token - JWT-токен
 * @returns Декодированные данные токена или `null`, если ошибка
 */
export function decodeToken(token: string) {
    try {
        if (!token || typeof token !== "string") {
            console.warn("❌ Пустой или некорректный токен");
            return null;
        }

        const base64Payload = token.split(".")[1];
        if (!base64Payload) throw new Error("❌ Некорректный формат токена");

        // ✅ Исправляем `Base64` (заменяем `-` на `+` и `_` на `/`)
        const decodedPayload = decodeURIComponent(escape(atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"))));
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error("❌ Ошибка декодирования токена:", error);
        return null;
    }
}
