import { appVariables, representativesInputs, resultsDefectsInputs } from "./constants";
import { appData } from ".";

export const searchAllInputs = () => {

    if (!appData.availableFunctions.searchAllInputs) {
        return;
    }
    appVariables.area = appVariables.wholeAddress.split(",")[0];
    appVariables.district = appVariables.wholeAddress.split(",")[1];
    appVariables.address = appVariables.htmlBody.querySelector("#comboboxTextcomp_12339").value;
    appVariables.repairProjectsTable = appVariables.form.querySelector("#group_22130");
    appVariables.repairProjectsTableRows = appVariables.repairProjectsTable.querySelectorAll("tr");
    appVariables.conclusionsPrevSurvey = appVariables.form.querySelector("#gridSql_22131").querySelector(".data");
    appVariables.conclusionsPrevSurveyRows = appVariables.conclusionsPrevSurvey.querySelectorAll("tr");

    appVariables.recomendationsDone = appVariables.form.querySelector("#group_22127");
    appVariables.recomendationsRoofBlock = appVariables.recomendationsDone.querySelector("#group_22193");
    appVariables.roofTable = appVariables.recomendationsRoofBlock.querySelector("tbody");
    appVariables.roofRows = appVariables.roofTable.querySelectorAll("tr");

    appVariables.balconyBlock = appVariables.recomendationsDone.querySelector("#group_22196");
    appVariables.balconyTable = appVariables.balconyBlock.querySelector("tbody");
    appVariables.balconyRows = appVariables.balconyTable.querySelectorAll("tr");

    appVariables.mopBlock = appVariables.recomendationsDone.querySelector("#group_22201");
    appVariables.mopTable = appVariables.mopBlock.querySelector("tbody");
    appVariables.mopRows = appVariables.mopTable.querySelectorAll("tr");

    appVariables.heatSystemBlock = appVariables.recomendationsDone.querySelector("#group_22204");
    appVariables.heatSystemTable = appVariables.heatSystemBlock.querySelector("tbody");
    appVariables.heatSystemRows = appVariables.heatSystemTable.querySelectorAll("tr");

    appVariables.gvsBlock = appVariables.recomendationsDone.querySelector("#group_22205");
    appVariables.gvsTable = appVariables.gvsBlock.querySelector("tbody");
    appVariables.gvsRows = appVariables.gvsTable.querySelectorAll("tr");

    appVariables.hvsBlock = appVariables.recomendationsDone.querySelector("#group_22206");
    appVariables.hvsTable = appVariables.hvsBlock.querySelector("tbody");
    appVariables.hvsRows = appVariables.hvsTable.querySelectorAll("tr");

    appVariables.sewerBlock = appVariables.recomendationsDone.querySelector("#group_22207");
    appVariables.sewerTable = appVariables.sewerBlock.querySelector("tbody");
    appVariables.sewerRows = appVariables.sewerTable.querySelector("tr");

    appVariables.results = appVariables.form.querySelector("#group_22125");
    appVariables.resultsRoofBlock = appVariables.results.querySelector("#group_22243");
    appVariables.resultsRoofTable = appVariables.resultsRoofBlock.querySelector("tbody");
    appVariables.resultsRoofRows = appVariables.resultsRoofTable.querySelectorAll("tr");

    appVariables.resultsBalconyBlock = appVariables.results.querySelector("#group_22264");
    appVariables.resultsBalconyTable = appVariables.resultsBalconyBlock.querySelector("tbody");
    appVariables.resultsBalconyRows = appVariables.resultsBalconyTable.querySelectorAll("tr");

    appVariables.resultsMopBlock = appVariables.results.querySelector("#group_22268");
    appVariables.resultsMopTable = appVariables.resultsMopBlock.querySelector("tbody");
    appVariables.resultsMopRows = appVariables.resultsMopTable.querySelectorAll("tr");

    appVariables.resultHeatSystemBlock = appVariables.results.querySelector("#group_22271");
    appVariables.resultsHeatSystemTable = appVariables.resultHeatSystemBlock.querySelector("tbody");
    appVariables.resultsHeatSystemRows = appVariables.resultsHeatSystemTable.querySelectorAll("tr");

    appVariables.resultsGvsBlock = appVariables.results.querySelector("#group_22272");
    appVariables.resultsGvsTable = appVariables.resultsGvsBlock.querySelector("tbody");
    appVariables.resultsGvsRows = appVariables.resultsGvsTable.querySelectorAll("tr");

    appVariables.resultsHvsBlock = appVariables.results.querySelector("#group_22273");
    appVariables.resultsHvsTable = appVariables.resultsHvsBlock.querySelector("tbody");
    appVariables.resultsHvsRows = appVariables.resultsHvsTable.querySelectorAll("tr");

    appVariables.resultsSewerBlock = appVariables.results.querySelector("#group_22274");
    appVariables.resultsSewerTable = appVariables.resultsSewerBlock.querySelector("tbody");
    appVariables.resultsSewerRows = appVariables.resultsSewerTable.querySelectorAll("tr");

    appVariables.signatoriesBlock = appVariables.html.querySelector("#group_22133");
    appVariables.signatoriesTable = appVariables.signatoriesBlock.querySelector("tbody");
    appVariables.signatoriesRows = appVariables.signatoriesTable.querySelectorAll("tr");

    appVariables.options = new Object();
    appVariables["options"]["Крыша"] = new Object();
    appVariables["options"]["Крыша"]["Конструкция крыши"] = appVariables.results.querySelector("#lookupTextcomp_12453");
    appVariables["options"]["Крыша"]["Материал кровли"] = appVariables.results.querySelector("#lookupTextcomp_12454");

    appVariables["options"]["Водоотвод"] = new Object();
    appVariables["options"]["Водоотвод"]["Тип водоотвода"] = appVariables.results.querySelector("#lookupTextcomp_12456");
    appVariables["options"]["Водоотвод"]["Материал водоотвода"] = appVariables.results.querySelector("#lookupTextcomp_12457");

    appVariables["options"]["Межпанельные стыки"] = new Object();
    appVariables["options"]["Межпанельные стыки"]["Тип стыков"] = appVariables.results.querySelector("#lookupTextcomp_12458");
    appVariables["options"]["Межпанельные стыки"]["Тип стыков"] = appVariables.results.querySelector("#lookupTextcomp_12458");

    appVariables["options"]["Фасад"] = new Object();
    appVariables["options"]["Фасад"]["Отделка стен"] = appVariables.results.querySelector("#lookupTextcomp_12460");
    appVariables["options"]["Фасад"]["Отделка цоколя"] = appVariables.results.querySelector("#lookupTextcomp_12461");
    appVariables["options"]["Фасад"]["Оконные заполнения"] = appVariables.results.querySelector("#lookupTextcomp_12462");

    appVariables["options"]["Стены"] = new Object();
    appVariables["options"]["Стены"]["Материал стен"] = appVariables.results.querySelector("#lookupTextcomp_12444");
    appVariables["options"]["Стены"]["Теплофизические свойства"] = appVariables.results.querySelector("#lookupTextcomp_12445");

    appVariables["options"]["Лестницы"] = new Object();
    appVariables["options"]["Лестницы"]["Конструкция"] = appVariables.results.querySelector("#lookupTextcomp_12370");

    appVariables["options"]["Перекрытия"] = new Object();
    appVariables["options"]["Перекрытия"]["Материал перекрытия"] = appVariables.results.querySelector("#lookupTextcomp_12371");

    appVariables["options"]["Система отопления"] = new Object();
    appVariables["options"]["Система отопления"]["Вид отопления"] = appVariables.results.querySelector("#lookupTextcomp_12605");
    appVariables["options"]["Система отопления"]["Материал трубопроводов"] = appVariables.results.querySelector("#lookupTextcomp_13393");
    appVariables["options"]["Система отопления"]["Тип приборов"] = appVariables.results.querySelector("#lookupTextcomp_12372");
    appVariables["options"]["Система отопления"]["Термо-регуляторы в квартирах"] = appVariables.results.querySelector("#lookupTextcomp_12373");
    appVariables["options"]["Система отопления"]["Наличие ОДУУ"] = appVariables.results.querySelector("#lookupTextcomp_12375");
    appVariables["options"]["Система отопления"]["Тип стояков"] = appVariables.results.querySelector("#lookupTextcomp_12299");

    appVariables["options"]["ГВС"] = new Object();
    appVariables["options"]["ГВС"]["Тип системы"] = appVariables.results.querySelector("#lookupTextcomp_12378");
    appVariables["options"]["ГВС"]["Материал трубопроводов"] = appVariables.results.querySelector("#lookupTextcomp_12379");
    appVariables["options"]["ГВС"]["Наличие ОДУУ"] = appVariables.results.querySelector("#lookupTextcomp_12380");
    appVariables["options"]["ГВС"]["Тип стояков"] = appVariables.results.querySelector("#lookupTextcomp_13394");

    appVariables["options"]["ХВС"] = new Object();
    appVariables["options"]["ХВС"]["Материал трубопроводов"] = appVariables.results.querySelector("#lookupTextcomp_12382");
    appVariables["options"]["ХВС"]["Наличие ОДУУ"] = appVariables.results.querySelector("#lookupTextcomp_12381");
    appVariables["options"]["ХВС"]["Тип стояков"] = appVariables.results.querySelector("#lookupTextcomp_13395");

    appVariables["options"]["Канализация"] = new Object();
    appVariables["options"]["Канализация"]["Материал трубопроводов"] = appVariables.results.querySelector("#lookupTextcomp_12383");
    appVariables["options"]["Канализация"]["Тип стояков"] = appVariables.results.querySelector("#lookupTextcomp_13396");

    // ПАСПОРТНЫЕ ДАННЫЕ
    appVariables.passportDannye = new Object();

    appVariables.passportDannye.etajei = appVariables.form.querySelector("#comp_12472");
    appVariables.passportDannye.podjezdov = appVariables.form.querySelector("#comp_12473");
    appVariables.passportDannye.stroyObjem = appVariables.form.querySelector("#comp_12474");
    appVariables.passportDannye.kvartir = appVariables.form.querySelector("#comp_12475");
    appVariables.passportDannye.poleznayaPloschad = appVariables.form.querySelector("#comp_12476");
    appVariables.passportDannye.jilayaPloschad = appVariables.form.querySelector("#comp_12477");
    appVariables.passportDannye.neJilayaPloschad = appVariables.form.querySelector("#comp_12478");
    appVariables.passportDannye.seriyaProekta = appVariables.form.querySelector("#lookupTextcomp_12479");
    appVariables.passportDannye.godPostrioki = appVariables.form.querySelector("#comp_12480");
    appVariables.passportDannye.godRekonstrukcii = appVariables.form.querySelector("#comp_12481");
    appVariables.passportDannye.klassEnergoeffectivnosti = appVariables.form.querySelector("#lookupTextcomp_12482");
    appVariables.passportDannye.fizIznos = appVariables.form.querySelector("#comp_12661");
    appVariables.passportDannye.dannyeBtiData = appVariables.form.querySelector("#comp_12662");
    appVariables.passportDannye.nalichVstroenSooruj = appVariables.form.querySelector("#lookupTextcomp_12663");
    appVariables.passportDannye.kolichVstroenSooruj = appVariables.form.querySelector("#comp_12664");
    appVariables.passportDannye.kolichNadstroenSooruj = appVariables.form.querySelector("#comp_12671");
    appVariables.passportDannye.tp = appVariables.form.querySelector("#comp_12665");
    appVariables.passportDannye.maslyanieTp = appVariables.form.querySelector("#comp_12666");
    appVariables.passportDannye.magistraliTranzit = appVariables.form.querySelector("#lookupTextcomp_12667");
    appVariables.passportDannye.potreblenieTeplaFact = appVariables.form.querySelector("#comp_12668");
    appVariables.passportDannye.potreblenieTeplaProekt = appVariables.form.querySelector("#comp_12669");
    appVariables.passportDannye.potreblenieTeplaOtklonenie = appVariables.form.querySelector("#comp_12670");

    // ТЕХ ЗАКЛЮЧЕНИЯ И ПРОЕКТЫ РЕМОНТОВ
    appVariables.tehZakluchenia = new Object();

    for (let i = 0; i < appVariables.repairProjectsTableRows.length; i++) {
        if (i < 1 || appVariables.repairProjectsTableRows[i].classList.contains("gridBGTotal")) {
            continue;
        }
        if (i > 1) {
            appVariables["tehZakluchenia"][i] = new Object();
            appVariables["tehZakluchenia"][i]["organizacia"] = appVariables.repairProjectsTableRows[i].querySelector("#comp_12333");
            appVariables["tehZakluchenia"][i]["dataNomer"] = appVariables.repairProjectsTableRows[i].querySelector("#comp_12334");
            appVariables["tehZakluchenia"][i]["naimenovanieSoderjanie"] = appVariables.repairProjectsTableRows[i].querySelector("#comp_12335");
        }
    }

    // ВЫВОДЫ ПО РЕЗУЛЬТАТАМ ПРЕДЫДУЩЕГО ОБСЛЕДОВАНИЯ
    appVariables.vivodyPoRezultatam = new Object();
    for (let i = 0; i < appVariables.conclusionsPrevSurveyRows.length; i++) {
        appVariables["vivodyPoRezultatam"][i] = new Object();

        appVariables["vivodyPoRezultatam"][i]["id"] = appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(1)").firstElementChild;
        appVariables["vivodyPoRezultatam"][i]["data"] = appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(2)");
        appVariables["vivodyPoRezultatam"][i]["number"] = appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(3)");
        appVariables["vivodyPoRezultatam"][i]["tehSostoyanie"] = appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(4)");
    }

    // РЕКОМЕНДАЦИИ ПО КАП РЕМОНТУ
    appVariables.recomend = new Object();
    // Крыша
    appVariables.recomend.krisha = new Object();
    for (let i = 1; i < appVariables.roofRows.length; i++) {
        switch (appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent) {
            case "Кровля":
                appVariables.recomend.krisha.krovla = new Object();
                appVariables.recomend.krisha.krovla.name = appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                appVariables.recomend.krisha.krovla.recomend = appVariables.roofRows[i].querySelector("#comp_12484");
                appVariables.recomend.krisha.krovla.trebObjom = appVariables.roofRows[i].querySelector("#comp_12485");
                appVariables.recomend.krisha.krovla.vypolnenGod = appVariables.roofRows[i].querySelector("#comp_12486");
                appVariables.recomend.krisha.krovla.factObjom = appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Свесы":
                appVariables.recomend.krisha.svesy = new Object();
                appVariables.recomend.krisha.svesy.name = appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                appVariables.recomend.krisha.svesy.recomend = appVariables.roofRows[i].querySelector("#comp_12484");
                appVariables.recomend.krisha.svesy.trebObjom = appVariables.roofRows[i].querySelector("#comp_12485");
                appVariables.recomend.krisha.svesy.vypolnenGod = appVariables.roofRows[i].querySelector("#comp_12486");
                appVariables.recomend.krisha.svesy.factObjom = appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Стропильная система":
                appVariables.recomend.krisha.stropilnayaSistema = new Object();
                appVariables.recomend.krisha.stropilnayaSistema.name = appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                appVariables.recomend.krisha.stropilnayaSistema.recomend = appVariables.roofRows[i].querySelector("#comp_12484");
                appVariables.recomend.krisha.stropilnayaSistema.trebObjom = appVariables.roofRows[i].querySelector("#comp_12485");
                appVariables.recomend.krisha.stropilnayaSistema.vypolnenGod = appVariables.roofRows[i].querySelector("#comp_12486");
                appVariables.recomend.krisha.stropilnayaSistema.factObjom = appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Чердак":
                appVariables.recomend.krisha.cherdak = new Object();
                appVariables.recomend.krisha.cherdak.name = appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                appVariables.recomend.krisha.cherdak.recomend = appVariables.roofRows[i].querySelector("#comp_12484");
                appVariables.recomend.krisha.cherdak.trebObjom = appVariables.roofRows[i].querySelector("#comp_12485");
                appVariables.recomend.krisha.cherdak.vypolnenGod = appVariables.roofRows[i].querySelector("#comp_12486");
                appVariables.recomend.krisha.cherdak.factObjom = appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Покрытие ж/б":
                appVariables.recomend.krisha.pokritieJB = new Object();
                appVariables.recomend.krisha.pokritieJB.name = appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                appVariables.recomend.krisha.pokritieJB.recomend = appVariables.roofRows[i].querySelector("#comp_12484");
                appVariables.recomend.krisha.pokritieJB.trebObjom = appVariables.roofRows[i].querySelector("#comp_12485");
                appVariables.recomend.krisha.pokritieJB.vypolnenGod = appVariables.roofRows[i].querySelector("#comp_12486");
                appVariables.recomend.krisha.pokritieJB.factObjom = appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Все элементы":
                appVariables.recomend.krisha.vseElementy = new Object();
                appVariables.recomend.krisha.vseElementy.name = appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                appVariables.recomend.krisha.vseElementy.recomend = appVariables.roofRows[i].querySelector("#comp_12484");
                appVariables.recomend.krisha.vseElementy.trebObjom = appVariables.roofRows[i].querySelector("#comp_12485");
                appVariables.recomend.krisha.vseElementy.vypolnenGod = appVariables.roofRows[i].querySelector("#comp_12486");
                appVariables.recomend.krisha.vseElementy.factObjom = appVariables.roofRows[i].querySelector("#comp_12487");
                break;
        }
    }

    // Водоотвод
    appVariables.recomend.vodootvod = new Object();
    appVariables.recomend.vodootvod.recomend = appVariables.recomendationsDone.querySelector("#comp_12489");
    appVariables.recomend.vodootvod.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12490");
    appVariables.recomend.vodootvod.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12491");
    appVariables.recomend.vodootvod.factObjom = appVariables.recomendationsDone.querySelector("#comp_12492");

    // Герметизация
    appVariables.recomend.germetizacia = new Object();
    appVariables.recomend.germetizacia.recomend = appVariables.recomendationsDone.querySelector("#comp_12359");
    appVariables.recomend.germetizacia.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12366");
    appVariables.recomend.germetizacia.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12365");
    appVariables.recomend.germetizacia.factObjom = appVariables.recomendationsDone.querySelector("#comp_12364");

    // Фасад
    appVariables.recomend.fasad = new Object();
    appVariables.recomend.fasad.recomend = appVariables.recomendationsDone.querySelector("#comp_12494");
    appVariables.recomend.fasad.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12495");
    appVariables.recomend.fasad.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12496");
    appVariables.recomend.fasad.factObjom = appVariables.recomendationsDone.querySelector("#comp_12364");

    // Балконы
    appVariables.recomend.balkony = new Object();
    appVariables.recomend.balkony.balkony = new Object();
    appVariables.recomend.balkony.lodjii = new Object();
    appVariables.recomend.balkony.kozirki = new Object();
    appVariables.recomend.balkony.erkery = new Object();
    appVariables.recomend.balkony.vseElementy = new Object();

    for (let i = 1; i < appVariables.balconyRows.length; i++) {
        switch (appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent) {
            case "Балконы":
                appVariables.recomend.balkony.balkony.name = appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                appVariables.recomend.balkony.balkony.recomend = appVariables.balconyRows[i].querySelector("#comp_12499");
                appVariables.recomend.balkony.balkony.trebObjom = appVariables.balconyRows[i].querySelector("#comp_12500");
                appVariables.recomend.balkony.balkony.vypolnenGod = appVariables.balconyRows[i].querySelector("#comp_12501");
                appVariables.recomend.balkony.balkony.factObjom = appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Лоджии":
                appVariables.recomend.balkony.lodjii.name = appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                appVariables.recomend.balkony.lodjii.recomend = appVariables.balconyRows[i].querySelector("#comp_12499");
                appVariables.recomend.balkony.lodjii.trebObjom = appVariables.balconyRows[i].querySelector("#comp_12500");
                appVariables.recomend.balkony.lodjii.vypolnenGod = appVariables.balconyRows[i].querySelector("#comp_12501");
                appVariables.recomend.balkony.lodjii.factObjom = appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Козырьки":
                appVariables.recomend.balkony.kozirki.name = appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                appVariables.recomend.balkony.kozirki.recomend = appVariables.balconyRows[i].querySelector("#comp_12499");
                appVariables.recomend.balkony.kozirki.trebObjom = appVariables.balconyRows[i].querySelector("#comp_12500");
                appVariables.recomend.balkony.kozirki.vypolnenGod = appVariables.balconyRows[i].querySelector("#comp_12501");
                appVariables.recomend.balkony.kozirki.factObjom = appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Эркеры":
                appVariables.recomend.balkony.erkery.name = appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                appVariables.recomend.balkony.erkery.recomend = appVariables.balconyRows[i].querySelector("#comp_12499");
                appVariables.recomend.balkony.erkery.trebObjom = appVariables.balconyRows[i].querySelector("#comp_12500");
                appVariables.recomend.balkony.erkery.vypolnenGod = appVariables.balconyRows[i].querySelector("#comp_12501");
                appVariables.recomend.balkony.erkery.factObjom = appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Все элементы":
                appVariables.recomend.balkony.vseElementy.name = appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                appVariables.recomend.balkony.vseElementy.recomend = appVariables.balconyRows[i].querySelector("#comp_12499");
                appVariables.recomend.balkony.vseElementy.trebObjom = appVariables.balconyRows[i].querySelector("#comp_12500");
                appVariables.recomend.balkony.vseElementy.vypolnenGod = appVariables.balconyRows[i].querySelector("#comp_12501");
                appVariables.recomend.balkony.vseElementy.factObjom = appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
        }
    }
    appVariables.recomend.balkony.balkony.osteklenie = appVariables.recomendationsDone.querySelector("#lookupTextcomp_12604");
    appVariables.recomend.balkony.lodjii.osteklenie = appVariables.recomendationsDone.querySelector("#lookupTextcomp_12603");

    // Стены
    appVariables.recomend.steny = new Object();
    appVariables.recomend.steny.recomend = appVariables.recomendationsDone.querySelector("#comp_12504");
    appVariables.recomend.steny.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12505");
    appVariables.recomend.steny.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12506");
    appVariables.recomend.steny.factObjom = appVariables.recomendationsDone.querySelector("#comp_12348");
    appVariables.recomend.steny.uteplenie = appVariables.recomendationsDone.querySelector("#lookupTextcomp_12602");

    // Подвал
    appVariables.recomend.podval = new Object();
    appVariables.recomend.podval.recomend = appVariables.recomendationsDone.querySelector("#comp_12360");
    appVariables.recomend.podval.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12361");
    appVariables.recomend.podval.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12362");
    appVariables.recomend.podval.factObjom = appVariables.recomendationsDone.querySelector("#comp_12363");

    // Тех.подполье
    appVariables.recomend.tehPodpolie = new Object();
    appVariables.recomend.tehPodpolie.recomend = appVariables.recomendationsDone.querySelector("#comp_12353");
    appVariables.recomend.tehPodpolie.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12507");
    appVariables.recomend.tehPodpolie.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12508");
    appVariables.recomend.tehPodpolie.factObjom = appVariables.recomendationsDone.querySelector("#comp_12509");

    // Тех.этаж
    appVariables.recomend.tehEtaj = new Object();
    appVariables.recomend.tehEtaj.recomend = appVariables.recomendationsDone.querySelector("#comp_12511");
    appVariables.recomend.tehEtaj.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12512");
    appVariables.recomend.tehEtaj.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12513");
    appVariables.recomend.tehEtaj.factObjom = appVariables.recomendationsDone.querySelector("#comp_12514");

    // Гараж стоянка (подземный)
    appVariables.recomend.garage = new Object();
    appVariables.recomend.garage.recomend = appVariables.recomendationsDone.querySelector("#comp_12516");
    appVariables.recomend.garage.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12517");
    appVariables.recomend.garage.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12518");
    appVariables.recomend.garage.factObjom = appVariables.recomendationsDone.querySelector("#comp_12519");

    // Места общего пользования
    appVariables.recomend.mop = new Object();
    for (let i = 1; i < appVariables.mopRows.length; i++) {
        switch (appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent) {
            case "Вестибюли":
                appVariables.recomend.mop.vestibuli = new Object();
                appVariables.recomend.mop.vestibuli.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.vestibuli.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.vestibuli.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.vestibuli.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.vestibuli.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Крыльца":
                appVariables.recomend.mop.krilca = new Object();
                appVariables.recomend.mop.krilca.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.krilca.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.krilca.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.krilca.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.krilca.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Пандусы наружные":
                appVariables.recomend.mop.pandusyNaruzh = new Object();
                appVariables.recomend.mop.pandusyNaruzh.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.pandusyNaruzh.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.pandusyNaruzh.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.pandusyNaruzh.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.pandusyNaruzh.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Пандусы внутриподъездные":
                appVariables.recomend.mop.pandusyVnutr = new Object();
                appVariables.recomend.mop.pandusyVnutr.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.pandusyVnutr.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.pandusyVnutr.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.pandusyVnutr.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.pandusyVnutr.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Сходы/съезды":
                appVariables.recomend.mop.shodySiezdy = new Object();
                appVariables.recomend.mop.shodySiezdy.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.shodySiezdy.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.shodySiezdy.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.shodySiezdy.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.shodySiezdy.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Окна, двери":
                appVariables.recomend.mop.oknaDveri = new Object();
                appVariables.recomend.mop.oknaDveri.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.oknaDveri.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.oknaDveri.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.oknaDveri.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.oknaDveri.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Внутренняя отделка помещений":
                appVariables.recomend.mop.vnOtdelkaPomesh = new Object();
                appVariables.recomend.mop.vnOtdelkaPomesh.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.vnOtdelkaPomesh.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.vnOtdelkaPomesh.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.vnOtdelkaPomesh.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.vnOtdelkaPomesh.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Все элементы":
                appVariables.recomend.mop.vseElementy = new Object();
                appVariables.recomend.mop.vseElementy.name = appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                appVariables.recomend.mop.vseElementy.recomend = appVariables.mopRows[i].querySelector("#comp_12521");
                appVariables.recomend.mop.vseElementy.trebObjom = appVariables.mopRows[i].querySelector("#comp_12522");
                appVariables.recomend.mop.vseElementy.vypolnenGod = appVariables.mopRows[i].querySelector("#comp_12523");
                appVariables.recomend.mop.vseElementy.factObjom = appVariables.mopRows[i].querySelector("#comp_12524");
                break;
        }
    }

    // Лестницы
    appVariables.recomend.lestnicy = new Object();
    appVariables.recomend.lestnicy.recomend = appVariables.recomendationsDone.querySelector("#comp_12526");
    appVariables.recomend.lestnicy.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12527");
    appVariables.recomend.lestnicy.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12528");
    appVariables.recomend.lestnicy.factObjom = appVariables.recomendationsDone.querySelector("#comp_12529");

    // Перекрытия
    appVariables.recomend.perekritya = new Object();
    appVariables.recomend.perekritya.recomend = appVariables.recomendationsDone.querySelector("#comp_12531");
    appVariables.recomend.perekritya.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12532");
    appVariables.recomend.perekritya.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12533");
    appVariables.recomend.perekritya.factObjom = appVariables.recomendationsDone.querySelector("#comp_12534");

    // Система отопления
    appVariables.recomend.sistemaOtoplenia = new Object();
    for (let i = 1; i < appVariables.heatSystemRows.length; i++) {
        switch (appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.recomend.sistemaOtoplenia.tehPodpolie = new Object();
                appVariables.recomend.sistemaOtoplenia.tehPodpolie.name = appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                appVariables.recomend.sistemaOtoplenia.tehPodpolie.recomend = appVariables.heatSystemRows[i].querySelector("#comp_12536");
                appVariables.recomend.sistemaOtoplenia.tehPodpolie.trebObjom = appVariables.heatSystemRows[i].querySelector("#comp_12537");
                appVariables.recomend.sistemaOtoplenia.tehPodpolie.vypolnenGod = appVariables.heatSystemRows[i].querySelector("#comp_12538");
                appVariables.recomend.sistemaOtoplenia.tehPodpolie.factObjom = appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Транзит питающий":
                appVariables.recomend.sistemaOtoplenia.tranzitPitaush = new Object();
                appVariables.recomend.sistemaOtoplenia.tranzitPitaush.name = appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                appVariables.recomend.sistemaOtoplenia.tranzitPitaush.recomend = appVariables.heatSystemRows[i].querySelector("#comp_12536");
                appVariables.recomend.sistemaOtoplenia.tranzitPitaush.trebObjom = appVariables.heatSystemRows[i].querySelector("#comp_12537");
                appVariables.recomend.sistemaOtoplenia.tranzitPitaush.vypolnenGod = appVariables.heatSystemRows[i].querySelector("#comp_12538");
                appVariables.recomend.sistemaOtoplenia.tranzitPitaush.factObjom = appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Чердак":
                appVariables.recomend.sistemaOtoplenia.cherdak = new Object();
                appVariables.recomend.sistemaOtoplenia.cherdak.name = appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                appVariables.recomend.sistemaOtoplenia.cherdak.recomend = appVariables.heatSystemRows[i].querySelector("#comp_12536");
                appVariables.recomend.sistemaOtoplenia.cherdak.trebObjom = appVariables.heatSystemRows[i].querySelector("#comp_12537");
                appVariables.recomend.sistemaOtoplenia.cherdak.vypolnenGod = appVariables.heatSystemRows[i].querySelector("#comp_12538");
                appVariables.recomend.sistemaOtoplenia.cherdak.factObjom = appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Этажи":
                appVariables.recomend.sistemaOtoplenia.etaji = new Object();
                appVariables.recomend.sistemaOtoplenia.etaji.name = appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                appVariables.recomend.sistemaOtoplenia.etaji.recomend = appVariables.heatSystemRows[i].querySelector("#comp_12536");
                appVariables.recomend.sistemaOtoplenia.etaji.trebObjom = appVariables.heatSystemRows[i].querySelector("#comp_12537");
                appVariables.recomend.sistemaOtoplenia.etaji.vypolnenGod = appVariables.heatSystemRows[i].querySelector("#comp_12538");
                appVariables.recomend.sistemaOtoplenia.etaji.factObjom = appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Вся система":
                appVariables.recomend.sistemaOtoplenia.vsaSistema = new Object();
                appVariables.recomend.sistemaOtoplenia.vsaSistema.name = appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                appVariables.recomend.sistemaOtoplenia.vsaSistema.recomend = appVariables.heatSystemRows[i].querySelector("#comp_12536");
                appVariables.recomend.sistemaOtoplenia.vsaSistema.trebObjom = appVariables.heatSystemRows[i].querySelector("#comp_12537");
                appVariables.recomend.sistemaOtoplenia.vsaSistema.vypolnenGod = appVariables.heatSystemRows[i].querySelector("#comp_12538");
                appVariables.recomend.sistemaOtoplenia.vsaSistema.factObjom = appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
        }
    }

    // ГВС
    appVariables.recomend.gvs = new Object();
    for (let i = 1; i < appVariables.gvsRows.length; i++) {
        switch (appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.recomend.gvs.tehPodpolie = new Object();
                appVariables.recomend.gvs.tehPodpolie.name = appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                appVariables.recomend.gvs.tehPodpolie.recomend = appVariables.gvsRows[i].querySelector("#comp_12541");
                appVariables.recomend.gvs.tehPodpolie.trebObjom = appVariables.gvsRows[i].querySelector("#comp_12542");
                appVariables.recomend.gvs.tehPodpolie.vypolnenGod = appVariables.gvsRows[i].querySelector("#comp_12543");
                appVariables.recomend.gvs.tehPodpolie.factObjom = appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Транзит питающий":
                appVariables.recomend.gvs.tranzitPitaush = new Object();
                appVariables.recomend.gvs.tranzitPitaush.name = appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                appVariables.recomend.gvs.tranzitPitaush.recomend = appVariables.gvsRows[i].querySelector("#comp_12541");
                appVariables.recomend.gvs.tranzitPitaush.trebObjom = appVariables.gvsRows[i].querySelector("#comp_12542");
                appVariables.recomend.gvs.tranzitPitaush.vypolnenGod = appVariables.gvsRows[i].querySelector("#comp_12543");
                appVariables.recomend.gvs.tranzitPitaush.factObjom = appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Чердак":
                appVariables.recomend.gvs.cherdak = new Object();
                appVariables.recomend.gvs.cherdak.name = appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                appVariables.recomend.gvs.cherdak.recomend = appVariables.gvsRows[i].querySelector("#comp_12541");
                appVariables.recomend.gvs.cherdak.trebObjom = appVariables.gvsRows[i].querySelector("#comp_12542");
                appVariables.recomend.gvs.cherdak.vypolnenGod = appVariables.gvsRows[i].querySelector("#comp_12543");
                appVariables.recomend.gvs.cherdak.factObjom = appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Этажи":
                appVariables.recomend.gvs.etaji = new Object();
                appVariables.recomend.gvs.etaji.name = appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                appVariables.recomend.gvs.etaji.recomend = appVariables.gvsRows[i].querySelector("#comp_12541");
                appVariables.recomend.gvs.etaji.trebObjom = appVariables.gvsRows[i].querySelector("#comp_12542");
                appVariables.recomend.gvs.etaji.vypolnenGod = appVariables.gvsRows[i].querySelector("#comp_12543");
                appVariables.recomend.gvs.etaji.factObjom = appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Вся система":
                appVariables.recomend.gvs.vsaSistema = new Object();
                appVariables.recomend.gvs.vsaSistema.name = appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                appVariables.recomend.gvs.vsaSistema.recomend = appVariables.gvsRows[i].querySelector("#comp_12541");
                appVariables.recomend.gvs.vsaSistema.trebObjom = appVariables.gvsRows[i].querySelector("#comp_12542");
                appVariables.recomend.gvs.vsaSistema.vypolnenGod = appVariables.gvsRows[i].querySelector("#comp_12543");
                appVariables.recomend.gvs.vsaSistema.factObjom = appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
        }
    }

    // ХВС
    appVariables.recomend.hvs = new Object();
    for (let i = 1; i < appVariables.hvsRows.length; i++) {
        switch (appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.recomend.hvs.tehPodpolie = new Object();
                appVariables.recomend.hvs.tehPodpolie.name = appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                appVariables.recomend.hvs.tehPodpolie.recomend = appVariables.hvsRows[i].querySelector("#comp_12546");
                appVariables.recomend.hvs.tehPodpolie.trebObjom = appVariables.hvsRows[i].querySelector("#comp_12547");
                appVariables.recomend.hvs.tehPodpolie.vypolnenGod = appVariables.hvsRows[i].querySelector("#comp_12548");
                appVariables.recomend.hvs.tehPodpolie.factObjom = appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Транзит питающий":
                appVariables.recomend.hvs.tranzitPitaush = new Object();
                appVariables.recomend.hvs.tranzitPitaush.name = appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                appVariables.recomend.hvs.tranzitPitaush.recomend = appVariables.hvsRows[i].querySelector("#comp_12546");
                appVariables.recomend.hvs.tranzitPitaush.trebObjom = appVariables.hvsRows[i].querySelector("#comp_12547");
                appVariables.recomend.hvs.tranzitPitaush.vypolnenGod = appVariables.hvsRows[i].querySelector("#comp_12548");
                appVariables.recomend.hvs.tranzitPitaush.factObjom = appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Этажи":
                appVariables.recomend.hvs.etaji = new Object();
                appVariables.recomend.hvs.etaji.name = appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                appVariables.recomend.hvs.etaji.recomend = appVariables.hvsRows[i].querySelector("#comp_12546");
                appVariables.recomend.hvs.etaji.trebObjom = appVariables.hvsRows[i].querySelector("#comp_12547");
                appVariables.recomend.hvs.etaji.vypolnenGod = appVariables.hvsRows[i].querySelector("#comp_12548");
                appVariables.recomend.hvs.etaji.factObjom = appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Внутренний пожарный водопровод":
                appVariables.recomend.hvs.vnPojarTrubopr = new Object();
                appVariables.recomend.hvs.vnPojarTrubopr.name = appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                appVariables.recomend.hvs.vnPojarTrubopr.recomend = appVariables.hvsRows[i].querySelector("#comp_12546");
                appVariables.recomend.hvs.vnPojarTrubopr.trebObjom = appVariables.hvsRows[i].querySelector("#comp_12547");
                appVariables.recomend.hvs.vnPojarTrubopr.vypolnenGod = appVariables.hvsRows[i].querySelector("#comp_12548");
                appVariables.recomend.hvs.vnPojarTrubopr.factObjom = appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Вся система":
                appVariables.recomend.hvs.vsaSistema = new Object();
                appVariables.recomend.hvs.vsaSistema.name = appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                appVariables.recomend.hvs.vsaSistema.recomend = appVariables.hvsRows[i].querySelector("#comp_12546");
                appVariables.recomend.hvs.vsaSistema.trebObjom = appVariables.hvsRows[i].querySelector("#comp_12547");
                appVariables.recomend.hvs.vsaSistema.vypolnenGod = appVariables.hvsRows[i].querySelector("#comp_12548");
                appVariables.recomend.hvs.vsaSistema.factObjom = appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
        }
    }

    // Канализация
    appVariables.recomend.kanalizacia = new Object();
    for (let i = 1; i < appVariables.sewerRows.length; i++) {
        switch (appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12550").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.recomend.kanalizacia.tehPodpolie = new Object();
                appVariables.recomend.kanalizacia.tehPodpolie.name = appVariables.sewerRows[i].querySelector("#lookupTextcomp_12550").textContent;
                appVariables.recomend.kanalizacia.tehPodpolie.recomend = appVariables.sewerRows[i].querySelector("#comp_12551");
                appVariables.recomend.kanalizacia.tehPodpolie.trebObjom = appVariables.sewerRows[i].querySelector("#comp_12552");
                appVariables.recomend.kanalizacia.tehPodpolie.vypolnenGod = appVariables.sewerRows[i].querySelector("#comp_12553");
                appVariables.recomend.kanalizacia.tehPodpolie.factObjom = appVariables.sewerRows[i].querySelector("#comp_12554");
                break;
            case "Этажи":
                appVariables.recomend.kanalizacia.etaji = new Object();
                appVariables.recomend.kanalizacia.etaji.name = appVariables.sewerRows[i].querySelector("#lookupTextcomp_12550").textContent;
                appVariables.recomend.kanalizacia.etaji.recomend = appVariables.sewerRows[i].querySelector("#comp_12551");
                appVariables.recomend.kanalizacia.etaji.trebObjom = appVariables.sewerRows[i].querySelector("#comp_12552");
                appVariables.recomend.kanalizacia.etaji.vypolnenGod = appVariables.sewerRows[i].querySelector("#comp_12553");
                appVariables.recomend.kanalizacia.etaji.factObjom = appVariables.sewerRows[i].querySelector("#comp_12554");
                break;
            case "Вся система":
                appVariables.recomend.kanalizacia.vsaSistema = new Object();
                appVariables.recomend.kanalizacia.vsaSistema.name = appVariables.sewerRows[i].querySelector("#lookupTextcomp_12550").textContent;
                appVariables.recomend.kanalizacia.vsaSistema.recomend = appVariables.sewerRows[i].querySelector("#comp_12551");
                appVariables.recomend.kanalizacia.vsaSistema.trebObjom = appVariables.sewerRows[i].querySelector("#comp_12552");
                appVariables.recomend.kanalizacia.vsaSistema.vypolnenGod = appVariables.sewerRows[i].querySelector("#comp_12553");
                appVariables.recomend.kanalizacia.vsaSistema.factObjom = appVariables.sewerRows[i].querySelector("#comp_12554");
                break;
        }
    }

    // Мусоропроводы
    appVariables.recomend.musoroprovody = new Object();
    appVariables.recomend.musoroprovody.recomend = appVariables.recomendationsDone.querySelector("#comp_12556");
    appVariables.recomend.musoroprovody.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12557");
    appVariables.recomend.musoroprovody.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12558");
    appVariables.recomend.musoroprovody.factObjom = appVariables.recomendationsDone.querySelector("#comp_12559");

    // Система промывки и прочистки стволов мусоропроводов
    appVariables.recomend.musoroChistSistema = new Object();
    appVariables.recomend.musoroChistSistema.recomend = appVariables.recomendationsDone.querySelector("#comp_12561");
    appVariables.recomend.musoroChistSistema.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12562");
    appVariables.recomend.musoroChistSistema.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12563");
    appVariables.recomend.musoroChistSistema.factObjom = appVariables.recomendationsDone.querySelector("#comp_12564");

    // Вентиляц.
    appVariables.recomend.ventilacia = new Object();
    appVariables.recomend.ventilacia.recomend = appVariables.recomendationsDone.querySelector("#comp_12566");
    appVariables.recomend.ventilacia.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12567");
    appVariables.recomend.ventilacia.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12568");
    appVariables.recomend.ventilacia.factObjom = appVariables.recomendationsDone.querySelector("#comp_12569");

    // Газоходы
    appVariables.recomend.gazohody = new Object();
    appVariables.recomend.gazohody.recomend = appVariables.recomendationsDone.querySelector("#comp_12576");
    appVariables.recomend.gazohody.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12577");
    appVariables.recomend.gazohody.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12578");
    appVariables.recomend.gazohody.factObjom = appVariables.recomendationsDone.querySelector("#comp_12579");

    // Лифты
    appVariables.recomend.lifty = new Object();
    appVariables.recomend.lifty.recomend = appVariables.recomendationsDone.querySelector("#comp_12581");
    appVariables.recomend.lifty.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12582");
    appVariables.recomend.lifty.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12583");
    appVariables.recomend.lifty.factObjom = appVariables.recomendationsDone.querySelector("#comp_12584");

    // Подъёмное устройство для маломобильной группы населения
    appVariables.recomend.podyomnik = new Object();
    appVariables.recomend.podyomnik.recomend = appVariables.recomendationsDone.querySelector("#comp_12586");
    appVariables.recomend.podyomnik.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12587");
    appVariables.recomend.podyomnik.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12588");
    appVariables.recomend.podyomnik.factObjom = appVariables.recomendationsDone.querySelector("#comp_12589");

    // Устройство для автоматического опускания лифта
    appVariables.recomend.autoSpuskLift = new Object();
    appVariables.recomend.autoSpuskLift.recomend = appVariables.recomendationsDone.querySelector("#comp_12591");
    appVariables.recomend.autoSpuskLift.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12592");
    appVariables.recomend.autoSpuskLift.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12593");
    appVariables.recomend.autoSpuskLift.factObjom = appVariables.recomendationsDone.querySelector("#comp_12594");

    // Система ЭС (ВРУ)
    appVariables.recomend.systemEs = new Object();
    appVariables.recomend.systemEs.recomend = appVariables.recomendationsDone.querySelector("#comp_12596");
    appVariables.recomend.systemEs.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12597");
    appVariables.recomend.systemEs.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12598");
    appVariables.recomend.systemEs.factObjom = appVariables.recomendationsDone.querySelector("#comp_12599");

    // ВКВ (второй кабельный ввод)
    appVariables.recomend.vkv = new Object();
    appVariables.recomend.vkv.recomend = appVariables.recomendationsDone.querySelector("#comp_12436");
    appVariables.recomend.vkv.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12437");
    appVariables.recomend.vkv.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12438");
    appVariables.recomend.vkv.factObjom = appVariables.recomendationsDone.querySelector("#comp_12439");

    // АВР (автоматическое включение резервного питания)
    appVariables.recomend.avr = new Object();
    appVariables.recomend.avr.recomend = appVariables.recomendationsDone.querySelector("#comp_12441");
    appVariables.recomend.avr.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12442");
    appVariables.recomend.avr.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12443");
    appVariables.recomend.avr.factObjom = appVariables.recomendationsDone.querySelector("#comp_12404");

    // ППАиДУ
    appVariables.recomend.ppaidu = new Object();
    appVariables.recomend.ppaidu.recomend = appVariables.recomendationsDone.querySelector("#comp_12406");
    appVariables.recomend.ppaidu.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12407");
    appVariables.recomend.ppaidu.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12408");
    appVariables.recomend.ppaidu.factObjom = appVariables.recomendationsDone.querySelector("#comp_12409");

    // Система оповещения о пожаре
    appVariables.recomend.pozharOpoveshen = new Object();
    appVariables.recomend.pozharOpoveshen.recomend = appVariables.recomendationsDone.querySelector("#comp_12411");
    appVariables.recomend.pozharOpoveshen.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12412");
    appVariables.recomend.pozharOpoveshen.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12413");
    appVariables.recomend.pozharOpoveshen.factObjom = appVariables.recomendationsDone.querySelector("#comp_12414");

    // ГС
    appVariables.recomend.gs = new Object();
    appVariables.recomend.gs.recomend = appVariables.recomendationsDone.querySelector("#comp_12416");
    appVariables.recomend.gs.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12417");
    appVariables.recomend.gs.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12418");
    appVariables.recomend.gs.factObjom = appVariables.recomendationsDone.querySelector("#comp_12419");

    // Связь с ОДС
    appVariables.recomend.ods = new Object();
    appVariables.recomend.ods.recomend = appVariables.recomendationsDone.querySelector("#comp_12421");
    appVariables.recomend.ods.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12422");
    appVariables.recomend.ods.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12423");
    appVariables.recomend.ods.factObjom = appVariables.recomendationsDone.querySelector("#comp_12424");

    // Система видеонаблюдения
    appVariables.recomend.videonab = new Object();
    appVariables.recomend.videonab.recomend = appVariables.recomendationsDone.querySelector("#comp_12426");
    appVariables.recomend.videonab.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12427");
    appVariables.recomend.videonab.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12428");
    appVariables.recomend.videonab.factObjom = appVariables.recomendationsDone.querySelector("#comp_12429");

    // ОЗДС(охранно-защитная дератизационная система)
    appVariables.recomend.ozds = new Object();
    appVariables.recomend.ozds.recomend = appVariables.recomendationsDone.querySelector("#comp_12431");
    appVariables.recomend.ozds.trebObjom = appVariables.recomendationsDone.querySelector("#comp_12432");
    appVariables.recomend.ozds.vypolnenGod = appVariables.recomendationsDone.querySelector("#comp_12423");
    appVariables.recomend.ozds.factObjom = appVariables.recomendationsDone.querySelector("#comp_12424");

    // Общий вывод: Рекомендации по выполнению объемов капитального ремонта
    appVariables.recomend.obshiyVivod = appVariables.recomendationsDone.querySelector("#lookupTextcomp_12435");

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    for (let i = 1; i < appVariables.resultsRoofRows.length; i++) {
        if (!appVariables.resultsRoofRows[i].querySelector("#comp_12642")) {
            continue;
        }

        switch (appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent) {
            case "Кровля":
                appVariables.krovlyaName = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                appVariables.krovlyaDefecty = appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                appVariables.krovlyaPercent = appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                appVariables.krovlyaProshlOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                appVariables.krovlyaOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Свесы":
                appVariables.svesyName = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                appVariables.svesyDefecty = appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                appVariables.svesyPercent = appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                appVariables.svesyProshlOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                appVariables.svesyOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Стропильная система":
                appVariables.stropilnayaSistemaName = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                appVariables.stropilnayaSistemaDefecty = appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                appVariables.stropilnayaSistemaPercent = appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                appVariables.stropilnayaSistemaProshlOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                appVariables.stropilnayaSistemaOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Чердак":
                appVariables.cherdakName = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                appVariables.cherdakDefecty = appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                appVariables.cherdakPercent = appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                appVariables.cherdakProshlOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                appVariables.cherdakOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Покрытие ж/б":
                appVariables.pokritieJBName = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                appVariables.pokritieJBDefecty = appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                appVariables.pokritieJBPercent = appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                appVariables.pokritieJBProshlOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                appVariables.pokritieJBOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Все элементы":
                appVariables.vsyaKrishaName = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                appVariables.vsyaKrishaDefecty = appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                appVariables.vsyaKrishaPercent = appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                appVariables.vsyaKrishaProshlOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                appVariables.vsyaKrishaOcenka = appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
        }
    }
    appVariables.roofConstruction = appVariables.results.querySelector("#lookupTextcomp_12453");
    appVariables.roofMaterial = appVariables.results.querySelector("#lookupTextcomp_12454");
    appVariables.roofSquare = appVariables.results.querySelector("#comp_12455");

    // Водоотвод
    appVariables.vodootvodDefecty = appVariables.results.querySelector("#comp_12647");
    appVariables.vodootvodPercent = appVariables.results.querySelector("#comp_12649");
    appVariables.vodootvodProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12648");
    appVariables.vodootvodOcenka = appVariables.results.querySelector("#lookupTextcomp_12650");
    appVariables.vodootvodType = appVariables.results.querySelector("#lookupTextcomp_12456");
    appVariables.vodootvodMaterial = appVariables.results.querySelector("#lookupTextcomp_12457");

    // Межпанельные стыки
    appVariables.majpanelnyeStykiDefecty = appVariables.results.querySelector("#comp_12652");
    appVariables.majpanelnyeStykiPercent = appVariables.results.querySelector("#comp_12654");
    appVariables.majpanelnyeStykiProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12653");
    appVariables.majpanelnyeStykiOcenka = appVariables.results.querySelector("#lookupTextcomp_12655");
    appVariables.majpanelnyeStykiType = appVariables.results.querySelector("#lookupTextcomp_12458");

    // Фасад
    appVariables.fasadDefecty = appVariables.results.querySelector("#comp_12657");
    appVariables.fasadPercent = appVariables.results.querySelector("#comp_12659");
    appVariables.fasadProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12658");
    appVariables.fasadOcenka = appVariables.results.querySelector("#lookupTextcomp_12660");
    appVariables.fasadSquare = appVariables.results.querySelector("#comp_12459");
    appVariables.fasadOtdelkaSten = appVariables.results.querySelector("#lookupTextcomp_12460");
    appVariables.fasadOblicovkaTsokolya = appVariables.results.querySelector("#lookupTextcomp_12461");
    appVariables.fasadOkonnyeZapolneniya = appVariables.results.querySelector("#lookupTextcomp_12462");

    // Балконы
    for (let i = 1; i < appVariables.resultsBalconyRows.length; i++) {
        if (!appVariables.resultsBalconyRows[i].querySelector("#comp_12736")) {
            continue;
        }

        switch (appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent) {
            case "Балконы":
                appVariables.balkonyName = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                appVariables.balkonyDefecty = appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                appVariables.balkonyPercent = appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                appVariables.balkonyProshlOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                appVariables.balkonyOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Лоджии":
                appVariables.lodjiiName = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                appVariables.lodjiiDefecty = appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                appVariables.lodjiiPercent = appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                appVariables.lodjiiProshlOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                appVariables.lodjiiOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Козырьки":
                appVariables.kozirkiName = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                appVariables.kozirkiDefecty = appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                appVariables.kozirkiPercent = appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                appVariables.kozirkiProshlOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                appVariables.kozirkiOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Эркеры":
                appVariables.erkeryName = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                appVariables.erkeryDefecty = appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                appVariables.erkeryPercent = appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                appVariables.erkeryProshlOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                appVariables.erkeryOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Все элементы":
                appVariables.vseBalkonyName = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                appVariables.vseBalkonyDefecty = appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                appVariables.vseBalkonyPercent = appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                appVariables.vseBalkonyProshlOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                appVariables.vseBalkonyOcenka = appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
        }
    }
    appVariables.balkonyKolich = appVariables.results.querySelector("#comp_12463");
    appVariables.balkonyLojii = appVariables.results.querySelector("#comp_12464");
    appVariables.balkonyKozirkovVhody = appVariables.results.querySelector("#comp_12465");
    appVariables.balkonyKozirkovVerh = appVariables.results.querySelector("#comp_12466");
    appVariables.balkonyKozirkovNeproekt = appVariables.results.querySelector("#comp_12467");
    appVariables.balkonyErkerovKolich = appVariables.results.querySelector("#comp_12468");

    // Стены
    appVariables.stenyDefecty = appVariables.results.querySelector("#comp_12624");
    appVariables.stenyPercent = appVariables.results.querySelector("#comp_12626");
    appVariables.stenyProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12625");
    appVariables.stenyOcenka = appVariables.results.querySelector("#lookupTextcomp_12672");
    appVariables.stenyMaterial = appVariables.results.querySelector("#lookupTextcomp_12444");
    appVariables.stenyTeploFizSvoistva = appVariables.results.querySelector("#lookupTextcomp_12445");

    // Подвал
    appVariables.podvalDefecty = appVariables.results.querySelector("#comp_12628");
    appVariables.podvalPercent = appVariables.results.querySelector("#comp_12630");
    appVariables.podvalProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12629");
    appVariables.podvalOcenka = appVariables.results.querySelector("#lookupTextcomp_12631");
    appVariables.podvalNalichie = appVariables.results.querySelector("#lookupTextcomp_12446");
    appVariables.podvalSquare = appVariables.results.querySelector("#comp_12447");

    // Тех.подполье
    appVariables.techPodpolieDefecty = appVariables.results.querySelector("#comp_12633");
    appVariables.techPodpoliePercent = appVariables.results.querySelector("#comp_12635");
    appVariables.techPodpolieProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12634");
    appVariables.techPodpolieOcenka = appVariables.results.querySelector("#lookupTextcomp_12636");
    appVariables.techPodpolieNalichie = appVariables.results.querySelector("#lookupTextcomp_12448");

    // Тех.этаж
    appVariables.techEtajDefecty = appVariables.results.querySelector("#comp_12638");
    appVariables.techEtajPercent = appVariables.results.querySelector("#comp_12640");
    appVariables.techEtajProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12639");
    appVariables.techEtajOcenka = appVariables.results.querySelector("#lookupTextcomp_12673");
    appVariables.techEtajNalichie = appVariables.results.querySelector("#lookupTextcomp_12449");
    appVariables.techEtajMesto = appVariables.results.querySelector("#comp_12367");

    // Гараж стоянка (подземный)
    appVariables.garageDefecty = appVariables.results.querySelector("#comp_12747");
    appVariables.garagePercent = appVariables.results.querySelector("#comp_12749");
    appVariables.garageProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12748");
    appVariables.garageOcenka = appVariables.results.querySelector("#lookupTextcomp_12750");
    appVariables.garageType = appVariables.results.querySelector("#lookupTextcomp_12450");
    appVariables.garageSquare = appVariables.results.querySelector("#comp_12451");
    appVariables.garageEtagnost = appVariables.results.querySelector("#comp_12452");
    appVariables.garageKolichestvoMashin = appVariables.results.querySelector("#comp_12369");

    // Места общего пользования
    for (let i = 1; i < appVariables.resultsMopRows.length; i++) {
        if (!appVariables.resultsMopRows[i].querySelector("#comp_12752")) {
            continue;
        }

        switch (appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent) {
            case "Вестибюли":
                appVariables.mopVestibuliName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopVestibuliDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopVestibuliPercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopVestibuliProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopVestibuliOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Крыльца":
                appVariables.mopKrilcaName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopKrilcaDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopKrilcaPercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopKrilcaProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopKrilcaOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Пандусы наружные":
                appVariables.mopPandusyNaruzhnieName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopPandusyNaruzhnieDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopPandusyNaruzhniePercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopPandusyNaruzhnieProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopPandusyNaruzhnieOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Пандусы внутри-подъездные":
                appVariables.mopPandusyVnutrennieName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopPandusyVnutrennieDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopPandusyVnutrenniePercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopPandusyVnutrennieProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopPandusyVnutrennieOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Сходы/съезды":
                appVariables.mopShodySiezdyName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopShodySiezdyDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopShodySiezdyPercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopShodySiezdyProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopShodySiezdyOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Окна, двери":
                appVariables.mopOknaDveriName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopOknaDveriDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopOknaDveriPercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopOknaDveriProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopOknaDveriOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Внутренняя отделка помещений":
                appVariables.mopVnOtdelkaPomeshName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopVnOtdelkaPomeshDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopVnOtdelkaPomeshPercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopVnOtdelkaPomeshProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopVnOtdelkaPomeshOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Все элементы":
                appVariables.mopVseElementyName = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                appVariables.mopVseElementyDefecty = appVariables.resultsMopRows[i].querySelector("#comp_12752");
                appVariables.mopVseElementyPercent = appVariables.resultsMopRows[i].querySelector("#comp_12754");
                appVariables.mopVseElementyProshlOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                appVariables.mopVseElementyOcenka = appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
        }
    }
    appVariables.mopPandusyNaruzhKolich = appVariables.results.querySelector("#comp_12354");
    appVariables.mopPandusyVnutrKolich = appVariables.results.querySelector("#comp_12355");
    appVariables.mopShodySiezdyKolich = appVariables.results.querySelector("#comp_12356");

    // Лестницы
    appVariables.lestnicyDefecty = appVariables.results.querySelector("#comp_12757");
    appVariables.lestnicyPercent = appVariables.results.querySelector("#comp_12759");
    appVariables.lestnicyProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12758");
    appVariables.lestnicyOcenka = appVariables.results.querySelector("#lookupTextcomp_12674");
    appVariables.lestnicyConstruction = appVariables.results.querySelector("#lookupTextcomp_12370");

    // Перекрытия
    appVariables.perekrityaDefecty = appVariables.results.querySelector("#comp_12761");
    appVariables.perekrityaPercent = appVariables.results.querySelector("#comp_12763");
    appVariables.perekrityaProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12764");
    appVariables.perekrityaOcenka = appVariables.results.querySelector("#lookupTextcomp_12764");
    appVariables.perekrityaMaterial = appVariables.results.querySelector("#lookupTextcomp_12371");

    // Система отопления
    for (let i = 1; i < appVariables.resultsHeatSystemRows.length; i++) {
        if (!appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766")) {
            continue;
        }

        switch (appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.otopleniyeTehPodpolieName = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                appVariables.otopleniyeTehPodpolieDefecty = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                appVariables.otopleniyeTehPodpoliePercent = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                appVariables.otopleniyeTehPodpolieProshlOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                appVariables.otopleniyeTehPodpolieOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Транзит питающий":
                appVariables.otopleniyeTranzitPitaushName = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                appVariables.otopleniyeTranzitPitaushDefecty = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                appVariables.otopleniyeTranzitPitaushPercent = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                appVariables.otopleniyeTranzitPitaushProshlOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                appVariables.otopleniyeTranzitPitaushOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Чердак":
                appVariables.otopleniyeCherdakName = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                appVariables.otopleniyeCherdakDefecty = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                appVariables.otopleniyeCherdakPercent = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                appVariables.otopleniyeCherdakProshlOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                appVariables.otopleniyeCherdakOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Этажи":
                appVariables.otopleniyeEtajiName = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                appVariables.otopleniyeEtajiDefecty = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                appVariables.otopleniyeEtajiPercent = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                appVariables.otopleniyeEtajiProshlOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                appVariables.otopleniyeEtajiOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Вся система":
                appVariables.vseOtopleniyeName = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                appVariables.vseOtopleniyeDefecty = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                appVariables.vseOtopleniyePercent = appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                appVariables.vseOtopleniyeProshlOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                appVariables.vseOtopleniyeOcenka = appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
        }
    }
    appVariables.otopleniyeVid = appVariables.results.querySelector("#lookupTextcomp_12605");
    appVariables.otopleniyeMaterial = appVariables.results.querySelector("#lookupTextcomp_13393");
    appVariables.otopleniyeTypePribor = appVariables.results.querySelector("#lookupTextcomp_12372");
    appVariables.otopleniyeTermoRegulKvartir = appVariables.results.querySelector("#lookupTextcomp_12373");
    appVariables.otopleniyeAuu = appVariables.results.querySelector("#comp_12374");
    appVariables.otopleniyeOduu = appVariables.results.querySelector("#lookupTextcomp_12375");
    appVariables.otopleniyeElevUzel = appVariables.results.querySelector("#comp_12376");
    appVariables.otopleniyeTeplovoyUzel = appVariables.results.querySelector("#comp_12377");
    appVariables.otopleniyeTypeStoyakov = appVariables.results.querySelector("#lookupTextcomp_12299");

    // ГВС
    for (let i = 1; i < appVariables.resultsGvsRows.length; i++) {
        if (!appVariables.resultsGvsRows[i].querySelector("#comp_12771")) {
            continue;
        }

        switch (appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.gvsTehPodpolieName = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                appVariables.gvsTehPodpolieDefecty = appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                appVariables.gvsTehPodpoliePercent = appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                appVariables.gvsTehPodpolieProshlOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                appVariables.gvsTehPodpolieOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Транзит питающий":
                appVariables.gvsTranzitPitaushName = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                appVariables.gvsTranzitPitaushDefecty = appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                appVariables.gvsTranzitPitaushPercent = appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                appVariables.gvsTranzitPitaushProshlOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                appVariables.gvsTranzitPitaushOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Чердак":
                appVariables.gvsCherdakName = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                appVariables.gvsCherdakDefecty = appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                appVariables.gvsCherdakPercent = appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                appVariables.gvsCherdakProshlOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                appVariables.gvsCherdakOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Этажи":
                appVariables.gvsEtajiName = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                appVariables.gvsEtajiDefecty = appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                appVariables.gvsEtajiPercent = appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                appVariables.gvsEtajiProshlOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                appVariables.gvsEtajiOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Вся система":
                appVariables.vseGvsName = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                appVariables.vseGvsDefecty = appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                appVariables.vseGvsPercent = appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                appVariables.vseGvsProshlOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                appVariables.vseGvsOcenka = appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
        }
    }
    appVariables.gvsType = appVariables.results.querySelector("#lookupTextcomp_12378");
    appVariables.gvsMaterial = appVariables.results.querySelector("#lookupTextcomp_12379");
    appVariables.gvsOduu = appVariables.results.querySelector("#lookupTextcomp_12380");
    appVariables.gvsTypeStoyakov = appVariables.results.querySelector("#lookupTextcomp_13394");

    // ХВС
    for (let i = 1; i < appVariables.resultsHvsRows.length; i++) {
        if (!appVariables.resultsHvsRows[i].querySelector("#comp_12775")) {
            continue;
        }

        switch (appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.hvsTehPodpolieName = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                appVariables.hvsTehPodpolieDefecty = appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                appVariables.hvsTehPodpoliePercent = appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                appVariables.hvsTehPodpolieProshlOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                appVariables.hvsTehPodpolieOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Транзит питающий":
                appVariables.hvsTranzitPitaushName = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                appVariables.hvsTranzitPitaushDefecty = appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                appVariables.hvsTranzitPitaushPercent = appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                appVariables.hvsTranzitPitaushProshlOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                appVariables.hvsTranzitPitaushOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Этажи":
                appVariables.hvsEtajiName = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                appVariables.hvsEtajiDefecty = appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                appVariables.hvsEtajiPercent = appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                appVariables.hvsEtajiProshlOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                appVariables.hvsEtajiOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Внутренний пожарный водопровод":
                appVariables.hvsVnPozharProvodName = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                appVariables.hvsVnPozharProvodDefecty = appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                appVariables.hvsVnPozharProvodPercent = appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                appVariables.hvsVnPozharProvodProshlOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                appVariables.hvsVnPozharProvodOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Вся система":
                appVariables.vseHvsName = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                appVariables.vseHvsDefecty = appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                appVariables.vseHvsPercent = appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                appVariables.vseHvsProshlOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                appVariables.vseHvsOcenka = appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
        }
    }
    appVariables.hvsMaterial = appVariables.results.querySelector("#lookupTextcomp_12382");
    appVariables.hvsOduu = appVariables.results.querySelector("#lookupTextcomp_12381");
    appVariables.hvsTypeStoyakov = appVariables.results.querySelector("#lookupTextcomp_13395");

    // Канализация
    for (let i = 1; i < appVariables.resultsSewerRows.length; i++) {
        if (!appVariables.resultsSewerRows[i].querySelector("#comp_12780")) {
            continue;
        }

        switch (appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent) {
            case "Тех.подполье/тех.этаж":
                appVariables.kanalizaciaTehPodpolieName = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent;
                appVariables.kanalizaciaTehPodpolieDefecty = appVariables.resultsSewerRows[i].querySelector("#comp_12780");
                appVariables.kanalizaciaTehPodpoliePercent = appVariables.resultsSewerRows[i].querySelector("#comp_12782");
                appVariables.kanalizaciaTehPodpolieProshlOcenka = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12781");
                appVariables.kanalizaciaTehPodpolieOcenka = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12783");

                break;
            case "Этажи":
                appVariables.kanalizaciaEtajiName = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent;
                appVariables.kanalizaciaEtajiDefecty = appVariables.resultsSewerRows[i].querySelector("#comp_12780");
                appVariables.kanalizaciaEtajiPercent = appVariables.resultsSewerRows[i].querySelector("#comp_12782");
                appVariables.kanalizaciaEtajiProshlOcenka = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12781");
                appVariables.kanalizaciaEtajiOcenka = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12783");

                break;
            case "Вся система":
                appVariables.vseKanalizaciaName = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent;
                appVariables.vseKanalizaciaDefecty = appVariables.resultsSewerRows[i].querySelector("#comp_12780");
                appVariables.vseKanalizaciaPercent = appVariables.resultsSewerRows[i].querySelector("#comp_12782");
                appVariables.vseKanalizaciaProshlOcenka = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12781");
                appVariables.vseKanalizaciaOcenka = appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12783");

                break;
        }
    }
    appVariables.kanalizaciaMaterial = appVariables.results.querySelector("#lookupTextcomp_12383");
    appVariables.kanalizaciaTypeStoyakov = appVariables.results.querySelector("#lookupTextcomp_13396");

    // Мусоропроводы
    appVariables.musoroprovodyDefecty = appVariables.results.querySelector("#comp_12785");
    appVariables.musoroprovodyPercent = appVariables.results.querySelector("#comp_12787");
    appVariables.musoroprovodyProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_12786");
    appVariables.musoroprovodyOcenka = appVariables.results.querySelector("#lookupTextcomp_12788");
    appVariables.musoroprovodyMesto = appVariables.results.querySelector("#lookupTextcomp_12384");
    appVariables.musoroprovodyKamery = appVariables.results.querySelector("#lookupTextcomp_12385");

    // Связь с ОДС
    appVariables.odsDefecty = appVariables.results.querySelector("#comp_12790");
    appVariables.odsPosledneeObsled = appVariables.results.querySelector("#comp_12791");
    appVariables.odsOrganizacia = appVariables.results.querySelector("#comp_12792");
    appVariables.odsProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13401");
    appVariables.odsOcenka = appVariables.results.querySelector("#lookupTextcomp_12793");
    appVariables.odsType = appVariables.results.querySelector("#lookupTextcomp_12386");
    appVariables.odsSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12607");

    // Вентиляция
    appVariables.ventilaciaDefecty = appVariables.results.querySelector("#comp_12795");
    appVariables.ventilaciaPosledneeObsled = appVariables.results.querySelector("#comp_12796");
    appVariables.ventilaciaOrganizacia = appVariables.results.querySelector("#comp_12797");
    appVariables.ventilaciaProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13402");
    appVariables.ventilaciaOcenka = appVariables.results.querySelector("#lookupTextcomp_12798");
    appVariables.ventilaciaSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12608");

    // Система промывки и прочистки стволов мусоропроводов
    appVariables.musoroChistSistemaDefecty = appVariables.results.querySelector("#comp_12800");
    appVariables.musoroChistSistemaPosledObsled = appVariables.results.querySelector("#comp_12801");
    appVariables.musoroChistSistemaOrganizacia = appVariables.results.querySelector("#comp_12802");
    appVariables.musoroChistSistemaProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13403");
    appVariables.musoroChistSistemaOcenka = appVariables.results.querySelector("#lookupTextcomp_12803");
    appVariables.musoroChistSistemaNalichie = appVariables.results.querySelector("#lookupTextcomp_12387");
    appVariables.musoroChistSistemaSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12609");

    // ОЗДС (охранно-защитная дератизационная система)
    appVariables.ozdsDefecty = appVariables.results.querySelector("#comp_12677");
    appVariables.ozdsPosledObsled = appVariables.results.querySelector("#comp_12678");
    appVariables.ozdsOrganizacia = appVariables.results.querySelector("#comp_12679");
    appVariables.ozdsProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13404");
    appVariables.ozdsOcenka = appVariables.results.querySelector("#lookupTextcomp_12680");
    appVariables.ozdsNalichie = appVariables.results.querySelector("#lookupTextcomp_12388");
    appVariables.ozdsSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12610");

    // Газоходы
    appVariables.gazohodyDefecty = appVariables.results.querySelector("#comp_12687");
    appVariables.gazohodyPosledObsled = appVariables.results.querySelector("#comp_12688");
    appVariables.gazohodyOrganizacia = appVariables.results.querySelector("#comp_12689");
    appVariables.gazohodyProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13405");
    appVariables.gazohodyOcenka = appVariables.results.querySelector("#lookupTextcomp_12690");
    appVariables.gazohodyNalichie = appVariables.results.querySelector("#lookupTextcomp_12390");
    appVariables.gazohodySostoyanie = appVariables.results.querySelector("#lookupTextcomp_12612");

    // Лифты
    appVariables.liftyDefecty = appVariables.results.querySelector("#comp_12692");
    appVariables.liftyPosledObsled = appVariables.results.querySelector("#comp_12693");
    appVariables.liftyOrganizacia = appVariables.results.querySelector("#comp_12694");
    appVariables.liftyProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13406");
    appVariables.liftyOcenka = appVariables.results.querySelector("#lookupTextcomp_12695");
    appVariables.liftyPass = appVariables.results.querySelector("#comp_12391");
    appVariables.liftyGruzPass = appVariables.results.querySelector("#comp_12392");
    appVariables.liftyNavesnye = appVariables.results.querySelector("#comp_12393");
    appVariables.liftySostoyanie = appVariables.results.querySelector("#lookupTextcomp_12613");

    // Подъёмное устройство для маломобильной группы населения
    appVariables.podyomnikDefecty = appVariables.results.querySelector("#comp_12697");
    appVariables.podyomnikPosledObsled = appVariables.results.querySelector("#comp_12698");
    appVariables.podyomnikOrganizacia = appVariables.results.querySelector("#comp_12699");
    appVariables.podyomnikProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13407");
    appVariables.podyomnikOcenka = appVariables.results.querySelector("#lookupTextcomp_12700");
    appVariables.podyomnikKolich = appVariables.results.querySelector("#comp_12394");
    appVariables.podyomnikSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12614");

    // Устройство для автоматического опускания лифта
    appVariables.autoSpuskLiftDefecty = appVariables.results.querySelector("#comp_12702");
    appVariables.autoSpuskLiftPosledObsled = appVariables.results.querySelector("#comp_12703");
    appVariables.autoSpuskLiftOrganizacia = appVariables.results.querySelector("#comp_12704");
    appVariables.autoSpuskLiftProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13408");
    appVariables.autoSpuskLiftOcenka = appVariables.results.querySelector("#lookupTextcomp_12705");
    appVariables.autoSpuskLiftNalichie = appVariables.results.querySelector("#lookupTextcomp_12395");
    appVariables.autoSpuskLiftSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12615");

    // Система ЭС
    appVariables.systemEsDefecty = appVariables.results.querySelector("#comp_12707");
    appVariables.systemEsPosledObsled = appVariables.results.querySelector("#comp_12708");
    appVariables.systemEsOrganizacia = appVariables.results.querySelector("#comp_12709");
    appVariables.systemEsProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13409");
    appVariables.systemEsOcenka = appVariables.results.querySelector("#lookupTextcomp_12710");
    appVariables.systemEsKolich = appVariables.results.querySelector("#comp_12397");
    appVariables.systemEsRazmeshenie = appVariables.results.querySelector("#lookupTextcomp_12396");
    appVariables.systemEsSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12616");

    // ВКВ (второй кабельный ввод)
    appVariables.vkvDefecty = appVariables.results.querySelector("#comp_12712");
    appVariables.vkvPosledObsled = appVariables.results.querySelector("#comp_12713");
    appVariables.vkvOrganizacia = appVariables.results.querySelector("#comp_12714");
    appVariables.vkvProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13410");
    appVariables.vkvOcenka = appVariables.results.querySelector("#lookupTextcomp_12715");
    appVariables.vkvNalichie = appVariables.results.querySelector("#lookupTextcomp_12398");
    appVariables.vkvSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12622");

    // АВР (автоматическое включение резервного питания)
    appVariables.avrDefecty = appVariables.results.querySelector("#comp_12717");
    appVariables.avrPosledObsled = appVariables.results.querySelector("#comp_12718");
    appVariables.avrOrganizacia = appVariables.results.querySelector("#comp_12724");
    appVariables.avrProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13411");
    appVariables.avrOcenka = appVariables.results.querySelector("#lookupTextcomp_12720");
    appVariables.avrNalichie = appVariables.results.querySelector("#lookupTextcomp_12399");
    appVariables.avrSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12617");

    // ППАиДУ
    appVariables.ppaiduDefecty = appVariables.results.querySelector("#comp_12722");
    appVariables.ppaiduPosledObsled = appVariables.results.querySelector("#comp_12723");
    appVariables.ppaiduOrganizacia = appVariables.results.querySelector("#comp_12724");
    appVariables.ppaiduProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13412");
    appVariables.ppaiduOcenka = appVariables.results.querySelector("#lookupTextcomp_12725");
    appVariables.ppaiduType = appVariables.results.querySelector("#lookupTextcomp_12400");
    appVariables.ppaiduSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12618");

    // Система оповещения о пожаре
    appVariables.pozharOpoveshenDefecty = appVariables.results.querySelector("#comp_12727");
    appVariables.pozharOpoveshenPosledObsled = appVariables.results.querySelector("#comp_12728");
    appVariables.pozharOpoveshenOrganizacia = appVariables.results.querySelector("#comp_12729");
    appVariables.pozharOpoveshenProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13413");
    appVariables.pozharOpoveshenOcenka = appVariables.results.querySelector("#lookupTextcomp_12730");
    appVariables.pozharOpoveshenNalichie = appVariables.results.querySelector("#lookupTextcomp_12401");
    appVariables.pozharOpoveshenSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12619");

    // Система ГС
    appVariables.sistemaGsDefecty = appVariables.results.querySelector("#comp_12732");
    appVariables.sistemaGsPosledObsled = appVariables.results.querySelector("#comp_12733");
    appVariables.sistemaGsOrganizacia = appVariables.results.querySelector("#comp_12733");
    appVariables.sistemaGsProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13414");
    appVariables.sistemaGsOcenka = appVariables.results.querySelector("#lookupTextcomp_12740");
    appVariables.sistemaGsVvody = appVariables.results.querySelector("#lookupTextcomp_12402");
    appVariables.sistemaGsRazvodka = appVariables.results.querySelector("#lookupTextcomp_12403");
    appVariables.sistemaGsSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12620");

    // Система видеонаблюдения
    appVariables.sistemaVideonabDefecty = appVariables.results.querySelector("#comp_12742");
    appVariables.sistemaVideonabPosledObsled = appVariables.results.querySelector("#comp_12743");
    appVariables.sistemaVideonabOrganizacia = appVariables.results.querySelector("#comp_12744");
    appVariables.sistemaVideonabProshlOcenka = appVariables.results.querySelector("#lookupTextcomp_13415");
    appVariables.sistemaVideonabOcenka = appVariables.results.querySelector("#lookupTextcomp_12745");
    appVariables.sistemaVideonabMesto = appVariables.results.querySelector("#lookupTextcomp_12349");
    appVariables.sistemaVideonabSostoyanie = appVariables.results.querySelector("#lookupTextcomp_12621");

    // Нижняя часть отчета
    appVariables.dopolnitDannye = appVariables.form.querySelector("#comp_12324");
    appVariables.obsledVypolneno = appVariables.form.querySelector("#lookupTextcomp_12347");
    appVariables.recomendatciiPoUtepleniuSten = appVariables.form.querySelector("#lookupTextcomp_12350");
    appVariables.tehSostoyanieZdania = appVariables.form.querySelector("#lookupTextcomp_12325");
    appVariables.recomendatciiPoDopRabotam = appVariables.form.querySelector("#comp_12606");

    // Подписывающие лица
    for (let i = 0; i < appVariables.signatoriesRows.length; i++) {
        if (!appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
            continue;
        }

        appVariables[i] = new Object();

        appVariables[i]["licaOt"] = appVariables.signatoriesRows[i].querySelector("#comp_12340");
        appVariables[i]["LicaDoljnost"] = appVariables.signatoriesRows[i].querySelector("#comp_12341");
        appVariables[i]["licaFio"] = appVariables.signatoriesRows[i].querySelector("#comp_12342");

        if (representativesInputs.empty) {
            representativesInputs[i] = new Object();
            representativesInputs[i]["LicaDoljnost"] = new Array();
            representativesInputs[i]["licaOt"] = new Array();
            representativesInputs[i]["licaFio"] = new Array();

            representativesInputs[i]["LicaDoljnost"].push(appVariables[i]["LicaDoljnost"]);
            representativesInputs[i]["licaOt"].push(appVariables[i]["licaOt"]);
            representativesInputs[i]["licaFio"].push(appVariables[i]["licaFio"]);
        }
    }

    representativesInputs.empty = false;

    if (resultsDefectsInputs.empty) {
        resultsDefectsInputs.inputs.push(appVariables.krovlyaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.svesyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.stropilnayaSistemaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.cherdakDefecty);
        resultsDefectsInputs.inputs.push(appVariables.pokritieJBDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vsyaKrishaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vodootvodDefecty);
        resultsDefectsInputs.inputs.push(appVariables.majpanelnyeStykiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.fasadDefecty);
        resultsDefectsInputs.inputs.push(appVariables.balkonyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.lodjiiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.kozirkiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.erkeryDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vseBalkonyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.stenyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.podvalDefecty);
        resultsDefectsInputs.inputs.push(appVariables.techPodpolieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.techEtajDefecty);
        resultsDefectsInputs.inputs.push(appVariables.garageDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopVestibuliDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopKrilcaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopPandusyNaruzhnieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopPandusyVnutrennieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopShodySiezdyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopOknaDveriDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopVnOtdelkaPomeshDefecty);
        resultsDefectsInputs.inputs.push(appVariables.mopVseElementyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.lestnicyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.perekrityaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.otopleniyeTehPodpolieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.otopleniyeTranzitPitaushDefecty);
        resultsDefectsInputs.inputs.push(appVariables.otopleniyeCherdakDefecty);
        resultsDefectsInputs.inputs.push(appVariables.otopleniyeEtajiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vseOtopleniyeDefecty);
        resultsDefectsInputs.inputs.push(appVariables.gvsTehPodpolieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.gvsTranzitPitaushDefecty);
        resultsDefectsInputs.inputs.push(appVariables.gvsCherdakDefecty);
        resultsDefectsInputs.inputs.push(appVariables.gvsEtajiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vseGvsDefecty);
        resultsDefectsInputs.inputs.push(appVariables.hvsTehPodpolieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.hvsTranzitPitaushDefecty);
        resultsDefectsInputs.inputs.push(appVariables.hvsEtajiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.hvsVnPozharProvodDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vseHvsDefecty);
        resultsDefectsInputs.inputs.push(appVariables.kanalizaciaTehPodpolieDefecty);
        resultsDefectsInputs.inputs.push(appVariables.kanalizaciaEtajiDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vseKanalizaciaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.musoroprovodyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.odsDefecty);
        resultsDefectsInputs.inputs.push(appVariables.ventilaciaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.musoroChistSistemaDefecty);
        resultsDefectsInputs.inputs.push(appVariables.ozdsDefecty);
        resultsDefectsInputs.inputs.push(appVariables.gazohodyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.liftyDefecty);
        resultsDefectsInputs.inputs.push(appVariables.podyomnikDefecty);
        resultsDefectsInputs.inputs.push(appVariables.autoSpuskLiftDefecty);
        resultsDefectsInputs.inputs.push(appVariables.systemEsDefecty);
        resultsDefectsInputs.inputs.push(appVariables.vkvDefecty);
        resultsDefectsInputs.inputs.push(appVariables.avrDefecty);
        resultsDefectsInputs.inputs.push(appVariables.ppaiduDefecty);
        resultsDefectsInputs.inputs.push(appVariables.pozharOpoveshenDefecty);
        resultsDefectsInputs.inputs.push(appVariables.sistemaGsDefecty);
        resultsDefectsInputs.inputs.push(appVariables.sistemaVideonabDefecty);

        resultsDefectsInputs.empty = false;
    }
}