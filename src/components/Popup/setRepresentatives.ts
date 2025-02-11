export const setRepresentatives = () => {
    if (!window.appData.functions.setRepresentatives || window.appVariables.currentPage === "parser") {
        return;
    }

    const representatives = window.appData.representativesData;
    
    Object.keys(window.representativesInputs).forEach((key) => {
        for (let i = 1; i < Object.keys(window.representativesInputs[key]).length; i += 2) {
            if (typeof window.representativesInputs[key] == "boolean") {
                break;
            }

            const firstColName = Object.keys(window.representativesInputs[key])[i]; // licaOt
            const secondColName = Object.keys(window.representativesInputs[key])[i - 1]; // LicaDoljnost
            const thirdColName = Object.keys(window.representativesInputs[key])[i + 1]; // licaFio

            const firstColInput = window.representativesInputs[key][firstColName][0];
            const secondColInput = window.representativesInputs[key][secondColName][0];
            const thirdColInput = window.representativesInputs[key][thirdColName][0];

            switch (secondColInput.value) {
                case "Генеральный директор": {
                    firstColInput.value = "ООО СпецСтройЭксперт";
                    secondColInput.value = "Генеральный директор";
                    thirdColInput.value = representatives["Генеральный директор"];
                    break;
                }
                case "Директор": {
                    firstColInput.value = "ООО СпецСтройЭксперт";
                    secondColInput.value = "Генеральный директор";
                    thirdColInput.value = representatives["Генеральный директор"];
                    break;
                }
                case "Руководитель работ": {
                    firstColInput.value = "ООО СпецСтройЭксперт";
                    thirdColInput.value = representatives["Руководитель работ"];
                    break;
                }
                case "Исполнитель работ": {
                    firstColInput.value = "ООО СпецСтройЭксперт";
                    thirdColInput.value = window.appVariables.currentFio;
                }
            }
        }
    });
}