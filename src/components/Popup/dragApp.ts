import { appVariables } from "./constants";

export const startDraggingDiv = (event: any) => {
    appVariables.dragIco.style.cursor = "grabbing";
    let shiftX = event.clientX - appVariables.app.getBoundingClientRect().left;

    appVariables.html.addEventListener("mousemove", onMouseMove);
    appVariables.html.addEventListener("mouseup", () => {
        appVariables.html.removeEventListener("mousemove", onMouseMove);
        appVariables.dragIco.style.cursor = "grab";
        appVariables.dragIco.onmouseup = null;
    });

    function moveAt(screenX: any, screenY: any) {
        appVariables.app.style.left = screenX - 255 + "px";
        appVariables.app.style.top = screenY - 142 + "px";
    }

    function onMouseMove(event: any) {
        moveAt(event.screenX, event.screenY);
    }

    moveAt(event.screenX, event.screenY);
}

export const removeDefaultDrag = () => {
    return false;
}