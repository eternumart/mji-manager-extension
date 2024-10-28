export {};

declare global {
  interface Window {
    runApp: (currentFio: string, login: string, loginIsPossible: boolean, launchStatus: boolean, appData: any) => void;
    appData: any;
    appVariables: any;
    representativesInputs: any;
    resultsDefectsInputs: any;
    allRatesPercentsInputs: any;
  }
}
