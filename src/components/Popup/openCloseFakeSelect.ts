export const openFakeSelect = (selectList: any) => {
    if (window.appVariables.htmlBody.querySelector(".fakeSelect_opened")) {
        closeFakeSelect(window.appVariables.htmlBody.querySelector(".fakeSelect_opened"));
    }
    selectList.classList.add("fakeSelect_opened");
}

export const closeFakeSelect = (selectList: any) => {
    selectList.classList.remove("fakeSelect_opened");
}