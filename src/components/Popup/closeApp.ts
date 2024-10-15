import { setToStorage } from "./setToStorage";
import { appVariables } from "./constants";
import { clearCache } from "./clearCache";
import { minimizeApp } from "./minimizeApp";
import { startDraggingDiv } from "./dragApp";

export const closeApp = () => {
    appVariables.cleanButton.removeEventListener("click", clearCache);
    appVariables.minimizeButton.removeEventListener("click", minimizeApp);
    appVariables.closeButton.removeEventListener("click", closeApp);
    appVariables.dragIco.removeEventListener("mousedown", startDraggingDiv);
    setToStorage(false, false, null, null);
    appVariables.app.remove();
    appVariables.htmlHead.querySelector("style").remove();
    appVariables.htmlBody.querySelectorAll(".fakeSelect").forEach((select: any) => {
        select.remove();
    });
    appVariables.htmlBody.querySelectorAll(".fakeSelect__selector").forEach((selector: any) => {
        selector.remove();
    });
}