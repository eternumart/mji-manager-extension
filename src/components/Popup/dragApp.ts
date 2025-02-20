export const startDraggingDiv = (event: MouseEvent) => {
    event.preventDefault(); // ❌ Отключаем стандартное выделение текста

    const app = window.appVariables.app;
    const dragIco = window.appVariables.dragIco;
    const html = window.appVariables.html;

    dragIco.style.cursor = "grabbing";

    // 📌 Вычисляем смещение курсора внутри элемента (чтобы курсор был в центре при перетаскивании)
    const shiftX = event.clientX - app.getBoundingClientRect().left;
    const shiftY = event.clientY - app.getBoundingClientRect().top;

    // 🔥 Отключаем выделение текста во время перетаскивания
    document.body.style.userSelect = "none";

    function moveAt(clientX: number, clientY: number) {
        app.style.left = `${clientX - shiftX}px`;
        app.style.top = `${clientY - shiftY}px`;
    }

    function onMouseMove(event: MouseEvent) {
        moveAt(event.clientX, event.clientY);
    }

    function onMouseUp() {
        html.removeEventListener("mousemove", onMouseMove);
        html.removeEventListener("mouseup", onMouseUp);

        // ✅ Возвращаем стиль курсора и разрешаем выделение текста
        dragIco.style.cursor = "grab";
        document.body.style.userSelect = "";
    }

    html.addEventListener("mousemove", onMouseMove);
    html.addEventListener("mouseup", onMouseUp);

    // Начальное перемещение
    moveAt(event.clientX, event.clientY);
};

// ❌ Полностью блокируем дефолтное поведение drag&drop
export const removeDefaultDrag = () => false;
