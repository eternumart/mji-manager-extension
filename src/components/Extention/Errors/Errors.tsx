import React from "react";
import { useAppContext } from "../../../context/Context";

export const Errors = () => {
	const { errorText } = useAppContext();

	// ✅ Если ошибки нет — ничего не рендерим
	if (!errorText) return null;

	return <p className="server-error">{errorText}</p>;
};