import { appVariables } from "./constants";

export const changeTab = (clickedTab: HTMLElement) => {
    appVariables.tabs.forEach((tab: any) => {
        if (tab === clickedTab) {
            tab.classList.add("tabs__button_active");
        } else {
            tab.classList.remove("tabs__button_active");
        }
    });
    appVariables.tabsContent.forEach((content: HTMLElement) => {
        if (clickedTab.id === content.id) {
            content.classList.remove("content_deactive");
        } else {
            content.classList.add("content_deactive");
        }
    });
}