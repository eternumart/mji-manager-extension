import React, { useEffect, useState } from "react";
import { EnviromentSwitch } from "../EnviromentSwitch/EnviromentSwitch";
import { UpdateLink } from "../UpdateLink";
import { Authorization } from "../Authorization";
import { Logged } from "../Logged";
import { Loader } from "../Loader";
import { useAuth } from "../../../context/AuthContext";

function App() {
  const { isLogged, setIsLogged, setUserData, serverState } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  const baseUrl = serverState === "prod" ? "http://mjimanager.ru" : "http://mjimanager.ru:3000";

  useEffect(() => {
    console.log("Base URL установлен:", baseUrl);

    chrome.storage.local.get(baseUrl, (result) => {
      console.log("Полученные данные из storage:", result);
      if (result[baseUrl]?.logged && result[baseUrl]?.fio) {
        console.log("Вход в систему уже был");
        setIsLogged(true);
        setUserData({ fio: result[baseUrl].fio, login: result[baseUrl].logged });
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
