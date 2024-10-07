export const getCurrentIp = () => {
    chrome.runtime.sendMessage({
        contentScrptQuery: 'enviroment-check-request'
    })
    chrome.runtime.onMessage.addListener((response) => {
        if(response.contentScriptQuery === 'enviroment-check-response') {
            return response.enviroment;
        }
    })
}