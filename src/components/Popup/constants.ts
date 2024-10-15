interface appVariables {
  [key: string]: any;
}
interface resultsDefectsInputs {
  [key: string]: any;
}
interface representativesInputs {
  [key: string]: any;
}
interface allRatesPercentsInputs {
  [key: string]: any;
}

// Хранилище всех переменных приложения
const appVariables: appVariables = {};
const resultsDefectsInputs: resultsDefectsInputs = {
  empty: true,
  inputs: [],
};
const representativesInputs: representativesInputs = {
  empty: true,
};
const allRatesPercentsInputs: allRatesPercentsInputs = {};

export {
  appVariables,
  resultsDefectsInputs,
  representativesInputs,
  allRatesPercentsInputs,
};
