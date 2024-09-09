export const changePopupState = (status: string) => {
	if (status === "logged") {
		document.querySelector(".auth")?.classList.add("auth_hidden");
		document.querySelector(".logged")?.classList.remove("logged_hidden");
	} else {
		return;
	}
}