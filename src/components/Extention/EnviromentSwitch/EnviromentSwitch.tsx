import { useEffect, useState } from "react";
import { apiConfig } from "../../../apiConfig";
import { useAuth } from "../../../context/AuthContext";

export const EnviromentSwitch = () => {
  const { serverState, setServerState } = useAuth();
  const [isDev, setIsDev] = useState(serverState === "test");

  useEffect(() => {
    chrome.runtime.sendMessage({
      contentScriptQuery: "app-loaded-response",
      enviroment: isDev ? "тестовый" : "основной",
      baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${isDev ? ":" + apiConfig.address.devPort : ""}/`,
    });
    console.log(isDev ? "Запущено сообщение с тестовым сервером" : "Запущено сообщение с основным сервером");
  }, [isDev]);

  const handleSwitch = (evt: any) => {
    const dev = evt.target.checked;
    setIsDev(dev);
    setServerState(dev ? "test" : "prod");

    chrome.runtime.sendMessage({
      contentScriptQuery: "enviromentSwitch-request",
      enviroment: dev ? "тестовый" : "основной",
      baseUrl: `${apiConfig.address.protocol}${apiConfig.address.ip}${dev ? ":" + apiConfig.address.devPort : ""}/`,
    });
    console.log(dev ? "Сервер изменен на тестовый" : "Сервер изменен на основной");
  };

  return (
    <div className='switcher'>
      <label className='switch'>
        <input type='checkbox' checked={isDev} onChange={handleSwitch} />
        <span className='slider'></span>
      </label>{" "}
      <span>{isDev ? "Тестовый" : "Основной"}&nbsp;сервер</span>
    </div>
  );
};
