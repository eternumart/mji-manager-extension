import React, { useEffect, useState } from "react";
import { EnviromentSwitch } from "../EnviromentSwitch/EnviromentSwitch";
import { UpdateLink } from "../UpdateLink";
import { Authorization } from "../Authorization";
import { Logged } from "../Logged";
import { Loader } from "../Loader";
import { useAuth } from "../../../context/AuthContext";
import { apiConfig } from "../../../apiConfig";
import { getAppData } from "../utils/launchApp";

function App() {
	const { isLogged, setIsLogged, setUserData, serverState } = useAuth();
	const [isLoaded, setIsLoaded] = useState(false);

	const prodUrl = `${apiConfig.address.protocol}${apiConfig.address.ip}`;
	const baseUrl = serverState === "prod" ? prodUrl : `${prodUrl}:${apiConfig.address.devPort}`;

	useEffect(() => {
		console.log("🌍 Устанавливаем baseUrl:", baseUrl);
	  
		chrome.storage.local.get(null, (result) => { // Теперь получаем ВСЕ данные в local storage
		  console.log("📂 Все данные в storage:", result);
		  
		  if (result[baseUrl]?.fio && result[baseUrl]?.login) {
			console.log("✅ Пользователь найден в storage, авторизация подтверждена.");
			setIsLogged(true);
			setUserData({ fio: result[baseUrl].fio, login: result[baseUrl].login });
			getAppData(result[baseUrl])
		  } else {
			console.warn("⚠️ В local storage нет данных для текущего `baseUrl`.");
		  }
		  setIsLoaded(true);
		});
	  }, [serverState]);
	  

	return (
		<>
			<EnviromentSwitch />
			<UpdateLink />
			{isLogged && isLoaded ? <Logged /> : <Authorization />}
			{!isLoaded && <Loader />}
		</>
	);
}

export default App;
