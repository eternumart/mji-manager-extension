export const clickGenerator = (ocenkaInput: any, value: any, load: any) => {
    if (!ocenkaInput) return;
    if (load && value === "-") {
        return;
    }
    try {
        const dataElement = ocenkaInput.parentElement.nextElementSibling;
        const listItems = dataElement.querySelectorAll("li");
        for (let i = 0; i < listItems.length; i++) {
            const a = listItems[i].querySelector("a");
            if (a.textContent === value) {
                a.click();
                return;
            }
        }
    } catch {
        console.error(`clickGenerator failed: can't click`);
        return;
    }
}