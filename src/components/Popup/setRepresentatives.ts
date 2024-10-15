import { appVariables, representativesInputs } from "./constants";
import { appData } from ".";

export const setRepresentatives = () => {
    if (!appData.availableFunctions.setRepresentatives) {
        return;
    }

    const representatives = appData.representativesData;
    
    Object.keys(representativesInputs).forEach((key) => {
        for (let i = 1; i < Object.keys(representativesInputs[key]).length; i += 2) {
            if (typeof representativesInputs[key] == "boolean") {
                break;
            }

            const firstColName = Object.keys(representativesInputs[key])[i]; // licaOt
            const secondColName = Object.keys(representativesInputs[key])[i - 1]; // LicaDoljnost
            const thirdColName = Object.keys(representativesInputs[key])[i + 1]; // licaFio

            const firstColInput = representativesInputs[key][firstColName][0];
            const secondColInput = representativesInputs[key][secondColName][0];
            const thirdColInput = representativesInputs[key][thirdColName][0];

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
                    thirdColInput.value = appVariables.currentFio;
                }
            }
        }
    });
}