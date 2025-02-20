import styles from "../../../styles/components/UpdateLink.module.scss";
export const UpdateLink = () => {
	return (
		<a className={styles.update} href='https://github.com/eternumart/Chrome-App/raw/dev/App/Chrome-App.exe' target='_blank' rel="noreferrer">
			Скачать последнюю версию
		</a>
	);
};
