export const initLoader = (form: HTMLElement, flag: Boolean | "clear") => {
    const loader = form.closest(".loader") as HTMLDivElement;
	if (flag) {
		loader.classList.add("loader_loading");
		form.classList.remove("auth__form_active");
	} else {
		loader.classList.remove("loader_loading");
		form.classList.add("auth__form_active");
	}
	if (flag === "clear") {
		loader.classList.remove("loader_loading");
	}
}