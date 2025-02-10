export const saveToCache = (key: string, data: any) => {
    console.log(`💾 Сохранение данных в chrome.storage.local (ключ: ${key})`, data);
  
    chrome.storage.local.set({ [key]: data }, () => {
      if (chrome.runtime.lastError) {
        console.error("❌ Ошибка сохранения в chrome.storage:", chrome.runtime.lastError);
      } else {
        console.log("✅ Данные успешно сохранены в chrome.storage.");
      }
    });
  };
  
