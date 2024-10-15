import { appVariables } from "./constants";

export const openFakeSelect = (selectList: any) => {
    const appVariables: appVariables = {};
    if (appVariables.htmlBody.querySelector(".fakeSelect_opened")) {
        closeFakeSelect(appVariables.htmlBody.querySelector(".fakeSelect_opened"));
    }
    selectList.classList.add("fakeSelect_opened");
}

export const closeFakeSelect = (selectList: any) => {
    selectList.classList.remove("fakeSelect_opened");
}