import { appVariables } from "./constants";
import { clickGenerator } from "./clickGenerator";
import { searchAllInputs } from "./searchAllInputs";
import { setRepresentatives } from "./setRepresentatives";
import { buttonError } from "./buttonError";
import { appData } from ".";

export const loadData = () => {
    if (!appData.availableFunctions.loadData) {
        return;
    }
    // Находим все поля в отчете
    searchAllInputs();
    setRepresentatives();

    // Если страница не подходит для вставки - выдаем ошибку и выходим из функции
    if (!buttonError(appVariables.pasteButton, appVariables.currentPage, "main", "Вставка отчета")) {
        return;
    }

    // Если никаких данных в localStorage нет - выходим из функции
    if (localStorage.getItem("MJIDATA") === null) {
        appVariables.pasteButton.classList.add("main__button_error");
        appVariables.pasteButton.textContent = "Ничего не скопировано";
        setTimeout(() => {
            appVariables.pasteButton.textContent = "Вставка отчета";
            appVariables.pasteButton.classList.remove("main__button_error");
        }, 1500);
        return;
    }
    const loadData = JSON.parse(localStorage.getItem("MJIDATA")!);

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    // Кровля
    appVariables.krovlyaDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.krovlyaName]["Выявленные дефекты"];
    appVariables.krovlyaPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.krovlyaName]["% деф. части"];
    clickGenerator(appVariables.krovlyaOcenka, loadData["Результаты выборочного обследования"]["Крыша"][appVariables.krovlyaName]["Оценка"], true);

    // Свесы
    appVariables.svesyDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.svesyName]["Выявленные дефекты"];
    appVariables.svesyPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.svesyName]["% деф. части"];
    clickGenerator(appVariables.svesyOcenka, loadData["Результаты выборочного обследования"]["Крыша"][appVariables.svesyName]["Оценка"], true);

    // Стропильная система
    appVariables.stropilnayaSistemaDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.stropilnayaSistemaName]["Выявленные дефекты"];
    appVariables.stropilnayaSistemaPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.stropilnayaSistemaName]["% деф. части"];
    clickGenerator(appVariables.stropilnayaSistemaOcenka, loadData["Результаты выборочного обследования"]["Крыша"][appVariables.stropilnayaSistemaName]["Оценка"], true);

    // Чердак
    appVariables.cherdakDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.cherdakName]["Выявленные дефекты"];
    appVariables.cherdakPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.cherdakName]["% деф. части"];
    clickGenerator(appVariables.cherdakOcenka, loadData["Результаты выборочного обследования"]["Крыша"][appVariables.cherdakName]["Оценка"], true);

    // Покрытие ж/б
    appVariables.pokritieJBDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.pokritieJBName]["Выявленные дефекты"];
    appVariables.pokritieJBPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.pokritieJBName]["% деф. части"];
    clickGenerator(appVariables.pokritieJBOcenka, loadData["Результаты выборочного обследования"]["Крыша"][appVariables.pokritieJBName]["Оценка"], true);

    // Все элементы
    appVariables.vsyaKrishaDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.vsyaKrishaName]["Выявленные дефекты"];
    appVariables.vsyaKrishaPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][appVariables.vsyaKrishaName]["% деф. части"];
    clickGenerator(appVariables.vsyaKrishaOcenka, loadData["Результаты выборочного обследования"]["Крыша"][appVariables.vsyaKrishaName]["Оценка"], true);

    // Водоотвод
    appVariables.vodootvodDefecty.value = loadData["Результаты выборочного обследования"]["Водоотвод"]["Выявленные дефекты"];
    appVariables.vodootvodPercent.value = loadData["Результаты выборочного обследования"]["Водоотвод"]["% деф. части"];
    clickGenerator(appVariables.vodootvodOcenka, loadData["Результаты выборочного обследования"]["Водоотвод"]["Оценка"], true);

    // Межпанельные стыки
    appVariables.majpanelnyeStykiDefecty.value = loadData["Результаты выборочного обследования"]["Межпанельные стыки"]["Выявленные дефекты"];
    appVariables.majpanelnyeStykiPercent.value = loadData["Результаты выборочного обследования"]["Межпанельные стыки"]["% деф. части"];
    clickGenerator(appVariables.majpanelnyeStykiOcenka, loadData["Результаты выборочного обследования"]["Межпанельные стыки"]["Оценка"], true);

    // Фасад
    appVariables.fasadDefecty.value = loadData["Результаты выборочного обследования"]["Фасад"]["Выявленные дефекты"];
    appVariables.fasadPercent.value = loadData["Результаты выборочного обследования"]["Фасад"]["% деф. части"];
    clickGenerator(appVariables.fasadOcenka, loadData["Результаты выборочного обследования"]["Фасад"]["Оценка"], true);

    // Балконы
    // Балконы
    appVariables.balkonyDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.balkonyName]["Выявленные дефекты"];
    appVariables.balkonyPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.balkonyName]["% деф. части"];
    clickGenerator(appVariables.balkonyOcenka, loadData["Результаты выборочного обследования"]["Балконы"][appVariables.balkonyName]["Оценка"], true);

    // Лоджии
    appVariables.lodjiiDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.lodjiiName]["Выявленные дефекты"];
    appVariables.lodjiiPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.lodjiiName]["% деф. части"];
    clickGenerator(appVariables.lodjiiOcenka, loadData["Результаты выборочного обследования"]["Балконы"][appVariables.lodjiiName]["Оценка"], true);

    // Козырьки
    appVariables.kozirkiDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.kozirkiName]["Выявленные дефекты"];
    appVariables.kozirkiPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.kozirkiName]["% деф. части"];
    clickGenerator(appVariables.kozirkiOcenka, loadData["Результаты выборочного обследования"]["Балконы"][appVariables.kozirkiName]["Оценка"], true);

    // Эркеры
    appVariables.erkeryDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.erkeryName]["Выявленные дефекты"];
    appVariables.erkeryPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.erkeryName]["% деф. части"];
    clickGenerator(appVariables.erkeryOcenka, loadData["Результаты выборочного обследования"]["Балконы"][appVariables.erkeryName]["Оценка"], true);

    // Все элементы
    appVariables.vseBalkonyDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.vseBalkonyName]["Выявленные дефекты"];
    appVariables.vseBalkonyPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][appVariables.vseBalkonyName]["% деф. части"];
    clickGenerator(appVariables.vseBalkonyOcenka, loadData["Результаты выборочного обследования"]["Балконы"][appVariables.vseBalkonyName]["Оценка"], true);

    // Стены
    appVariables.stenyDefecty.value = loadData["Результаты выборочного обследования"]["Стены"]["Выявленные дефекты"];
    appVariables.stenyPercent.value = loadData["Результаты выборочного обследования"]["Стены"]["% деф. части"];
    clickGenerator(appVariables.stenyOcenka, loadData["Результаты выборочного обследования"]["Стены"]["Оценка"], true);

    // Подвал
    appVariables.podvalDefecty.value = loadData["Результаты выборочного обследования"]["Подвал"]["Выявленные дефекты"];
    appVariables.podvalPercent.value = loadData["Результаты выборочного обследования"]["Подвал"]["% деф. части"];
    clickGenerator(appVariables.podvalOcenka, loadData["Результаты выборочного обследования"]["Подвал"]["Оценка"], true);

    // Тех.подполье
    appVariables.techPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["Тех.подполье"]["Выявленные дефекты"];
    appVariables.techPodpoliePercent.value = loadData["Результаты выборочного обследования"]["Тех.подполье"]["% деф. части"];
    clickGenerator(appVariables.techPodpolieOcenka, loadData["Результаты выборочного обследования"]["Тех.подполье"]["Оценка"], true);

    // Тех.этаж
    appVariables.techEtajDefecty.value = loadData["Результаты выборочного обследования"]["Тех.этаж"]["Выявленные дефекты"];
    appVariables.techEtajPercent.value = loadData["Результаты выборочного обследования"]["Тех.этаж"]["% деф. части"];
    clickGenerator(appVariables.techEtajOcenka, loadData["Результаты выборочного обследования"]["Тех.этаж"]["Оценка"], true);

    // Гараж стоянка (подземный)
    appVariables.garageDefecty.value = loadData["Результаты выборочного обследования"]["Гараж стоянка (подземный)"]["Выявленные дефекты"];
    appVariables.garagePercent.value = loadData["Результаты выборочного обследования"]["Гараж стоянка (подземный)"]["% деф. части"];
    clickGenerator(appVariables.garageOcenka, loadData["Результаты выборочного обследования"]["Гараж стоянка (подземный)"]["Оценка"], true);

    // Места общего пользования
    // Вестибюли
    appVariables.mopVestibuliDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVestibuliName]["Выявленные дефекты"];
    appVariables.mopVestibuliPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVestibuliName]["% деф. части"];
    clickGenerator(appVariables.mopVestibuliOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVestibuliName]["Оценка"], true);

    // Крыльца
    appVariables.mopKrilcaDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopKrilcaName]["Выявленные дефекты"];
    appVariables.mopKrilcaPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopKrilcaName]["% деф. части"];
    clickGenerator(appVariables.mopKrilcaOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopKrilcaName]["Оценка"], true);

    // Пандусы наружные
    appVariables.mopPandusyNaruzhnieDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopPandusyNaruzhnieName]["Выявленные дефекты"];
    appVariables.mopPandusyNaruzhniePercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopPandusyNaruzhnieName]["% деф. части"];
    clickGenerator(appVariables.mopPandusyNaruzhnieOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopPandusyNaruzhnieName]["Оценка"], true);

    // Пандусы внутри-подъездные
    appVariables.mopPandusyVnutrennieDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopPandusyVnutrennieName]["Выявленные дефекты"];
    appVariables.mopPandusyVnutrenniePercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopPandusyVnutrennieName]["% деф. части"];
    clickGenerator(appVariables.mopPandusyVnutrennieOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopPandusyVnutrennieName]["Оценка"], true);

    // Сходы/съезды
    appVariables.mopShodySiezdyDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopShodySiezdyName]["Выявленные дефекты"];
    appVariables.mopShodySiezdyPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopShodySiezdyName]["% деф. части"];
    clickGenerator(appVariables.mopShodySiezdyOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopShodySiezdyName]["Оценка"], true);

    // Окна, двери
    appVariables.mopOknaDveriDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopOknaDveriName]["Выявленные дефекты"];
    appVariables.mopOknaDveriPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopOknaDveriName]["% деф. части"];
    clickGenerator(appVariables.mopOknaDveriOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopOknaDveriName]["Оценка"], true);

    // Внутренняя отделка помещений
    appVariables.mopVnOtdelkaPomeshDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVnOtdelkaPomeshName]["Выявленные дефекты"];
    appVariables.mopVnOtdelkaPomeshPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVnOtdelkaPomeshName]["% деф. части"];
    clickGenerator(appVariables.mopVnOtdelkaPomeshOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVnOtdelkaPomeshName]["Оценка"], true);

    // Все элементы
    appVariables.mopVseElementyDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVseElementyName]["Выявленные дефекты"];
    appVariables.mopVseElementyPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVseElementyName]["% деф. части"];
    clickGenerator(appVariables.mopVseElementyOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][appVariables.mopVseElementyName]["Оценка"], true);

    // Лестницы
    appVariables.lestnicyDefecty.value = loadData["Результаты выборочного обследования"]["Лестницы"]["Выявленные дефекты"];
    appVariables.lestnicyPercent.value = loadData["Результаты выборочного обследования"]["Лестницы"]["% деф. части"];
    clickGenerator(appVariables.lestnicyOcenka, loadData["Результаты выборочного обследования"]["Лестницы"]["Оценка"], true);

    // Перекрытия
    appVariables.perekrityaDefecty.value = loadData["Результаты выборочного обследования"]["Перекрытия"]["Выявленные дефекты"];
    appVariables.perekrityaPercent.value = loadData["Результаты выборочного обследования"]["Перекрытия"]["% деф. части"];
    clickGenerator(appVariables.perekrityaOcenka, loadData["Результаты выборочного обследования"]["Перекрытия"]["Оценка"], true);

    // Система отопления
    // Тех.подполье/тех.этаж
    appVariables.otopleniyeTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeTehPodpolieName]["Выявленные дефекты"];
    appVariables.otopleniyeTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeTehPodpolieName]["% деф. части"];
    clickGenerator(appVariables.otopleniyeTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeTehPodpolieName]["Оценка"], true);

    // Транзит питающий
    appVariables.otopleniyeTranzitPitaushDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeTranzitPitaushName]["Выявленные дефекты"];
    appVariables.otopleniyeTranzitPitaushPercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeTranzitPitaushName]["% деф. части"];
    clickGenerator(appVariables.otopleniyeTranzitPitaushOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeTranzitPitaushName]["Оценка"], true);

    // Чердак
    appVariables.otopleniyeCherdakDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeCherdakName]["Выявленные дефекты"];
    appVariables.otopleniyeCherdakPercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeCherdakName]["% деф. части"];
    clickGenerator(appVariables.otopleniyeCherdakOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeCherdakName]["Оценка"], true);

    // Этажи
    appVariables.otopleniyeEtajiDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeEtajiName]["Выявленные дефекты"];
    appVariables.otopleniyeEtajiPercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeEtajiName]["% деф. части"];
    clickGenerator(appVariables.otopleniyeEtajiOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.otopleniyeEtajiName]["Оценка"], true);

    // Вся система
    appVariables.vseOtopleniyeDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.vseOtopleniyeName]["Выявленные дефекты"];
    appVariables.vseOtopleniyePercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.vseOtopleniyeName]["% деф. части"];
    clickGenerator(appVariables.vseOtopleniyeOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][appVariables.vseOtopleniyeName]["Оценка"], true);

    // ГВС
    // Тех.подполье/тех.этаж
    appVariables.gvsTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsTehPodpolieName]["Выявленные дефекты"];
    appVariables.gvsTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsTehPodpolieName]["% деф. части"];
    clickGenerator(appVariables.gvsTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsTehPodpolieName]["Оценка"], true);

    // Транзит питающий
    appVariables.gvsTranzitPitaushDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsTranzitPitaushName]["Выявленные дефекты"];
    appVariables.gvsTranzitPitaushPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsTranzitPitaushName]["% деф. части"];
    clickGenerator(appVariables.gvsTranzitPitaushOcenka, loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsTranzitPitaushName]["Оценка"], true);

    // Чердак
    appVariables.gvsCherdakDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsCherdakName]["Выявленные дефекты"];
    appVariables.gvsCherdakPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsCherdakName]["% деф. части"];
    clickGenerator(appVariables.gvsCherdakOcenka, loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsCherdakName]["Оценка"], true);

    // Этажи
    appVariables.gvsEtajiDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsEtajiName]["Выявленные дефекты"];
    appVariables.gvsEtajiPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsEtajiName]["% деф. части"];
    clickGenerator(appVariables.gvsEtajiOcenka, loadData["Результаты выборочного обследования"]["ГВС"][appVariables.gvsEtajiName]["Оценка"], true);

    // Вся система
    appVariables.vseGvsDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.vseGvsName]["Выявленные дефекты"];
    appVariables.vseGvsPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][appVariables.vseGvsName]["% деф. части"];
    clickGenerator(appVariables.vseGvsOcenka, loadData["Результаты выборочного обследования"]["ГВС"][appVariables.vseGvsName]["Оценка"], true);

    // ХВС
    // Тех.подполье/тех.этаж
    appVariables.hvsTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsTehPodpolieName]["Выявленные дефекты"];
    appVariables.hvsTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsTehPodpolieName]["% деф. части"];
    clickGenerator(appVariables.hvsTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsTehPodpolieName]["Оценка"], true);

    // Транзит питающий
    appVariables.hvsTranzitPitaushDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsTranzitPitaushName]["Выявленные дефекты"];
    appVariables.hvsTranzitPitaushPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsTranzitPitaushName]["% деф. части"];
    clickGenerator(appVariables.hvsTranzitPitaushOcenka, loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsTranzitPitaushName]["Оценка"], true);

    // Этажи
    appVariables.hvsEtajiDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsEtajiName]["Выявленные дефекты"];
    appVariables.hvsEtajiPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsEtajiName]["% деф. части"];
    clickGenerator(appVariables.hvsEtajiOcenka, loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsEtajiName]["Оценка"], true);

    // Внутренний пожарный водопровод
    appVariables.hvsVnPozharProvodDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsVnPozharProvodName]["Выявленные дефекты"];
    appVariables.hvsVnPozharProvodPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsVnPozharProvodName]["% деф. части"];
    clickGenerator(appVariables.hvsVnPozharProvodOcenka, loadData["Результаты выборочного обследования"]["ХВС"][appVariables.hvsVnPozharProvodName]["Оценка"], true);

    // Вся система
    appVariables.vseHvsDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.vseHvsName]["Выявленные дефекты"];
    appVariables.vseHvsPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][appVariables.vseHvsName]["% деф. части"];
    clickGenerator(appVariables.vseHvsOcenka, loadData["Результаты выборочного обследования"]["ХВС"][appVariables.vseHvsName]["Оценка"], true);

    // Канализация
    // Тех.подполье/тех.этаж
    appVariables.kanalizaciaTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["Канализация"][appVariables.kanalizaciaTehPodpolieName]["Выявленные дефекты"];
    appVariables.kanalizaciaTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["Канализация"][appVariables.kanalizaciaTehPodpolieName]["% деф. части"];
    clickGenerator(appVariables.kanalizaciaTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["Канализация"][appVariables.kanalizaciaTehPodpolieName]["Оценка"], true);

    // Этажи
    appVariables.kanalizaciaEtajiDefecty.value = loadData["Результаты выборочного обследования"]["Канализация"][appVariables.kanalizaciaEtajiName]["Выявленные дефекты"];
    appVariables.kanalizaciaEtajiPercent.value = loadData["Результаты выборочного обследования"]["Канализация"][appVariables.kanalizaciaEtajiName]["% деф. части"];
    clickGenerator(appVariables.kanalizaciaEtajiOcenka, loadData["Результаты выборочного обследования"]["Канализация"][appVariables.kanalizaciaEtajiName]["Оценка"], true);

    // Вся система
    appVariables.vseKanalizaciaDefecty.value = loadData["Результаты выборочного обследования"]["Канализация"][appVariables.vseKanalizaciaName]["Выявленные дефекты"];
    appVariables.vseKanalizaciaPercent.value = loadData["Результаты выборочного обследования"]["Канализация"][appVariables.vseKanalizaciaName]["% деф. части"];
    clickGenerator(appVariables.vseKanalizaciaOcenka, loadData["Результаты выборочного обследования"]["Канализация"][appVariables.vseKanalizaciaName]["Оценка"], true);

    // Мусоропроводы
    appVariables.musoroprovodyDefecty.value = loadData["Результаты выборочного обследования"]["Мусоропроводы"]["Выявленные дефекты"];
    appVariables.musoroprovodyPercent.value = loadData["Результаты выборочного обследования"]["Мусоропроводы"]["% деф. части"];
    clickGenerator(appVariables.musoroprovodyOcenka, loadData["Результаты выборочного обследования"]["Мусоропроводы"]["Оценка"], true);

    // Связь с ОДС
    appVariables.odsDefecty.value = loadData["Результаты выборочного обследования"]["Связь с ОДС"]["Выявленные дефекты"];
    appVariables.odsPosledneeObsled.value = loadData["Результаты выборочного обследования"]["Связь с ОДС"]["№ и дата последнего обслед."];
    appVariables.odsOrganizacia.value = loadData["Результаты выборочного обследования"]["Связь с ОДС"]["Специализированная организация"];
    clickGenerator(appVariables.odsOcenka, loadData["Результаты выборочного обследования"]["Связь с ОДС"]["Оценка"], true);

    // Вентиляция
    appVariables.ventilaciaDefecty.value = loadData["Результаты выборочного обследования"]["Вентиляция"]["Выявленные дефекты"];
    appVariables.ventilaciaPosledneeObsled.value = loadData["Результаты выборочного обследования"]["Вентиляция"]["№ и дата последнего обслед."];
    appVariables.ventilaciaOrganizacia.value = loadData["Результаты выборочного обследования"]["Вентиляция"]["Специализированная организация"];
    clickGenerator(appVariables.ventilaciaOcenka, loadData["Результаты выборочного обследования"]["Вентиляция"]["Оценка"], true);

    // Система промывки и прочистки стволов мусоропроводов
    appVariables.musoroChistSistemaDefecty.value = loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["Выявленные дефекты"];
    appVariables.musoroChistSistemaPosledObsled.value = loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["№ и дата последнего обслед."];
    appVariables.musoroChistSistemaOrganizacia.value = loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["Специализированная организация"];
    clickGenerator(appVariables.musoroChistSistemaOcenka, loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["Оценка"], true);

    // ОЗДС (охранно-защитная дератизационная система)
    appVariables.ozdsDefecty.value = loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["Выявленные дефекты"];
    appVariables.ozdsPosledObsled.value = loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["№ и дата последнего обслед."];
    appVariables.ozdsOrganizacia.value = loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["Специализированная организация"];
    clickGenerator(appVariables.ozdsOcenka, loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["Оценка"], true);

    // Газоходы
    appVariables.gazohodyDefecty.value = loadData["Результаты выборочного обследования"]["Газоходы"]["Выявленные дефекты"];
    appVariables.gazohodyPosledObsled.value = loadData["Результаты выборочного обследования"]["Газоходы"]["№ и дата последнего обслед."];
    appVariables.gazohodyOrganizacia.value = loadData["Результаты выборочного обследования"]["Газоходы"]["Специализированная организация"];
    clickGenerator(appVariables.gazohodyOcenka, loadData["Результаты выборочного обследования"]["Газоходы"]["Оценка"], true);

    // Лифты
    appVariables.liftyDefecty.value = loadData["Результаты выборочного обследования"]["Лифты"]["Выявленные дефекты"];
    appVariables.liftyPosledObsled.value = loadData["Результаты выборочного обследования"]["Лифты"]["№ и дата последнего обслед."];
    appVariables.liftyOrganizacia.value = loadData["Результаты выборочного обследования"]["Лифты"]["Специализированная организация"];
    clickGenerator(appVariables.liftyOcenka, loadData["Результаты выборочного обследования"]["Лифты"]["Оценка"], true);

    // Подъёмное устройство для маломобильной группы населения
    appVariables.podyomnikDefecty.value = loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["Выявленные дефекты"];
    appVariables.podyomnikPosledObsled.value = loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["№ и дата последнего обслед."];
    appVariables.podyomnikOrganizacia.value = loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["Специализированная организация"];
    clickGenerator(appVariables.podyomnikOcenka, loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["Оценка"], true);

    // Устройство для автоматического опускания лифта
    appVariables.autoSpuskLiftDefecty.value = loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["Выявленные дефекты"];
    appVariables.autoSpuskLiftPosledObsled.value = loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["№ и дата последнего обслед."];
    appVariables.autoSpuskLiftOrganizacia.value = loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["Специализированная организация"];
    clickGenerator(appVariables.autoSpuskLiftOcenka, loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["Оценка"], true);

    // Система ЭС
    appVariables.systemEsDefecty.value = loadData["Результаты выборочного обследования"]["Система ЭС"]["Выявленные дефекты"];
    appVariables.systemEsPosledObsled.value = loadData["Результаты выборочного обследования"]["Система ЭС"]["№ и дата последнего обслед."];
    appVariables.systemEsOrganizacia.value = loadData["Результаты выборочного обследования"]["Система ЭС"]["Специализированная организация"];
    clickGenerator(appVariables.systemEsOcenka, loadData["Результаты выборочного обследования"]["Система ЭС"]["Оценка"], true);

    // ВКВ (второй кабельный ввод)
    appVariables.vkvDefecty.value = loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["Выявленные дефекты"];
    appVariables.vkvPosledObsled.value = loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["№ и дата последнего обслед."];
    appVariables.vkvOrganizacia.value = loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["Специализированная организация"];
    clickGenerator(appVariables.vkvOcenka, loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["Оценка"], true);

    // АВР (автоматическое включение резервного питания)
    appVariables.avrDefecty.value = loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["Выявленные дефекты"];
    appVariables.avrPosledObsled.value = loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["№ и дата последнего обслед."];
    appVariables.avrOrganizacia.value = loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["Специализированная организация"];
    clickGenerator(appVariables.avrOcenka, loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["Оценка"], true);

    // ППАиДУ
    appVariables.ppaiduDefecty.value = loadData["Результаты выборочного обследования"]["ППАиДУ"]["Выявленные дефекты"];
    appVariables.ppaiduPosledObsled.value = loadData["Результаты выборочного обследования"]["ППАиДУ"]["№ и дата последнего обслед."];
    appVariables.ppaiduOrganizacia.value = loadData["Результаты выборочного обследования"]["ППАиДУ"]["Специализированная организация"];
    clickGenerator(appVariables.ppaiduOcenka, loadData["Результаты выборочного обследования"]["ППАиДУ"]["Оценка"], true);

    // Система оповещения о пожаре
    appVariables.pozharOpoveshenDefecty.value = loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["Выявленные дефекты"];
    appVariables.pozharOpoveshenPosledObsled.value = loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["№ и дата последнего обслед."];
    appVariables.pozharOpoveshenOrganizacia.value = loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["Специализированная организация"];
    clickGenerator(appVariables.pozharOpoveshenOcenka, loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["Оценка"], true);

    // Система ГС
    appVariables.sistemaGsDefecty.value = loadData["Результаты выборочного обследования"]["Система ГС"]["Выявленные дефекты"];
    appVariables.sistemaGsPosledObsled.value = loadData["Результаты выборочного обследования"]["Система ГС"]["№ и дата последнего обслед."];
    appVariables.sistemaGsOrganizacia.value = loadData["Результаты выборочного обследования"]["Система ГС"]["Специализированная организация"];
    clickGenerator(appVariables.sistemaGsOcenka, loadData["Результаты выборочного обследования"]["Система ГС"]["Оценка"], true);

    // Система видеонаблюдения
    appVariables.sistemaVideonabDefecty.value = loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["Выявленные дефекты"];
    appVariables.sistemaVideonabPosledObsled.value = loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["№ и дата последнего обслед."];
    appVariables.sistemaVideonabOrganizacia.value = loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["Специализированная организация"];
    clickGenerator(appVariables.sistemaVideonabOcenka, loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["Оценка"], true);

    appVariables.dopolnitDannye.value = loadData["Результаты выборочного обследования"]["Дополнительные данные"];
    clickGenerator(appVariables.recomendatciiPoUtepleniuSten, loadData["Результаты выборочного обследования"]["Рекомендации по утеплению стен"], true);
    appVariables.recomendatciiPoDopRabotam.value = loadData["Выводы по результатам обследования"]["РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам"];

    // Подписывающие лица
    // for (let i = 1; i < appVariables.signatoriesRows.length; i++) {
    // 	if (!appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
    // 		continue;
    // 	}
    // 	appVariables[i]["licaOt"].value = loadData["Подписывающие лица"]["Представители от"][i];
    // 	appVariables[i]["LicaDoljnost"].value = loadData["Подписывающие лица"]["Должность и наименование организации"][i];
    // 	appVariables[i]["licaFio"].value = loadData["Подписывающие лица"]["ФИО должностного лица"][i];
    // }

    localStorage.setItem("DataLoaded", JSON.stringify({ address: loadData.address.address }));

    appVariables.pasteButton.textContent = "Вставлено";
    appVariables.pasteButton.classList.add("main__button_done");
    setTimeout(() => {
        appVariables.pasteButton.textContent = "Вставка отчета";
        appVariables.pasteButton.classList.remove("main__button_done");
    }, 1500);
}