export const startDraggingDiv = (event: any) => {
    window.appVariables.dragIco.style.cursor = "grabbing";
    let shiftX = event.clientX - window.appVariables.app.getBoundingClientRect().left;

    window.appVariables.html.addEventListener("mousemove", onMouseMove);
    window.appVariables.html.addEventListener("mouseup", () => {
        window.appVariables.html.removeEventListener("mousemove", onMouseMove);
        window.appVariables.dragIco.style.cursor = "grab";
        window.appVariables.dragIco.onmouseup = null;
    });

    function moveAt(screenX: any, screenY: any) {
        window.appVariables.app.style.left = screenX - 255 + "px";
        window.appVariables.app.style.top = screenY - 142 + "px";
    }

    function onMouseMove(event: any) {
        moveAt(event.screenX, event.screenY);
    }

    moveAt(event.screenX, event.screenY);
}

export const removeDefaultDrag = () => {
    return false;
}