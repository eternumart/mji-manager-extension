export const searchAllInputs = () => {
    if (!window.appData.functions.searchAllInputs || window.appVariables.currentPage === "parser") {
        return;
    }
    window.appVariables.area = window.appVariables.wholeAddress.split(",")[0];
    window.appVariables.district = window.appVariables.wholeAddress.split(",")[1];
    window.appVariables.address = window.appVariables.htmlBody.querySelector("#comboboxTextcomp_12339").value;
    window.appVariables.repairProjectsTable = window.appVariables.form.querySelector("#group_22130");
    window.appVariables.repairProjectsTableRows = window.appVariables.repairProjectsTable.querySelectorAll("tr");
    window.appVariables.conclusionsPrevSurvey = window.appVariables.form.querySelector("#gridSql_22131").querySelector(".data");
    window.appVariables.conclusionsPrevSurveyRows = window.appVariables.conclusionsPrevSurvey.querySelectorAll("tr");

    window.appVariables.recomendationsDone = window.appVariables.form.querySelector("#group_22127");
    window.appVariables.recomendationsRoofBlock = window.appVariables.recomendationsDone.querySelector("#group_22193");
    window.appVariables.roofTable = window.appVariables.recomendationsRoofBlock.querySelector("tbody");
    window.appVariables.roofRows = window.appVariables.roofTable.querySelectorAll("tr");

    window.appVariables.balconyBlock = window.appVariables.recomendationsDone.querySelector("#group_22196");
    window.appVariables.balconyTable = window.appVariables.balconyBlock.querySelector("tbody");
    window.appVariables.balconyRows = window.appVariables.balconyTable.querySelectorAll("tr");

    window.appVariables.mopBlock = window.appVariables.recomendationsDone.querySelector("#group_22201");
    window.appVariables.mopTable = window.appVariables.mopBlock.querySelector("tbody");
    window.appVariables.mopRows = window.appVariables.mopTable.querySelectorAll("tr");

    window.appVariables.heatSystemBlock = window.appVariables.recomendationsDone.querySelector("#group_22204");
    window.appVariables.heatSystemTable = window.appVariables.heatSystemBlock.querySelector("tbody");
    window.appVariables.heatSystemRows = window.appVariables.heatSystemTable.querySelectorAll("tr");

    window.appVariables.gvsBlock = window.appVariables.recomendationsDone.querySelector("#group_22205");
    window.appVariables.gvsTable = window.appVariables.gvsBlock.querySelector("tbody");
    window.appVariables.gvsRows = window.appVariables.gvsTable.querySelectorAll("tr");

    window.appVariables.hvsBlock = window.appVariables.recomendationsDone.querySelector("#group_22206");
    window.appVariables.hvsTable = window.appVariables.hvsBlock.querySelector("tbody");
    window.appVariables.hvsRows = window.appVariables.hvsTable.querySelectorAll("tr");

    window.appVariables.sewerBlock = window.appVariables.recomendationsDone.querySelector("#group_22207");
    window.appVariables.sewerTable = window.appVariables.sewerBlock.querySelector("tbody");
    window.appVariables.sewerRows = window.appVariables.sewerTable.querySelector("tr");

    window.appVariables.results = window.appVariables.form.querySelector("#group_22125");
    window.appVariables.resultsRoofBlock = window.appVariables.results.querySelector("#group_22243");
    window.appVariables.resultsRoofTable = window.appVariables.resultsRoofBlock.querySelector("tbody");
    window.appVariables.resultsRoofRows = window.appVariables.resultsRoofTable.querySelectorAll("tr");

    window.appVariables.resultsBalconyBlock = window.appVariables.results.querySelector("#group_22264");
    window.appVariables.resultsBalconyTable = window.appVariables.resultsBalconyBlock.querySelector("tbody");
    window.appVariables.resultsBalconyRows = window.appVariables.resultsBalconyTable.querySelectorAll("tr");

    window.appVariables.resultsMopBlock = window.appVariables.results.querySelector("#group_22268");
    window.appVariables.resultsMopTable = window.appVariables.resultsMopBlock.querySelector("tbody");
    window.appVariables.resultsMopRows = window.appVariables.resultsMopTable.querySelectorAll("tr");

    window.appVariables.resultHeatSystemBlock = window.appVariables.results.querySelector("#group_22271");
    window.appVariables.resultsHeatSystemTable = window.appVariables.resultHeatSystemBlock.querySelector("tbody");
    window.appVariables.resultsHeatSystemRows = window.appVariables.resultsHeatSystemTable.querySelectorAll("tr");

    window.appVariables.resultsGvsBlock = window.appVariables.results.querySelector("#group_22272");
    window.appVariables.resultsGvsTable = window.appVariables.resultsGvsBlock.querySelector("tbody");
    window.appVariables.resultsGvsRows = window.appVariables.resultsGvsTable.querySelectorAll("tr");

    window.appVariables.resultsHvsBlock = window.appVariables.results.querySelector("#group_22273");
    window.appVariables.resultsHvsTable = window.appVariables.resultsHvsBlock.querySelector("tbody");
    window.appVariables.resultsHvsRows = window.appVariables.resultsHvsTable.querySelectorAll("tr");

    window.appVariables.resultsSewerBlock = window.appVariables.results.querySelector("#group_22274");
    window.appVariables.resultsSewerTable = window.appVariables.resultsSewerBlock.querySelector("tbody");
    window.appVariables.resultsSewerRows = window.appVariables.resultsSewerTable.querySelectorAll("tr");

    window.appVariables.signatoriesBlock = window.appVariables.html.querySelector("#group_22133");
    window.appVariables.signatoriesTable = window.appVariables.signatoriesBlock.querySelector("tbody");
    window.appVariables.signatoriesRows = window.appVariables.signatoriesTable.querySelectorAll("tr");

    window.appVariables.options = new Object();
    window.appVariables["options"]["Крыша"] = new Object();
    window.appVariables["options"]["Крыша"]["Конструкция крыши"] = window.appVariables.results.querySelector("#lookupTextcomp_12453");
    window.appVariables["options"]["Крыша"]["Материал кровли"] = window.appVariables.results.querySelector("#lookupTextcomp_12454");

    window.appVariables["options"]["Водоотвод"] = new Object();
    window.appVariables["options"]["Водоотвод"]["Тип водоотвода"] = window.appVariables.results.querySelector("#lookupTextcomp_12456");
    window.appVariables["options"]["Водоотвод"]["Материал водоотвода"] = window.appVariables.results.querySelector("#lookupTextcomp_12457");

    window.appVariables["options"]["Межпанельные стыки"] = new Object();
    window.appVariables["options"]["Межпанельные стыки"]["Тип стыков"] = window.appVariables.results.querySelector("#lookupTextcomp_12458");
    window.appVariables["options"]["Межпанельные стыки"]["Тип стыков"] = window.appVariables.results.querySelector("#lookupTextcomp_12458");

    window.appVariables["options"]["Фасад"] = new Object();
    window.appVariables["options"]["Фасад"]["Отделка стен"] = window.appVariables.results.querySelector("#lookupTextcomp_12460");
    window.appVariables["options"]["Фасад"]["Отделка цоколя"] = window.appVariables.results.querySelector("#lookupTextcomp_12461");
    window.appVariables["options"]["Фасад"]["Оконные заполнения"] = window.appVariables.results.querySelector("#lookupTextcomp_12462");

    window.appVariables["options"]["Стены"] = new Object();
    window.appVariables["options"]["Стены"]["Материал стен"] = window.appVariables.results.querySelector("#lookupTextcomp_12444");
    window.appVariables["options"]["Стены"]["Теплофизические свойства"] = window.appVariables.results.querySelector("#lookupTextcomp_12445");

    window.appVariables["options"]["Лестницы"] = new Object();
    window.appVariables["options"]["Лестницы"]["Конструкция"] = window.appVariables.results.querySelector("#lookupTextcomp_12370");

    window.appVariables["options"]["Перекрытия"] = new Object();
    window.appVariables["options"]["Перекрытия"]["Материал перекрытия"] = window.appVariables.results.querySelector("#lookupTextcomp_12371");

    window.appVariables["options"]["Система отопления"] = new Object();
    window.appVariables["options"]["Система отопления"]["Вид отопления"] = window.appVariables.results.querySelector("#lookupTextcomp_12605");
    window.appVariables["options"]["Система отопления"]["Материал трубопроводов"] = window.appVariables.results.querySelector("#lookupTextcomp_13393");
    window.appVariables["options"]["Система отопления"]["Тип приборов"] = window.appVariables.results.querySelector("#lookupTextcomp_12372");
    window.appVariables["options"]["Система отопления"]["Термо-регуляторы в квартирах"] = window.appVariables.results.querySelector("#lookupTextcomp_12373");
    window.appVariables["options"]["Система отопления"]["Наличие ОДУУ"] = window.appVariables.results.querySelector("#lookupTextcomp_12375");
    window.appVariables["options"]["Система отопления"]["Тип стояков"] = window.appVariables.results.querySelector("#lookupTextcomp_12299");

    window.appVariables["options"]["ГВС"] = new Object();
    window.appVariables["options"]["ГВС"]["Тип системы"] = window.appVariables.results.querySelector("#lookupTextcomp_12378");
    window.appVariables["options"]["ГВС"]["Материал трубопроводов"] = window.appVariables.results.querySelector("#lookupTextcomp_12379");
    window.appVariables["options"]["ГВС"]["Наличие ОДУУ"] = window.appVariables.results.querySelector("#lookupTextcomp_12380");
    window.appVariables["options"]["ГВС"]["Тип стояков"] = window.appVariables.results.querySelector("#lookupTextcomp_13394");

    window.appVariables["options"]["ХВС"] = new Object();
    window.appVariables["options"]["ХВС"]["Материал трубопроводов"] = window.appVariables.results.querySelector("#lookupTextcomp_12382");
    window.appVariables["options"]["ХВС"]["Наличие ОДУУ"] = window.appVariables.results.querySelector("#lookupTextcomp_12381");
    window.appVariables["options"]["ХВС"]["Тип стояков"] = window.appVariables.results.querySelector("#lookupTextcomp_13395");

    window.appVariables["options"]["Канализация"] = new Object();
    window.appVariables["options"]["Канализация"]["Материал трубопроводов"] = window.appVariables.results.querySelector("#lookupTextcomp_12383");
    window.appVariables["options"]["Канализация"]["Тип стояков"] = window.appVariables.results.querySelector("#lookupTextcomp_13396");

    // ПАСПОРТНЫЕ ДАННЫЕ
    window.appVariables.passportDannye = new Object();

    window.appVariables.passportDannye.etajei = window.appVariables.form.querySelector("#comp_12472");
    window.appVariables.passportDannye.podjezdov = window.appVariables.form.querySelector("#comp_12473");
    window.appVariables.passportDannye.stroyObjem = window.appVariables.form.querySelector("#comp_12474");
    window.appVariables.passportDannye.kvartir = window.appVariables.form.querySelector("#comp_12475");
    window.appVariables.passportDannye.poleznayaPloschad = window.appVariables.form.querySelector("#comp_12476");
    window.appVariables.passportDannye.jilayaPloschad = window.appVariables.form.querySelector("#comp_12477");
    window.appVariables.passportDannye.neJilayaPloschad = window.appVariables.form.querySelector("#comp_12478");
    window.appVariables.passportDannye.seriyaProekta = window.appVariables.form.querySelector("#lookupTextcomp_12479");
    window.appVariables.passportDannye.godPostrioki = window.appVariables.form.querySelector("#comp_12480");
    window.appVariables.passportDannye.godRekonstrukcii = window.appVariables.form.querySelector("#comp_12481");
    window.appVariables.passportDannye.klassEnergoeffectivnosti = window.appVariables.form.querySelector("#lookupTextcomp_12482");
    window.appVariables.passportDannye.fizIznos = window.appVariables.form.querySelector("#comp_12661");
    window.appVariables.passportDannye.dannyeBtiData = window.appVariables.form.querySelector("#comp_12662");
    window.appVariables.passportDannye.nalichVstroenSooruj = window.appVariables.form.querySelector("#lookupTextcomp_12663");
    window.appVariables.passportDannye.kolichVstroenSooruj = window.appVariables.form.querySelector("#comp_12664");
    window.appVariables.passportDannye.kolichNadstroenSooruj = window.appVariables.form.querySelector("#comp_12671");
    window.appVariables.passportDannye.tp = window.appVariables.form.querySelector("#comp_12665");
    window.appVariables.passportDannye.maslyanieTp = window.appVariables.form.querySelector("#comp_12666");
    window.appVariables.passportDannye.magistraliTranzit = window.appVariables.form.querySelector("#lookupTextcomp_12667");
    window.appVariables.passportDannye.potreblenieTeplaFact = window.appVariables.form.querySelector("#comp_12668");
    window.appVariables.passportDannye.potreblenieTeplaProekt = window.appVariables.form.querySelector("#comp_12669");
    window.appVariables.passportDannye.potreblenieTeplaOtklonenie = window.appVariables.form.querySelector("#comp_12670");

    // ТЕХ ЗАКЛЮЧЕНИЯ И ПРОЕКТЫ РЕМОНТОВ
    window.appVariables.tehZakluchenia = new Object();

    for (let i = 0; i < window.appVariables.repairProjectsTableRows.length; i++) {
        if (i < 1 || window.appVariables.repairProjectsTableRows[i].classList.contains("gridBGTotal")) {
            continue;
        }
        if (i > 1) {
            window.appVariables["tehZakluchenia"][i] = new Object();
            window.appVariables["tehZakluchenia"][i]["organizacia"] = window.appVariables.repairProjectsTableRows[i].querySelector("#comp_12333");
            window.appVariables["tehZakluchenia"][i]["dataNomer"] = window.appVariables.repairProjectsTableRows[i].querySelector("#comp_12334");
            window.appVariables["tehZakluchenia"][i]["naimenovanieSoderjanie"] = window.appVariables.repairProjectsTableRows[i].querySelector("#comp_12335");
        }
    }

    // ВЫВОДЫ ПО РЕЗУЛЬТАТАМ ПРЕДЫДУЩЕГО ОБСЛЕДОВАНИЯ
    window.appVariables.vivodyPoRezultatam = new Object();
    for (let i = 0; i < window.appVariables.conclusionsPrevSurveyRows.length; i++) {
        window.appVariables["vivodyPoRezultatam"][i] = new Object();

        window.appVariables["vivodyPoRezultatam"][i]["id"] = window.appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(1)").firstElementChild;
        window.appVariables["vivodyPoRezultatam"][i]["data"] = window.appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(2)");
        window.appVariables["vivodyPoRezultatam"][i]["number"] = window.appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(3)");
        window.appVariables["vivodyPoRezultatam"][i]["tehSostoyanie"] = window.appVariables.conclusionsPrevSurveyRows[i].querySelector("td:nth-child(4)");
    }

    window.appVariables["vivodyPoRezultatam"][0]["number"] = window.appVariables.prevSurveyNumber;

    // РЕКОМЕНДАЦИИ ПО КАП РЕМОНТУ
    window.appVariables.recomend = new Object();
    // Крыша
    window.appVariables.recomend.krisha = new Object();
    for (let i = 1; i < window.appVariables.roofRows.length; i++) {
        switch (window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent) {
            case "Кровля":
                window.appVariables.recomend.krisha.krovla = new Object();
                window.appVariables.recomend.krisha.krovla.name = window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                window.appVariables.recomend.krisha.krovla.recomend = window.appVariables.roofRows[i].querySelector("#comp_12484");
                window.appVariables.recomend.krisha.krovla.trebObjom = window.appVariables.roofRows[i].querySelector("#comp_12485");
                window.appVariables.recomend.krisha.krovla.vypolnenGod = window.appVariables.roofRows[i].querySelector("#comp_12486");
                window.appVariables.recomend.krisha.krovla.factObjom = window.appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Свесы":
                window.appVariables.recomend.krisha.svesy = new Object();
                window.appVariables.recomend.krisha.svesy.name = window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                window.appVariables.recomend.krisha.svesy.recomend = window.appVariables.roofRows[i].querySelector("#comp_12484");
                window.appVariables.recomend.krisha.svesy.trebObjom = window.appVariables.roofRows[i].querySelector("#comp_12485");
                window.appVariables.recomend.krisha.svesy.vypolnenGod = window.appVariables.roofRows[i].querySelector("#comp_12486");
                window.appVariables.recomend.krisha.svesy.factObjom = window.appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Стропильная система":
                window.appVariables.recomend.krisha.stropilnayaSistema = new Object();
                window.appVariables.recomend.krisha.stropilnayaSistema.name = window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                window.appVariables.recomend.krisha.stropilnayaSistema.recomend = window.appVariables.roofRows[i].querySelector("#comp_12484");
                window.appVariables.recomend.krisha.stropilnayaSistema.trebObjom = window.appVariables.roofRows[i].querySelector("#comp_12485");
                window.appVariables.recomend.krisha.stropilnayaSistema.vypolnenGod = window.appVariables.roofRows[i].querySelector("#comp_12486");
                window.appVariables.recomend.krisha.stropilnayaSistema.factObjom = window.appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Чердак":
                window.appVariables.recomend.krisha.cherdak = new Object();
                window.appVariables.recomend.krisha.cherdak.name = window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                window.appVariables.recomend.krisha.cherdak.recomend = window.appVariables.roofRows[i].querySelector("#comp_12484");
                window.appVariables.recomend.krisha.cherdak.trebObjom = window.appVariables.roofRows[i].querySelector("#comp_12485");
                window.appVariables.recomend.krisha.cherdak.vypolnenGod = window.appVariables.roofRows[i].querySelector("#comp_12486");
                window.appVariables.recomend.krisha.cherdak.factObjom = window.appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Покрытие ж/б":
                window.appVariables.recomend.krisha.pokritieJB = new Object();
                window.appVariables.recomend.krisha.pokritieJB.name = window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                window.appVariables.recomend.krisha.pokritieJB.recomend = window.appVariables.roofRows[i].querySelector("#comp_12484");
                window.appVariables.recomend.krisha.pokritieJB.trebObjom = window.appVariables.roofRows[i].querySelector("#comp_12485");
                window.appVariables.recomend.krisha.pokritieJB.vypolnenGod = window.appVariables.roofRows[i].querySelector("#comp_12486");
                window.appVariables.recomend.krisha.pokritieJB.factObjom = window.appVariables.roofRows[i].querySelector("#comp_12487");
                break;
            case "Все элементы":
                window.appVariables.recomend.krisha.vseElementy = new Object();
                window.appVariables.recomend.krisha.vseElementy.name = window.appVariables.roofRows[i].querySelector("#lookupTextcomp_12483").textContent;
                window.appVariables.recomend.krisha.vseElementy.recomend = window.appVariables.roofRows[i].querySelector("#comp_12484");
                window.appVariables.recomend.krisha.vseElementy.trebObjom = window.appVariables.roofRows[i].querySelector("#comp_12485");
                window.appVariables.recomend.krisha.vseElementy.vypolnenGod = window.appVariables.roofRows[i].querySelector("#comp_12486");
                window.appVariables.recomend.krisha.vseElementy.factObjom = window.appVariables.roofRows[i].querySelector("#comp_12487");
                break;
        }
    }

    // Водоотвод
    window.appVariables.recomend.vodootvod = new Object();
    window.appVariables.recomend.vodootvod.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12489");
    window.appVariables.recomend.vodootvod.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12490");
    window.appVariables.recomend.vodootvod.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12491");
    window.appVariables.recomend.vodootvod.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12492");

    // Герметизация
    window.appVariables.recomend.germetizacia = new Object();
    window.appVariables.recomend.germetizacia.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12359");
    window.appVariables.recomend.germetizacia.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12366");
    window.appVariables.recomend.germetizacia.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12365");
    window.appVariables.recomend.germetizacia.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12364");

    // Фасад
    window.appVariables.recomend.fasad = new Object();
    window.appVariables.recomend.fasad.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12494");
    window.appVariables.recomend.fasad.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12495");
    window.appVariables.recomend.fasad.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12496");
    window.appVariables.recomend.fasad.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12364");

    // Балконы
    window.appVariables.recomend.balkony = new Object();
    window.appVariables.recomend.balkony.balkony = new Object();
    window.appVariables.recomend.balkony.lodjii = new Object();
    window.appVariables.recomend.balkony.kozirki = new Object();
    window.appVariables.recomend.balkony.erkery = new Object();
    window.appVariables.recomend.balkony.vseElementy = new Object();

    for (let i = 1; i < window.appVariables.balconyRows.length; i++) {
        switch (window.appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent) {
            case "Балконы":
                window.appVariables.recomend.balkony.balkony.name = window.appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                window.appVariables.recomend.balkony.balkony.recomend = window.appVariables.balconyRows[i].querySelector("#comp_12499");
                window.appVariables.recomend.balkony.balkony.trebObjom = window.appVariables.balconyRows[i].querySelector("#comp_12500");
                window.appVariables.recomend.balkony.balkony.vypolnenGod = window.appVariables.balconyRows[i].querySelector("#comp_12501");
                window.appVariables.recomend.balkony.balkony.factObjom = window.appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Лоджии":
                window.appVariables.recomend.balkony.lodjii.name = window.appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                window.appVariables.recomend.balkony.lodjii.recomend = window.appVariables.balconyRows[i].querySelector("#comp_12499");
                window.appVariables.recomend.balkony.lodjii.trebObjom = window.appVariables.balconyRows[i].querySelector("#comp_12500");
                window.appVariables.recomend.balkony.lodjii.vypolnenGod = window.appVariables.balconyRows[i].querySelector("#comp_12501");
                window.appVariables.recomend.balkony.lodjii.factObjom = window.appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Козырьки":
                window.appVariables.recomend.balkony.kozirki.name = window.appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                window.appVariables.recomend.balkony.kozirki.recomend = window.appVariables.balconyRows[i].querySelector("#comp_12499");
                window.appVariables.recomend.balkony.kozirki.trebObjom = window.appVariables.balconyRows[i].querySelector("#comp_12500");
                window.appVariables.recomend.balkony.kozirki.vypolnenGod = window.appVariables.balconyRows[i].querySelector("#comp_12501");
                window.appVariables.recomend.balkony.kozirki.factObjom = window.appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Эркеры":
                window.appVariables.recomend.balkony.erkery.name = window.appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                window.appVariables.recomend.balkony.erkery.recomend = window.appVariables.balconyRows[i].querySelector("#comp_12499");
                window.appVariables.recomend.balkony.erkery.trebObjom = window.appVariables.balconyRows[i].querySelector("#comp_12500");
                window.appVariables.recomend.balkony.erkery.vypolnenGod = window.appVariables.balconyRows[i].querySelector("#comp_12501");
                window.appVariables.recomend.balkony.erkery.factObjom = window.appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
            case "Все элементы":
                window.appVariables.recomend.balkony.vseElementy.name = window.appVariables.balconyRows[i].querySelector("#lookupTextcomp_12498").textContent;
                window.appVariables.recomend.balkony.vseElementy.recomend = window.appVariables.balconyRows[i].querySelector("#comp_12499");
                window.appVariables.recomend.balkony.vseElementy.trebObjom = window.appVariables.balconyRows[i].querySelector("#comp_12500");
                window.appVariables.recomend.balkony.vseElementy.vypolnenGod = window.appVariables.balconyRows[i].querySelector("#comp_12501");
                window.appVariables.recomend.balkony.vseElementy.factObjom = window.appVariables.balconyRows[i].querySelector("#comp_12502");
                break;
        }
    }
    window.appVariables.recomend.balkony.balkony.osteklenie = window.appVariables.recomendationsDone.querySelector("#lookupTextcomp_12604");
    window.appVariables.recomend.balkony.lodjii.osteklenie = window.appVariables.recomendationsDone.querySelector("#lookupTextcomp_12603");

    // Стены
    window.appVariables.recomend.steny = new Object();
    window.appVariables.recomend.steny.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12504");
    window.appVariables.recomend.steny.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12505");
    window.appVariables.recomend.steny.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12506");
    window.appVariables.recomend.steny.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12348");
    window.appVariables.recomend.steny.uteplenie = window.appVariables.recomendationsDone.querySelector("#lookupTextcomp_12602");

    // Подвал
    window.appVariables.recomend.podval = new Object();
    window.appVariables.recomend.podval.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12360");
    window.appVariables.recomend.podval.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12361");
    window.appVariables.recomend.podval.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12362");
    window.appVariables.recomend.podval.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12363");

    // Тех.подполье
    window.appVariables.recomend.tehPodpolie = new Object();
    window.appVariables.recomend.tehPodpolie.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12353");
    window.appVariables.recomend.tehPodpolie.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12507");
    window.appVariables.recomend.tehPodpolie.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12508");
    window.appVariables.recomend.tehPodpolie.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12509");

    // Тех.этаж
    window.appVariables.recomend.tehEtaj = new Object();
    window.appVariables.recomend.tehEtaj.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12511");
    window.appVariables.recomend.tehEtaj.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12512");
    window.appVariables.recomend.tehEtaj.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12513");
    window.appVariables.recomend.tehEtaj.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12514");

    // Гараж стоянка (подземный)
    window.appVariables.recomend.garage = new Object();
    window.appVariables.recomend.garage.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12516");
    window.appVariables.recomend.garage.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12517");
    window.appVariables.recomend.garage.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12518");
    window.appVariables.recomend.garage.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12519");

    // Места общего пользования
    window.appVariables.recomend.mop = new Object();
    for (let i = 1; i < window.appVariables.mopRows.length; i++) {
        switch (window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent) {
            case "Вестибюли":
                window.appVariables.recomend.mop.vestibuli = new Object();
                window.appVariables.recomend.mop.vestibuli.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.vestibuli.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.vestibuli.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.vestibuli.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.vestibuli.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Крыльца":
                window.appVariables.recomend.mop.krilca = new Object();
                window.appVariables.recomend.mop.krilca.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.krilca.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.krilca.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.krilca.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.krilca.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Пандусы наружные":
                window.appVariables.recomend.mop.pandusyNaruzh = new Object();
                window.appVariables.recomend.mop.pandusyNaruzh.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.pandusyNaruzh.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.pandusyNaruzh.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.pandusyNaruzh.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.pandusyNaruzh.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Пандусы внутриподъездные":
                window.appVariables.recomend.mop.pandusyVnutr = new Object();
                window.appVariables.recomend.mop.pandusyVnutr.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.pandusyVnutr.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.pandusyVnutr.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.pandusyVnutr.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.pandusyVnutr.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Сходы/съезды":
                window.appVariables.recomend.mop.shodySiezdy = new Object();
                window.appVariables.recomend.mop.shodySiezdy.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.shodySiezdy.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.shodySiezdy.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.shodySiezdy.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.shodySiezdy.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Окна, двери":
                window.appVariables.recomend.mop.oknaDveri = new Object();
                window.appVariables.recomend.mop.oknaDveri.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.oknaDveri.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.oknaDveri.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.oknaDveri.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.oknaDveri.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Внутренняя отделка помещений":
                window.appVariables.recomend.mop.vnOtdelkaPomesh = new Object();
                window.appVariables.recomend.mop.vnOtdelkaPomesh.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.vnOtdelkaPomesh.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.vnOtdelkaPomesh.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.vnOtdelkaPomesh.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.vnOtdelkaPomesh.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
            case "Все элементы":
                window.appVariables.recomend.mop.vseElementy = new Object();
                window.appVariables.recomend.mop.vseElementy.name = window.appVariables.mopRows[i].querySelector("#lookupTextcomp_12520").textContent;
                window.appVariables.recomend.mop.vseElementy.recomend = window.appVariables.mopRows[i].querySelector("#comp_12521");
                window.appVariables.recomend.mop.vseElementy.trebObjom = window.appVariables.mopRows[i].querySelector("#comp_12522");
                window.appVariables.recomend.mop.vseElementy.vypolnenGod = window.appVariables.mopRows[i].querySelector("#comp_12523");
                window.appVariables.recomend.mop.vseElementy.factObjom = window.appVariables.mopRows[i].querySelector("#comp_12524");
                break;
        }
    }

    // Лестницы
    window.appVariables.recomend.lestnicy = new Object();
    window.appVariables.recomend.lestnicy.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12526");
    window.appVariables.recomend.lestnicy.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12527");
    window.appVariables.recomend.lestnicy.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12528");
    window.appVariables.recomend.lestnicy.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12529");

    // Перекрытия
    window.appVariables.recomend.perekritya = new Object();
    window.appVariables.recomend.perekritya.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12531");
    window.appVariables.recomend.perekritya.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12532");
    window.appVariables.recomend.perekritya.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12533");
    window.appVariables.recomend.perekritya.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12534");

    // Система отопления
    window.appVariables.recomend.sistemaOtoplenia = new Object();
    for (let i = 1; i < window.appVariables.heatSystemRows.length; i++) {
        switch (window.appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.recomend.sistemaOtoplenia.tehPodpolie = new Object();
                window.appVariables.recomend.sistemaOtoplenia.tehPodpolie.name = window.appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                window.appVariables.recomend.sistemaOtoplenia.tehPodpolie.recomend = window.appVariables.heatSystemRows[i].querySelector("#comp_12536");
                window.appVariables.recomend.sistemaOtoplenia.tehPodpolie.trebObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12537");
                window.appVariables.recomend.sistemaOtoplenia.tehPodpolie.vypolnenGod = window.appVariables.heatSystemRows[i].querySelector("#comp_12538");
                window.appVariables.recomend.sistemaOtoplenia.tehPodpolie.factObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Транзит питающий":
                window.appVariables.recomend.sistemaOtoplenia.tranzitPitaush = new Object();
                window.appVariables.recomend.sistemaOtoplenia.tranzitPitaush.name = window.appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                window.appVariables.recomend.sistemaOtoplenia.tranzitPitaush.recomend = window.appVariables.heatSystemRows[i].querySelector("#comp_12536");
                window.appVariables.recomend.sistemaOtoplenia.tranzitPitaush.trebObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12537");
                window.appVariables.recomend.sistemaOtoplenia.tranzitPitaush.vypolnenGod = window.appVariables.heatSystemRows[i].querySelector("#comp_12538");
                window.appVariables.recomend.sistemaOtoplenia.tranzitPitaush.factObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Чердак":
                window.appVariables.recomend.sistemaOtoplenia.cherdak = new Object();
                window.appVariables.recomend.sistemaOtoplenia.cherdak.name = window.appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                window.appVariables.recomend.sistemaOtoplenia.cherdak.recomend = window.appVariables.heatSystemRows[i].querySelector("#comp_12536");
                window.appVariables.recomend.sistemaOtoplenia.cherdak.trebObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12537");
                window.appVariables.recomend.sistemaOtoplenia.cherdak.vypolnenGod = window.appVariables.heatSystemRows[i].querySelector("#comp_12538");
                window.appVariables.recomend.sistemaOtoplenia.cherdak.factObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Этажи":
                window.appVariables.recomend.sistemaOtoplenia.etaji = new Object();
                window.appVariables.recomend.sistemaOtoplenia.etaji.name = window.appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                window.appVariables.recomend.sistemaOtoplenia.etaji.recomend = window.appVariables.heatSystemRows[i].querySelector("#comp_12536");
                window.appVariables.recomend.sistemaOtoplenia.etaji.trebObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12537");
                window.appVariables.recomend.sistemaOtoplenia.etaji.vypolnenGod = window.appVariables.heatSystemRows[i].querySelector("#comp_12538");
                window.appVariables.recomend.sistemaOtoplenia.etaji.factObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
            case "Вся система":
                window.appVariables.recomend.sistemaOtoplenia.vsaSistema = new Object();
                window.appVariables.recomend.sistemaOtoplenia.vsaSistema.name = window.appVariables.heatSystemRows[i].querySelector("#lookupTextcomp_12535").textContent;
                window.appVariables.recomend.sistemaOtoplenia.vsaSistema.recomend = window.appVariables.heatSystemRows[i].querySelector("#comp_12536");
                window.appVariables.recomend.sistemaOtoplenia.vsaSistema.trebObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12537");
                window.appVariables.recomend.sistemaOtoplenia.vsaSistema.vypolnenGod = window.appVariables.heatSystemRows[i].querySelector("#comp_12538");
                window.appVariables.recomend.sistemaOtoplenia.vsaSistema.factObjom = window.appVariables.heatSystemRows[i].querySelector("#comp_12539");
                break;
        }
    }

    // ГВС
    window.appVariables.recomend.gvs = new Object();
    for (let i = 1; i < window.appVariables.gvsRows.length; i++) {
        switch (window.appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.recomend.gvs.tehPodpolie = new Object();
                window.appVariables.recomend.gvs.tehPodpolie.name = window.appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                window.appVariables.recomend.gvs.tehPodpolie.recomend = window.appVariables.gvsRows[i].querySelector("#comp_12541");
                window.appVariables.recomend.gvs.tehPodpolie.trebObjom = window.appVariables.gvsRows[i].querySelector("#comp_12542");
                window.appVariables.recomend.gvs.tehPodpolie.vypolnenGod = window.appVariables.gvsRows[i].querySelector("#comp_12543");
                window.appVariables.recomend.gvs.tehPodpolie.factObjom = window.appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Транзит питающий":
                window.appVariables.recomend.gvs.tranzitPitaush = new Object();
                window.appVariables.recomend.gvs.tranzitPitaush.name = window.appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                window.appVariables.recomend.gvs.tranzitPitaush.recomend = window.appVariables.gvsRows[i].querySelector("#comp_12541");
                window.appVariables.recomend.gvs.tranzitPitaush.trebObjom = window.appVariables.gvsRows[i].querySelector("#comp_12542");
                window.appVariables.recomend.gvs.tranzitPitaush.vypolnenGod = window.appVariables.gvsRows[i].querySelector("#comp_12543");
                window.appVariables.recomend.gvs.tranzitPitaush.factObjom = window.appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Чердак":
                window.appVariables.recomend.gvs.cherdak = new Object();
                window.appVariables.recomend.gvs.cherdak.name = window.appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                window.appVariables.recomend.gvs.cherdak.recomend = window.appVariables.gvsRows[i].querySelector("#comp_12541");
                window.appVariables.recomend.gvs.cherdak.trebObjom = window.appVariables.gvsRows[i].querySelector("#comp_12542");
                window.appVariables.recomend.gvs.cherdak.vypolnenGod = window.appVariables.gvsRows[i].querySelector("#comp_12543");
                window.appVariables.recomend.gvs.cherdak.factObjom = window.appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Этажи":
                window.appVariables.recomend.gvs.etaji = new Object();
                window.appVariables.recomend.gvs.etaji.name = window.appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                window.appVariables.recomend.gvs.etaji.recomend = window.appVariables.gvsRows[i].querySelector("#comp_12541");
                window.appVariables.recomend.gvs.etaji.trebObjom = window.appVariables.gvsRows[i].querySelector("#comp_12542");
                window.appVariables.recomend.gvs.etaji.vypolnenGod = window.appVariables.gvsRows[i].querySelector("#comp_12543");
                window.appVariables.recomend.gvs.etaji.factObjom = window.appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
            case "Вся система":
                window.appVariables.recomend.gvs.vsaSistema = new Object();
                window.appVariables.recomend.gvs.vsaSistema.name = window.appVariables.gvsRows[i].querySelector("#lookupTextcomp_12540").textContent;
                window.appVariables.recomend.gvs.vsaSistema.recomend = window.appVariables.gvsRows[i].querySelector("#comp_12541");
                window.appVariables.recomend.gvs.vsaSistema.trebObjom = window.appVariables.gvsRows[i].querySelector("#comp_12542");
                window.appVariables.recomend.gvs.vsaSistema.vypolnenGod = window.appVariables.gvsRows[i].querySelector("#comp_12543");
                window.appVariables.recomend.gvs.vsaSistema.factObjom = window.appVariables.gvsRows[i].querySelector("#comp_12544");
                break;
        }
    }

    // ХВС
    window.appVariables.recomend.hvs = new Object();
    for (let i = 1; i < window.appVariables.hvsRows.length; i++) {
        switch (window.appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.recomend.hvs.tehPodpolie = new Object();
                window.appVariables.recomend.hvs.tehPodpolie.name = window.appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                window.appVariables.recomend.hvs.tehPodpolie.recomend = window.appVariables.hvsRows[i].querySelector("#comp_12546");
                window.appVariables.recomend.hvs.tehPodpolie.trebObjom = window.appVariables.hvsRows[i].querySelector("#comp_12547");
                window.appVariables.recomend.hvs.tehPodpolie.vypolnenGod = window.appVariables.hvsRows[i].querySelector("#comp_12548");
                window.appVariables.recomend.hvs.tehPodpolie.factObjom = window.appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Транзит питающий":
                window.appVariables.recomend.hvs.tranzitPitaush = new Object();
                window.appVariables.recomend.hvs.tranzitPitaush.name = window.appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                window.appVariables.recomend.hvs.tranzitPitaush.recomend = window.appVariables.hvsRows[i].querySelector("#comp_12546");
                window.appVariables.recomend.hvs.tranzitPitaush.trebObjom = window.appVariables.hvsRows[i].querySelector("#comp_12547");
                window.appVariables.recomend.hvs.tranzitPitaush.vypolnenGod = window.appVariables.hvsRows[i].querySelector("#comp_12548");
                window.appVariables.recomend.hvs.tranzitPitaush.factObjom = window.appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Этажи":
                window.appVariables.recomend.hvs.etaji = new Object();
                window.appVariables.recomend.hvs.etaji.name = window.appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                window.appVariables.recomend.hvs.etaji.recomend = window.appVariables.hvsRows[i].querySelector("#comp_12546");
                window.appVariables.recomend.hvs.etaji.trebObjom = window.appVariables.hvsRows[i].querySelector("#comp_12547");
                window.appVariables.recomend.hvs.etaji.vypolnenGod = window.appVariables.hvsRows[i].querySelector("#comp_12548");
                window.appVariables.recomend.hvs.etaji.factObjom = window.appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Внутренний пожарный водопровод":
                window.appVariables.recomend.hvs.vnPojarTrubopr = new Object();
                window.appVariables.recomend.hvs.vnPojarTrubopr.name = window.appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                window.appVariables.recomend.hvs.vnPojarTrubopr.recomend = window.appVariables.hvsRows[i].querySelector("#comp_12546");
                window.appVariables.recomend.hvs.vnPojarTrubopr.trebObjom = window.appVariables.hvsRows[i].querySelector("#comp_12547");
                window.appVariables.recomend.hvs.vnPojarTrubopr.vypolnenGod = window.appVariables.hvsRows[i].querySelector("#comp_12548");
                window.appVariables.recomend.hvs.vnPojarTrubopr.factObjom = window.appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
            case "Вся система":
                window.appVariables.recomend.hvs.vsaSistema = new Object();
                window.appVariables.recomend.hvs.vsaSistema.name = window.appVariables.hvsRows[i].querySelector("#lookupTextcomp_12545").textContent;
                window.appVariables.recomend.hvs.vsaSistema.recomend = window.appVariables.hvsRows[i].querySelector("#comp_12546");
                window.appVariables.recomend.hvs.vsaSistema.trebObjom = window.appVariables.hvsRows[i].querySelector("#comp_12547");
                window.appVariables.recomend.hvs.vsaSistema.vypolnenGod = window.appVariables.hvsRows[i].querySelector("#comp_12548");
                window.appVariables.recomend.hvs.vsaSistema.factObjom = window.appVariables.hvsRows[i].querySelector("#comp_12549");
                break;
        }
    }

    // Канализация
    window.appVariables.recomend.kanalizacia = new Object();
    for (let i = 1; i < window.appVariables.sewerRows.length; i++) {
        switch (window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12550").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.recomend.kanalizacia.tehPodpolie = new Object();
                window.appVariables.recomend.kanalizacia.tehPodpolie.name = window.appVariables.sewerRows[i].querySelector("#lookupTextcomp_12550").textContent;
                window.appVariables.recomend.kanalizacia.tehPodpolie.recomend = window.appVariables.sewerRows[i].querySelector("#comp_12551");
                window.appVariables.recomend.kanalizacia.tehPodpolie.trebObjom = window.appVariables.sewerRows[i].querySelector("#comp_12552");
                window.appVariables.recomend.kanalizacia.tehPodpolie.vypolnenGod = window.appVariables.sewerRows[i].querySelector("#comp_12553");
                window.appVariables.recomend.kanalizacia.tehPodpolie.factObjom = window.appVariables.sewerRows[i].querySelector("#comp_12554");
                break;
            case "Этажи":
                window.appVariables.recomend.kanalizacia.etaji = new Object();
                window.appVariables.recomend.kanalizacia.etaji.name = window.appVariables.sewerRows[i].querySelector("#lookupTextcomp_12550").textContent;
                window.appVariables.recomend.kanalizacia.etaji.recomend = window.appVariables.sewerRows[i].querySelector("#comp_12551");
                window.appVariables.recomend.kanalizacia.etaji.trebObjom = window.appVariables.sewerRows[i].querySelector("#comp_12552");
                window.appVariables.recomend.kanalizacia.etaji.vypolnenGod = window.appVariables.sewerRows[i].querySelector("#comp_12553");
                window.appVariables.recomend.kanalizacia.etaji.factObjom = window.appVariables.sewerRows[i].querySelector("#comp_12554");
                break;
            case "Вся система":
                window.appVariables.recomend.kanalizacia.vsaSistema = new Object();
                window.appVariables.recomend.kanalizacia.vsaSistema.name = window.appVariables.sewerRows[i].querySelector("#lookupTextcomp_12550").textContent;
                window.appVariables.recomend.kanalizacia.vsaSistema.recomend = window.appVariables.sewerRows[i].querySelector("#comp_12551");
                window.appVariables.recomend.kanalizacia.vsaSistema.trebObjom = window.appVariables.sewerRows[i].querySelector("#comp_12552");
                window.appVariables.recomend.kanalizacia.vsaSistema.vypolnenGod = window.appVariables.sewerRows[i].querySelector("#comp_12553");
                window.appVariables.recomend.kanalizacia.vsaSistema.factObjom = window.appVariables.sewerRows[i].querySelector("#comp_12554");
                break;
        }
    }

    // Мусоропроводы
    window.appVariables.recomend.musoroprovody = new Object();
    window.appVariables.recomend.musoroprovody.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12556");
    window.appVariables.recomend.musoroprovody.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12557");
    window.appVariables.recomend.musoroprovody.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12558");
    window.appVariables.recomend.musoroprovody.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12559");

    // Система промывки и прочистки стволов мусоропроводов
    window.appVariables.recomend.musoroChistSistema = new Object();
    window.appVariables.recomend.musoroChistSistema.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12561");
    window.appVariables.recomend.musoroChistSistema.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12562");
    window.appVariables.recomend.musoroChistSistema.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12563");
    window.appVariables.recomend.musoroChistSistema.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12564");

    // Вентиляц.
    window.appVariables.recomend.ventilacia = new Object();
    window.appVariables.recomend.ventilacia.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12566");
    window.appVariables.recomend.ventilacia.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12567");
    window.appVariables.recomend.ventilacia.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12568");
    window.appVariables.recomend.ventilacia.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12569");

    // Газоходы
    window.appVariables.recomend.gazohody = new Object();
    window.appVariables.recomend.gazohody.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12576");
    window.appVariables.recomend.gazohody.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12577");
    window.appVariables.recomend.gazohody.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12578");
    window.appVariables.recomend.gazohody.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12579");

    // Лифты
    window.appVariables.recomend.lifty = new Object();
    window.appVariables.recomend.lifty.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12581");
    window.appVariables.recomend.lifty.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12582");
    window.appVariables.recomend.lifty.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12583");
    window.appVariables.recomend.lifty.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12584");

    // Подъёмное устройство для маломобильной группы населения
    window.appVariables.recomend.podyomnik = new Object();
    window.appVariables.recomend.podyomnik.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12586");
    window.appVariables.recomend.podyomnik.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12587");
    window.appVariables.recomend.podyomnik.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12588");
    window.appVariables.recomend.podyomnik.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12589");

    // Устройство для автоматического опускания лифта
    window.appVariables.recomend.autoSpuskLift = new Object();
    window.appVariables.recomend.autoSpuskLift.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12591");
    window.appVariables.recomend.autoSpuskLift.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12592");
    window.appVariables.recomend.autoSpuskLift.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12593");
    window.appVariables.recomend.autoSpuskLift.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12594");

    // Система ЭС (ВРУ)
    window.appVariables.recomend.systemEs = new Object();
    window.appVariables.recomend.systemEs.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12596");
    window.appVariables.recomend.systemEs.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12597");
    window.appVariables.recomend.systemEs.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12598");
    window.appVariables.recomend.systemEs.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12599");

    // ВКВ (второй кабельный ввод)
    window.appVariables.recomend.vkv = new Object();
    window.appVariables.recomend.vkv.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12436");
    window.appVariables.recomend.vkv.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12437");
    window.appVariables.recomend.vkv.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12438");
    window.appVariables.recomend.vkv.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12439");

    // АВР (автоматическое включение резервного питания)
    window.appVariables.recomend.avr = new Object();
    window.appVariables.recomend.avr.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12441");
    window.appVariables.recomend.avr.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12442");
    window.appVariables.recomend.avr.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12443");
    window.appVariables.recomend.avr.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12404");

    // ППАиДУ
    window.appVariables.recomend.ppaidu = new Object();
    window.appVariables.recomend.ppaidu.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12406");
    window.appVariables.recomend.ppaidu.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12407");
    window.appVariables.recomend.ppaidu.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12408");
    window.appVariables.recomend.ppaidu.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12409");

    // Система оповещения о пожаре
    window.appVariables.recomend.pozharOpoveshen = new Object();
    window.appVariables.recomend.pozharOpoveshen.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12411");
    window.appVariables.recomend.pozharOpoveshen.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12412");
    window.appVariables.recomend.pozharOpoveshen.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12413");
    window.appVariables.recomend.pozharOpoveshen.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12414");

    // ГС
    window.appVariables.recomend.gs = new Object();
    window.appVariables.recomend.gs.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12416");
    window.appVariables.recomend.gs.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12417");
    window.appVariables.recomend.gs.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12418");
    window.appVariables.recomend.gs.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12419");

    // Связь с ОДС
    window.appVariables.recomend.ods = new Object();
    window.appVariables.recomend.ods.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12421");
    window.appVariables.recomend.ods.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12422");
    window.appVariables.recomend.ods.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12423");
    window.appVariables.recomend.ods.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12424");

    // Система видеонаблюдения
    window.appVariables.recomend.videonab = new Object();
    window.appVariables.recomend.videonab.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12426");
    window.appVariables.recomend.videonab.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12427");
    window.appVariables.recomend.videonab.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12428");
    window.appVariables.recomend.videonab.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12429");

    // ОЗДС(охранно-защитная дератизационная система)
    window.appVariables.recomend.ozds = new Object();
    window.appVariables.recomend.ozds.recomend = window.appVariables.recomendationsDone.querySelector("#comp_12431");
    window.appVariables.recomend.ozds.trebObjom = window.appVariables.recomendationsDone.querySelector("#comp_12432");
    window.appVariables.recomend.ozds.vypolnenGod = window.appVariables.recomendationsDone.querySelector("#comp_12423");
    window.appVariables.recomend.ozds.factObjom = window.appVariables.recomendationsDone.querySelector("#comp_12424");

    // Общий вывод: Рекомендации по выполнению объемов капитального ремонта
    window.appVariables.recomend.obshiyVivod = window.appVariables.recomendationsDone.querySelector("#lookupTextcomp_12435");

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    for (let i = 1; i < window.appVariables.resultsRoofRows.length; i++) {
        if (!window.appVariables.resultsRoofRows[i].querySelector("#comp_12642")) {
            continue;
        }

        switch (window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent) {
            case "Кровля":
                window.appVariables.krovlyaName = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                window.appVariables.krovlyaDefecty = window.appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                window.appVariables.krovlyaPercent = window.appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                window.appVariables.krovlyaProshlOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                window.appVariables.krovlyaOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Свесы":
                window.appVariables.svesyName = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                window.appVariables.svesyDefecty = window.appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                window.appVariables.svesyPercent = window.appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                window.appVariables.svesyProshlOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                window.appVariables.svesyOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Стропильная система":
                window.appVariables.stropilnayaSistemaName = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                window.appVariables.stropilnayaSistemaDefecty = window.appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                window.appVariables.stropilnayaSistemaPercent = window.appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                window.appVariables.stropilnayaSistemaProshlOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                window.appVariables.stropilnayaSistemaOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Чердак":
                window.appVariables.cherdakName = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                window.appVariables.cherdakDefecty = window.appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                window.appVariables.cherdakPercent = window.appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                window.appVariables.cherdakProshlOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                window.appVariables.cherdakOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Покрытие ж/б":
                window.appVariables.pokritieJBName = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                window.appVariables.pokritieJBDefecty = window.appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                window.appVariables.pokritieJBPercent = window.appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                window.appVariables.pokritieJBProshlOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                window.appVariables.pokritieJBOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
            case "Все элементы":
                window.appVariables.vsyaKrishaName = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12641").textContent;
                window.appVariables.vsyaKrishaDefecty = window.appVariables.resultsRoofRows[i].querySelector("#comp_12642");
                window.appVariables.vsyaKrishaPercent = window.appVariables.resultsRoofRows[i].querySelector("#comp_12644");
                window.appVariables.vsyaKrishaProshlOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12643");
                window.appVariables.vsyaKrishaOcenka = window.appVariables.resultsRoofRows[i].querySelector("#lookupTextcomp_12645");

                break;
        }
    }
    window.appVariables.roofConstruction = window.appVariables.results.querySelector("#lookupTextcomp_12453");
    window.appVariables.roofMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12454");
    window.appVariables.roofSquare = window.appVariables.results.querySelector("#comp_12455");

    // Водоотвод
    window.appVariables.vodootvodDefecty = window.appVariables.results.querySelector("#comp_12647");
    window.appVariables.vodootvodPercent = window.appVariables.results.querySelector("#comp_12649");
    window.appVariables.vodootvodProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12648");
    window.appVariables.vodootvodOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12650");
    window.appVariables.vodootvodType = window.appVariables.results.querySelector("#lookupTextcomp_12456");
    window.appVariables.vodootvodMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12457");

    // Межпанельные стыки
    window.appVariables.majpanelnyeStykiDefecty = window.appVariables.results.querySelector("#comp_12652");
    window.appVariables.majpanelnyeStykiPercent = window.appVariables.results.querySelector("#comp_12654");
    window.appVariables.majpanelnyeStykiProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12653");
    window.appVariables.majpanelnyeStykiOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12655");
    window.appVariables.majpanelnyeStykiType = window.appVariables.results.querySelector("#lookupTextcomp_12458");

    // Фасад
    window.appVariables.fasadDefecty = window.appVariables.results.querySelector("#comp_12657");
    window.appVariables.fasadPercent = window.appVariables.results.querySelector("#comp_12659");
    window.appVariables.fasadProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12658");
    window.appVariables.fasadOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12660");
    window.appVariables.fasadSquare = window.appVariables.results.querySelector("#comp_12459");
    window.appVariables.fasadOtdelkaSten = window.appVariables.results.querySelector("#lookupTextcomp_12460");
    window.appVariables.fasadOblicovkaTsokolya = window.appVariables.results.querySelector("#lookupTextcomp_12461");
    window.appVariables.fasadOkonnyeZapolneniya = window.appVariables.results.querySelector("#lookupTextcomp_12462");

    // Балконы
    for (let i = 1; i < window.appVariables.resultsBalconyRows.length; i++) {
        if (!window.appVariables.resultsBalconyRows[i].querySelector("#comp_12736")) {
            continue;
        }

        switch (window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent) {
            case "Балконы":
                window.appVariables.balkonyName = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                window.appVariables.balkonyDefecty = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                window.appVariables.balkonyPercent = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                window.appVariables.balkonyProshlOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                window.appVariables.balkonyOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Лоджии":
                window.appVariables.lodjiiName = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                window.appVariables.lodjiiDefecty = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                window.appVariables.lodjiiPercent = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                window.appVariables.lodjiiProshlOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                window.appVariables.lodjiiOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Козырьки":
                window.appVariables.kozirkiName = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                window.appVariables.kozirkiDefecty = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                window.appVariables.kozirkiPercent = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                window.appVariables.kozirkiProshlOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                window.appVariables.kozirkiOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Эркеры":
                window.appVariables.erkeryName = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                window.appVariables.erkeryDefecty = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                window.appVariables.erkeryPercent = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                window.appVariables.erkeryProshlOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                window.appVariables.erkeryOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
            case "Все элементы":
                window.appVariables.vseBalkonyName = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12735").textContent;
                window.appVariables.vseBalkonyDefecty = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12736");
                window.appVariables.vseBalkonyPercent = window.appVariables.resultsBalconyRows[i].querySelector("#comp_12738");
                window.appVariables.vseBalkonyProshlOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12737");
                window.appVariables.vseBalkonyOcenka = window.appVariables.resultsBalconyRows[i].querySelector("#lookupTextcomp_12739");

                break;
        }
    }
    window.appVariables.balkonyKolich = window.appVariables.results.querySelector("#comp_12463");
    window.appVariables.balkonyLojii = window.appVariables.results.querySelector("#comp_12464");
    window.appVariables.balkonyKozirkovVhody = window.appVariables.results.querySelector("#comp_12465");
    window.appVariables.balkonyKozirkovVerh = window.appVariables.results.querySelector("#comp_12466");
    window.appVariables.balkonyKozirkovNeproekt = window.appVariables.results.querySelector("#comp_12467");
    window.appVariables.balkonyErkerovKolich = window.appVariables.results.querySelector("#comp_12468");

    // Стены
    window.appVariables.stenyDefecty = window.appVariables.results.querySelector("#comp_12624");
    window.appVariables.stenyPercent = window.appVariables.results.querySelector("#comp_12626");
    window.appVariables.stenyProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12625");
    window.appVariables.stenyOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12672");
    window.appVariables.stenyMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12444");
    window.appVariables.stenyTeploFizSvoistva = window.appVariables.results.querySelector("#lookupTextcomp_12445");

    // Подвал
    window.appVariables.podvalDefecty = window.appVariables.results.querySelector("#comp_12628");
    window.appVariables.podvalPercent = window.appVariables.results.querySelector("#comp_12630");
    window.appVariables.podvalProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12629");
    window.appVariables.podvalOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12631");
    window.appVariables.podvalNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12446");
    window.appVariables.podvalSquare = window.appVariables.results.querySelector("#comp_12447");

    // Тех.подполье
    window.appVariables.techPodpolieDefecty = window.appVariables.results.querySelector("#comp_12633");
    window.appVariables.techPodpoliePercent = window.appVariables.results.querySelector("#comp_12635");
    window.appVariables.techPodpolieProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12634");
    window.appVariables.techPodpolieOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12636");
    window.appVariables.techPodpolieNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12448");

    // Тех.этаж
    window.appVariables.techEtajDefecty = window.appVariables.results.querySelector("#comp_12638");
    window.appVariables.techEtajPercent = window.appVariables.results.querySelector("#comp_12640");
    window.appVariables.techEtajProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12639");
    window.appVariables.techEtajOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12673");
    window.appVariables.techEtajNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12449");
    window.appVariables.techEtajMesto = window.appVariables.results.querySelector("#comp_12367");

    // Гараж стоянка (подземный)
    window.appVariables.garageDefecty = window.appVariables.results.querySelector("#comp_12747");
    window.appVariables.garagePercent = window.appVariables.results.querySelector("#comp_12749");
    window.appVariables.garageProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12748");
    window.appVariables.garageOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12750");
    window.appVariables.garageType = window.appVariables.results.querySelector("#lookupTextcomp_12450");
    window.appVariables.garageSquare = window.appVariables.results.querySelector("#comp_12451");
    window.appVariables.garageEtagnost = window.appVariables.results.querySelector("#comp_12452");
    window.appVariables.garageKolichestvoMashin = window.appVariables.results.querySelector("#comp_12369");

    // Места общего пользования
    for (let i = 1; i < window.appVariables.resultsMopRows.length; i++) {
        if (!window.appVariables.resultsMopRows[i].querySelector("#comp_12752")) {
            continue;
        }

        switch (window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent) {
            case "Вестибюли":
                window.appVariables.mopVestibuliName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopVestibuliDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopVestibuliPercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopVestibuliProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopVestibuliOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Крыльца":
                window.appVariables.mopKrilcaName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopKrilcaDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopKrilcaPercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopKrilcaProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopKrilcaOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Пандусы наружные":
                window.appVariables.mopPandusyNaruzhnieName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopPandusyNaruzhnieDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopPandusyNaruzhniePercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopPandusyNaruzhnieProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopPandusyNaruzhnieOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Пандусы внутри-подъездные":
                window.appVariables.mopPandusyVnutrennieName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopPandusyVnutrennieDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopPandusyVnutrenniePercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopPandusyVnutrennieProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopPandusyVnutrennieOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Сходы/съезды":
                window.appVariables.mopShodySiezdyName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopShodySiezdyDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopShodySiezdyPercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopShodySiezdyProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopShodySiezdyOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Окна, двери":
                window.appVariables.mopOknaDveriName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopOknaDveriDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopOknaDveriPercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopOknaDveriProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopOknaDveriOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Внутренняя отделка помещений":
                window.appVariables.mopVnOtdelkaPomeshName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopVnOtdelkaPomeshDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopVnOtdelkaPomeshPercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopVnOtdelkaPomeshProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopVnOtdelkaPomeshOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
            case "Все элементы":
                window.appVariables.mopVseElementyName = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12751").textContent;
                window.appVariables.mopVseElementyDefecty = window.appVariables.resultsMopRows[i].querySelector("#comp_12752");
                window.appVariables.mopVseElementyPercent = window.appVariables.resultsMopRows[i].querySelector("#comp_12754");
                window.appVariables.mopVseElementyProshlOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12753");
                window.appVariables.mopVseElementyOcenka = window.appVariables.resultsMopRows[i].querySelector("#lookupTextcomp_12755");

                break;
        }
    }
    window.appVariables.mopPandusyNaruzhKolich = window.appVariables.results.querySelector("#comp_12354");
    window.appVariables.mopPandusyVnutrKolich = window.appVariables.results.querySelector("#comp_12355");
    window.appVariables.mopShodySiezdyKolich = window.appVariables.results.querySelector("#comp_12356");

    // Лестницы
    window.appVariables.lestnicyDefecty = window.appVariables.results.querySelector("#comp_12757");
    window.appVariables.lestnicyPercent = window.appVariables.results.querySelector("#comp_12759");
    window.appVariables.lestnicyProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12758");
    window.appVariables.lestnicyOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12674");
    window.appVariables.lestnicyConstruction = window.appVariables.results.querySelector("#lookupTextcomp_12370");

    // Перекрытия
    window.appVariables.perekrityaDefecty = window.appVariables.results.querySelector("#comp_12761");
    window.appVariables.perekrityaPercent = window.appVariables.results.querySelector("#comp_12763");
    window.appVariables.perekrityaProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12764");
    window.appVariables.perekrityaOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12764");
    window.appVariables.perekrityaMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12371");

    // Система отопления
    for (let i = 1; i < window.appVariables.resultsHeatSystemRows.length; i++) {
        if (!window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766")) {
            continue;
        }

        switch (window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.otopleniyeTehPodpolieName = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                window.appVariables.otopleniyeTehPodpolieDefecty = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                window.appVariables.otopleniyeTehPodpoliePercent = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                window.appVariables.otopleniyeTehPodpolieProshlOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                window.appVariables.otopleniyeTehPodpolieOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Транзит питающий":
                window.appVariables.otopleniyeTranzitPitaushName = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                window.appVariables.otopleniyeTranzitPitaushDefecty = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                window.appVariables.otopleniyeTranzitPitaushPercent = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                window.appVariables.otopleniyeTranzitPitaushProshlOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                window.appVariables.otopleniyeTranzitPitaushOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Чердак":
                window.appVariables.otopleniyeCherdakName = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                window.appVariables.otopleniyeCherdakDefecty = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                window.appVariables.otopleniyeCherdakPercent = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                window.appVariables.otopleniyeCherdakProshlOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                window.appVariables.otopleniyeCherdakOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Этажи":
                window.appVariables.otopleniyeEtajiName = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                window.appVariables.otopleniyeEtajiDefecty = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                window.appVariables.otopleniyeEtajiPercent = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                window.appVariables.otopleniyeEtajiProshlOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                window.appVariables.otopleniyeEtajiOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
            case "Вся система":
                window.appVariables.vseOtopleniyeName = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12765").textContent;
                window.appVariables.vseOtopleniyeDefecty = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12766");
                window.appVariables.vseOtopleniyePercent = window.appVariables.resultsHeatSystemRows[i].querySelector("#comp_12768");
                window.appVariables.vseOtopleniyeProshlOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12767");
                window.appVariables.vseOtopleniyeOcenka = window.appVariables.resultsHeatSystemRows[i].querySelector("#lookupTextcomp_12769");

                break;
        }
    }
    window.appVariables.otopleniyeVid = window.appVariables.results.querySelector("#lookupTextcomp_12605");
    window.appVariables.otopleniyeMaterial = window.appVariables.results.querySelector("#lookupTextcomp_13393");
    window.appVariables.otopleniyeTypePribor = window.appVariables.results.querySelector("#lookupTextcomp_12372");
    window.appVariables.otopleniyeTermoRegulKvartir = window.appVariables.results.querySelector("#lookupTextcomp_12373");
    window.appVariables.otopleniyeAuu = window.appVariables.results.querySelector("#comp_12374");
    window.appVariables.otopleniyeOduu = window.appVariables.results.querySelector("#lookupTextcomp_12375");
    window.appVariables.otopleniyeElevUzel = window.appVariables.results.querySelector("#comp_12376");
    window.appVariables.otopleniyeTeplovoyUzel = window.appVariables.results.querySelector("#comp_12377");
    window.appVariables.otopleniyeTypeStoyakov = window.appVariables.results.querySelector("#lookupTextcomp_12299");

    // ГВС
    for (let i = 1; i < window.appVariables.resultsGvsRows.length; i++) {
        if (!window.appVariables.resultsGvsRows[i].querySelector("#comp_12771")) {
            continue;
        }

        switch (window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.gvsTehPodpolieName = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                window.appVariables.gvsTehPodpolieDefecty = window.appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                window.appVariables.gvsTehPodpoliePercent = window.appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                window.appVariables.gvsTehPodpolieProshlOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                window.appVariables.gvsTehPodpolieOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Транзит питающий":
                window.appVariables.gvsTranzitPitaushName = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                window.appVariables.gvsTranzitPitaushDefecty = window.appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                window.appVariables.gvsTranzitPitaushPercent = window.appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                window.appVariables.gvsTranzitPitaushProshlOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                window.appVariables.gvsTranzitPitaushOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Чердак":
                window.appVariables.gvsCherdakName = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                window.appVariables.gvsCherdakDefecty = window.appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                window.appVariables.gvsCherdakPercent = window.appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                window.appVariables.gvsCherdakProshlOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                window.appVariables.gvsCherdakOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Этажи":
                window.appVariables.gvsEtajiName = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                window.appVariables.gvsEtajiDefecty = window.appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                window.appVariables.gvsEtajiPercent = window.appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                window.appVariables.gvsEtajiProshlOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                window.appVariables.gvsEtajiOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
            case "Вся система":
                window.appVariables.vseGvsName = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12770").textContent;
                window.appVariables.vseGvsDefecty = window.appVariables.resultsGvsRows[i].querySelector("#comp_12771");
                window.appVariables.vseGvsPercent = window.appVariables.resultsGvsRows[i].querySelector("#comp_12773");
                window.appVariables.vseGvsProshlOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12772");
                window.appVariables.vseGvsOcenka = window.appVariables.resultsGvsRows[i].querySelector("#lookupTextcomp_12675");

                break;
        }
    }
    window.appVariables.gvsType = window.appVariables.results.querySelector("#lookupTextcomp_12378");
    window.appVariables.gvsMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12379");
    window.appVariables.gvsOduu = window.appVariables.results.querySelector("#lookupTextcomp_12380");
    window.appVariables.gvsTypeStoyakov = window.appVariables.results.querySelector("#lookupTextcomp_13394");

    // ХВС
    for (let i = 1; i < window.appVariables.resultsHvsRows.length; i++) {
        if (!window.appVariables.resultsHvsRows[i].querySelector("#comp_12775")) {
            continue;
        }

        switch (window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.hvsTehPodpolieName = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                window.appVariables.hvsTehPodpolieDefecty = window.appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                window.appVariables.hvsTehPodpoliePercent = window.appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                window.appVariables.hvsTehPodpolieProshlOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                window.appVariables.hvsTehPodpolieOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Транзит питающий":
                window.appVariables.hvsTranzitPitaushName = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                window.appVariables.hvsTranzitPitaushDefecty = window.appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                window.appVariables.hvsTranzitPitaushPercent = window.appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                window.appVariables.hvsTranzitPitaushProshlOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                window.appVariables.hvsTranzitPitaushOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Этажи":
                window.appVariables.hvsEtajiName = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                window.appVariables.hvsEtajiDefecty = window.appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                window.appVariables.hvsEtajiPercent = window.appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                window.appVariables.hvsEtajiProshlOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                window.appVariables.hvsEtajiOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Внутренний пожарный водопровод":
                window.appVariables.hvsVnPozharProvodName = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                window.appVariables.hvsVnPozharProvodDefecty = window.appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                window.appVariables.hvsVnPozharProvodPercent = window.appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                window.appVariables.hvsVnPozharProvodProshlOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                window.appVariables.hvsVnPozharProvodOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
            case "Вся система":
                window.appVariables.vseHvsName = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12774").textContent;
                window.appVariables.vseHvsDefecty = window.appVariables.resultsHvsRows[i].querySelector("#comp_12775");
                window.appVariables.vseHvsPercent = window.appVariables.resultsHvsRows[i].querySelector("#comp_12777");
                window.appVariables.vseHvsProshlOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12776");
                window.appVariables.vseHvsOcenka = window.appVariables.resultsHvsRows[i].querySelector("#lookupTextcomp_12778");

                break;
        }
    }
    window.appVariables.hvsMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12382");
    window.appVariables.hvsOduu = window.appVariables.results.querySelector("#lookupTextcomp_12381");
    window.appVariables.hvsTypeStoyakov = window.appVariables.results.querySelector("#lookupTextcomp_13395");

    // Канализация
    for (let i = 1; i < window.appVariables.resultsSewerRows.length; i++) {
        if (!window.appVariables.resultsSewerRows[i].querySelector("#comp_12780")) {
            continue;
        }

        switch (window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent) {
            case "Тех.подполье/тех.этаж":
                window.appVariables.kanalizaciaTehPodpolieName = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent;
                window.appVariables.kanalizaciaTehPodpolieDefecty = window.appVariables.resultsSewerRows[i].querySelector("#comp_12780");
                window.appVariables.kanalizaciaTehPodpoliePercent = window.appVariables.resultsSewerRows[i].querySelector("#comp_12782");
                window.appVariables.kanalizaciaTehPodpolieProshlOcenka = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12781");
                window.appVariables.kanalizaciaTehPodpolieOcenka = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12783");

                break;
            case "Этажи":
                window.appVariables.kanalizaciaEtajiName = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent;
                window.appVariables.kanalizaciaEtajiDefecty = window.appVariables.resultsSewerRows[i].querySelector("#comp_12780");
                window.appVariables.kanalizaciaEtajiPercent = window.appVariables.resultsSewerRows[i].querySelector("#comp_12782");
                window.appVariables.kanalizaciaEtajiProshlOcenka = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12781");
                window.appVariables.kanalizaciaEtajiOcenka = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12783");

                break;
            case "Вся система":
                window.appVariables.vseKanalizaciaName = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12779").textContent;
                window.appVariables.vseKanalizaciaDefecty = window.appVariables.resultsSewerRows[i].querySelector("#comp_12780");
                window.appVariables.vseKanalizaciaPercent = window.appVariables.resultsSewerRows[i].querySelector("#comp_12782");
                window.appVariables.vseKanalizaciaProshlOcenka = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12781");
                window.appVariables.vseKanalizaciaOcenka = window.appVariables.resultsSewerRows[i].querySelector("#lookupTextcomp_12783");

                break;
        }
    }
    window.appVariables.kanalizaciaMaterial = window.appVariables.results.querySelector("#lookupTextcomp_12383");
    window.appVariables.kanalizaciaTypeStoyakov = window.appVariables.results.querySelector("#lookupTextcomp_13396");

    // Мусоропроводы
    window.appVariables.musoroprovodyDefecty = window.appVariables.results.querySelector("#comp_12785");
    window.appVariables.musoroprovodyPercent = window.appVariables.results.querySelector("#comp_12787");
    window.appVariables.musoroprovodyProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12786");
    window.appVariables.musoroprovodyOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12788");
    window.appVariables.musoroprovodyMesto = window.appVariables.results.querySelector("#lookupTextcomp_12384");
    window.appVariables.musoroprovodyKamery = window.appVariables.results.querySelector("#lookupTextcomp_12385");

    // Связь с ОДС
    window.appVariables.odsDefecty = window.appVariables.results.querySelector("#comp_12790");
    window.appVariables.odsPosledneeObsled = window.appVariables.results.querySelector("#comp_12791");
    window.appVariables.odsOrganizacia = window.appVariables.results.querySelector("#comp_12792");
    window.appVariables.odsProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13401");
    window.appVariables.odsOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12793");
    window.appVariables.odsType = window.appVariables.results.querySelector("#lookupTextcomp_12386");
    window.appVariables.odsSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12607");

    // Вентиляция
    window.appVariables.ventilaciaDefecty = window.appVariables.results.querySelector("#comp_12795");
    window.appVariables.ventilaciaPosledneeObsled = window.appVariables.results.querySelector("#comp_12796");
    window.appVariables.ventilaciaOrganizacia = window.appVariables.results.querySelector("#comp_12797");
    window.appVariables.ventilaciaProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13402");
    window.appVariables.ventilaciaOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12798");
    window.appVariables.ventilaciaSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12608");

    // Система промывки и прочистки стволов мусоропроводов
    window.appVariables.musoroChistSistemaDefecty = window.appVariables.results.querySelector("#comp_12800");
    window.appVariables.musoroChistSistemaPosledObsled = window.appVariables.results.querySelector("#comp_12801");
    window.appVariables.musoroChistSistemaOrganizacia = window.appVariables.results.querySelector("#comp_12802");
    window.appVariables.musoroChistSistemaProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13403");
    window.appVariables.musoroChistSistemaOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12803");
    window.appVariables.musoroChistSistemaNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12387");
    window.appVariables.musoroChistSistemaSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12609");

    // ОЗДС (охранно-защитная дератизационная система)
    window.appVariables.ozdsDefecty = window.appVariables.results.querySelector("#comp_12677");
    window.appVariables.ozdsPosledObsled = window.appVariables.results.querySelector("#comp_12678");
    window.appVariables.ozdsOrganizacia = window.appVariables.results.querySelector("#comp_12679");
    window.appVariables.ozdsProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13404");
    window.appVariables.ozdsOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12680");
    window.appVariables.ozdsNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12388");
    window.appVariables.ozdsSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12610");

    // Газоходы
    window.appVariables.gazohodyDefecty = window.appVariables.results.querySelector("#comp_12687");
    window.appVariables.gazohodyPosledObsled = window.appVariables.results.querySelector("#comp_12688");
    window.appVariables.gazohodyOrganizacia = window.appVariables.results.querySelector("#comp_12689");
    window.appVariables.gazohodyProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13405");
    window.appVariables.gazohodyOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12690");
    window.appVariables.gazohodyNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12390");
    window.appVariables.gazohodySostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12612");

    // Лифты
    window.appVariables.liftyDefecty = window.appVariables.results.querySelector("#comp_12692");
    window.appVariables.liftyPosledObsled = window.appVariables.results.querySelector("#comp_12693");
    window.appVariables.liftyOrganizacia = window.appVariables.results.querySelector("#comp_12694");
    window.appVariables.liftyProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13406");
    window.appVariables.liftyOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12695");
    window.appVariables.liftyPass = window.appVariables.results.querySelector("#comp_12391");
    window.appVariables.liftyGruzPass = window.appVariables.results.querySelector("#comp_12392");
    window.appVariables.liftyNavesnye = window.appVariables.results.querySelector("#comp_12393");
    window.appVariables.liftySostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12613");

    // Подъёмное устройство для маломобильной группы населения
    window.appVariables.podyomnikDefecty = window.appVariables.results.querySelector("#comp_12697");
    window.appVariables.podyomnikPosledObsled = window.appVariables.results.querySelector("#comp_12698");
    window.appVariables.podyomnikOrganizacia = window.appVariables.results.querySelector("#comp_12699");
    window.appVariables.podyomnikProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13407");
    window.appVariables.podyomnikOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12700");
    window.appVariables.podyomnikKolich = window.appVariables.results.querySelector("#comp_12394");
    window.appVariables.podyomnikSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12614");

    // Устройство для автоматического опускания лифта
    window.appVariables.autoSpuskLiftDefecty = window.appVariables.results.querySelector("#comp_12702");
    window.appVariables.autoSpuskLiftPosledObsled = window.appVariables.results.querySelector("#comp_12703");
    window.appVariables.autoSpuskLiftOrganizacia = window.appVariables.results.querySelector("#comp_12704");
    window.appVariables.autoSpuskLiftProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13408");
    window.appVariables.autoSpuskLiftOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12705");
    window.appVariables.autoSpuskLiftNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12395");
    window.appVariables.autoSpuskLiftSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12615");

    // Система ЭС
    window.appVariables.systemEsDefecty = window.appVariables.results.querySelector("#comp_12707");
    window.appVariables.systemEsPosledObsled = window.appVariables.results.querySelector("#comp_12708");
    window.appVariables.systemEsOrganizacia = window.appVariables.results.querySelector("#comp_12709");
    window.appVariables.systemEsProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13409");
    window.appVariables.systemEsOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12710");
    window.appVariables.systemEsKolich = window.appVariables.results.querySelector("#comp_12397");
    window.appVariables.systemEsRazmeshenie = window.appVariables.results.querySelector("#lookupTextcomp_12396");
    window.appVariables.systemEsSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12616");

    // ВКВ (второй кабельный ввод)
    window.appVariables.vkvDefecty = window.appVariables.results.querySelector("#comp_12712");
    window.appVariables.vkvPosledObsled = window.appVariables.results.querySelector("#comp_12713");
    window.appVariables.vkvOrganizacia = window.appVariables.results.querySelector("#comp_12714");
    window.appVariables.vkvProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13410");
    window.appVariables.vkvOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12715");
    window.appVariables.vkvNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12398");
    window.appVariables.vkvSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12622");

    // АВР (автоматическое включение резервного питания)
    window.appVariables.avrDefecty = window.appVariables.results.querySelector("#comp_12717");
    window.appVariables.avrPosledObsled = window.appVariables.results.querySelector("#comp_12718");
    window.appVariables.avrOrganizacia = window.appVariables.results.querySelector("#comp_12724");
    window.appVariables.avrProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13411");
    window.appVariables.avrOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12720");
    window.appVariables.avrNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12399");
    window.appVariables.avrSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12617");

    // ППАиДУ
    window.appVariables.ppaiduDefecty = window.appVariables.results.querySelector("#comp_12722");
    window.appVariables.ppaiduPosledObsled = window.appVariables.results.querySelector("#comp_12723");
    window.appVariables.ppaiduOrganizacia = window.appVariables.results.querySelector("#comp_12724");
    window.appVariables.ppaiduProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13412");
    window.appVariables.ppaiduOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12725");
    window.appVariables.ppaiduType = window.appVariables.results.querySelector("#lookupTextcomp_12400");
    window.appVariables.ppaiduSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12618");

    // Система оповещения о пожаре
    window.appVariables.pozharOpoveshenDefecty = window.appVariables.results.querySelector("#comp_12727");
    window.appVariables.pozharOpoveshenPosledObsled = window.appVariables.results.querySelector("#comp_12728");
    window.appVariables.pozharOpoveshenOrganizacia = window.appVariables.results.querySelector("#comp_12729");
    window.appVariables.pozharOpoveshenProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13413");
    window.appVariables.pozharOpoveshenOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12730");
    window.appVariables.pozharOpoveshenNalichie = window.appVariables.results.querySelector("#lookupTextcomp_12401");
    window.appVariables.pozharOpoveshenSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12619");

    // Система ГС
    window.appVariables.sistemaGsDefecty = window.appVariables.results.querySelector("#comp_12732");
    window.appVariables.sistemaGsPosledObsled = window.appVariables.results.querySelector("#comp_12733");
    window.appVariables.sistemaGsOrganizacia = window.appVariables.results.querySelector("#comp_12733");
    window.appVariables.sistemaGsProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13414");
    window.appVariables.sistemaGsOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12740");
    window.appVariables.sistemaGsVvody = window.appVariables.results.querySelector("#lookupTextcomp_12402");
    window.appVariables.sistemaGsRazvodka = window.appVariables.results.querySelector("#lookupTextcomp_12403");
    window.appVariables.sistemaGsSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12620");

    // Система видеонаблюдения
    window.appVariables.sistemaVideonabDefecty = window.appVariables.results.querySelector("#comp_12742");
    window.appVariables.sistemaVideonabPosledObsled = window.appVariables.results.querySelector("#comp_12743");
    window.appVariables.sistemaVideonabOrganizacia = window.appVariables.results.querySelector("#comp_12744");
    window.appVariables.sistemaVideonabProshlOcenka = window.appVariables.results.querySelector("#lookupTextcomp_13415");
    window.appVariables.sistemaVideonabOcenka = window.appVariables.results.querySelector("#lookupTextcomp_12745");
    window.appVariables.sistemaVideonabMesto = window.appVariables.results.querySelector("#lookupTextcomp_12349");
    window.appVariables.sistemaVideonabSostoyanie = window.appVariables.results.querySelector("#lookupTextcomp_12621");

    // Нижняя часть отчета
    window.appVariables.dopolnitDannye = window.appVariables.form.querySelector("#comp_12324");
    window.appVariables.obsledVypolneno = window.appVariables.form.querySelector("#lookupTextcomp_12347");
    window.appVariables.recomendatciiPoUtepleniuSten = window.appVariables.form.querySelector("#lookupTextcomp_12350");
    window.appVariables.tehSostoyanieZdania = window.appVariables.form.querySelector("#lookupTextcomp_12325");
    window.appVariables.recomendatciiPoDopRabotam = window.appVariables.form.querySelector("#comp_12606");

    // Подписывающие лица
    for (let i = 0; i < window.appVariables.signatoriesRows.length; i++) {
        if (!window.appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
            continue;
        }

        window.appVariables[i] = new Object();

        window.appVariables[i]["licaOt"] = window.appVariables.signatoriesRows[i].querySelector("#comp_12340");
        window.appVariables[i]["LicaDoljnost"] = window.appVariables.signatoriesRows[i].querySelector("#comp_12341");
        window.appVariables[i]["licaFio"] = window.appVariables.signatoriesRows[i].querySelector("#comp_12342");

        if (window.representativesInputs.empty) {
            window.representativesInputs[i] = new Object();
            window.representativesInputs[i]["LicaDoljnost"] = new Array();
            window.representativesInputs[i]["licaOt"] = new Array();
            window.representativesInputs[i]["licaFio"] = new Array();

            window.representativesInputs[i]["LicaDoljnost"].push(window.appVariables[i]["LicaDoljnost"]);
            window.representativesInputs[i]["licaOt"].push(window.appVariables[i]["licaOt"]);
            window.representativesInputs[i]["licaFio"].push(window.appVariables[i]["licaFio"]);
        }
    }

    window.representativesInputs.empty = false;

    if (window.resultsDefectsInputs.empty) {
        window.resultsDefectsInputs.inputs.push(window.appVariables.krovlyaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.svesyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.stropilnayaSistemaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.cherdakDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.pokritieJBDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vsyaKrishaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vodootvodDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.majpanelnyeStykiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.fasadDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.balkonyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.lodjiiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.kozirkiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.erkeryDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vseBalkonyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.stenyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.podvalDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.techPodpolieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.techEtajDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.garageDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopVestibuliDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopKrilcaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopPandusyNaruzhnieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopPandusyVnutrennieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopShodySiezdyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopOknaDveriDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopVnOtdelkaPomeshDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.mopVseElementyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.lestnicyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.perekrityaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.otopleniyeTehPodpolieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.otopleniyeTranzitPitaushDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.otopleniyeCherdakDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.otopleniyeEtajiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vseOtopleniyeDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.gvsTehPodpolieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.gvsTranzitPitaushDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.gvsCherdakDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.gvsEtajiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vseGvsDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.hvsTehPodpolieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.hvsTranzitPitaushDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.hvsEtajiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.hvsVnPozharProvodDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vseHvsDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.kanalizaciaTehPodpolieDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.kanalizaciaEtajiDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vseKanalizaciaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.musoroprovodyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.odsDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.ventilaciaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.musoroChistSistemaDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.ozdsDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.gazohodyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.liftyDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.podyomnikDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.autoSpuskLiftDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.systemEsDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.vkvDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.avrDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.ppaiduDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.pozharOpoveshenDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.sistemaGsDefecty);
        window.resultsDefectsInputs.inputs.push(window.appVariables.sistemaVideonabDefecty);

        window.resultsDefectsInputs.empty = false;
    }
}