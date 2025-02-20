import styles from "../../../styles/components/Errors.module.scss";
import React from "react";
import { useAppContext } from "../../../context/Context";

export const Errors = () => {
	const { errorText } = useAppContext();

	// ✅ Если ошибки нет — ничего не рендерим
	if (!errorText) return null;

	return <p className={styles.serverError}>{errorText}</p>;
};