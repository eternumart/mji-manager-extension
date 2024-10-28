import { setToStorage } from "./setToStorage";
import { clearCache } from "./clearCache";
import { minimizeApp } from "./minimizeApp";
import { startDraggingDiv } from "./dragApp";

export const closeApp = () => {
    window.appVariables.cleanButton.removeEventListener("click", clearCache);
    window.appVariables.minimizeButton.removeEventListener("click", minimizeApp);
    window.appVariables.closeButton.removeEventListener("click", closeApp);
    window.appVariables.dragIco.removeEventListener("mousedown", startDraggingDiv);
    setToStorage(false, false, null, null);
    window.appVariables.app.remove();
    window.appVariables.htmlHead.querySelector("style").remove();
    window.appVariables.htmlBody.querySelectorAll(".fakeSelect").forEach((select: any) => {
        select.remove();
    });
    window.appVariables.htmlBody.querySelectorAll(".fakeSelect__selector").forEach((selector: any) => {
        selector.remove();
    });
}