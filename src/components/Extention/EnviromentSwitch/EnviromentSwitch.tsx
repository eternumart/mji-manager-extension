import styles from "../../../styles/components/EnviromentSwitch.module.scss";
import { useAppContext } from "../../../context/Context";
import { apiConfig } from "../../../apiConfig";

export const EnviromentSwitch = () => {
	const { serverState, setServerState } = useAppContext();
	const isDev = serverState === "test";

	const handleSwitch = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const dev = evt.target.checked;
		setServerState(dev ? "test" : "prod");

		chrome.runtime.sendMessage({
			contentScriptQuery: "enviromentSwitch-request",
			enviroment: dev ? "тестовый" : "основной",
			baseUrl: dev
				? `${apiConfig.address.protocol}${apiConfig.address.devHost}:${apiConfig.address.devPort}`
				: `${apiConfig.address.protocol}${apiConfig.address.ip}`,
		});

		console.log(dev ? "✅ Сервер изменен на тестовый" : "✅ Сервер изменен на основной");
	};

	return (
		<div className={styles.switcher}>
			<label className={styles.switch}>
				<input type="checkbox" checked={isDev} onChange={handleSwitch} />
				<span className={styles.slider}></span>
			</label>{" "}
			<span>{isDev ? "Тестовый" : "Основной"}&nbsp;сервер</span>
		</div>
	);
};
