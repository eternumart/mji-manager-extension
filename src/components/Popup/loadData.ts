import { clickGenerator } from "./clickGenerator";
import { searchAllInputs } from "./searchAllInputs";
import { setRepresentatives } from "./setRepresentatives";
import { buttonError } from "./buttonError";

export const loadData = () => {
    if (!window.appData.functions.loadData || window.appVariables.currentPage === "parser") {
        return;
    }
    // Находим все поля в отчете
    searchAllInputs();
    setRepresentatives();

    // Если страница не подходит для вставки - выдаем ошибку и выходим из функции
    if (!buttonError(window.appVariables.pasteButton, window.appVariables.currentPage, "main", "Вставка отчета")) {
        return;
    }

    // Если никаких данных в localStorage нет - выходим из функции
    if (localStorage.getItem("MJIDATA") === null) {
        window.appVariables.pasteButton.classList.add("main__button_error");
        window.appVariables.pasteButton.textContent = "Ничего не скопировано";
        setTimeout(() => {
            window.appVariables.pasteButton.textContent = "Вставка отчета";
            window.appVariables.pasteButton.classList.remove("main__button_error");
        }, 1500);
        return;
    }
    const loadData = JSON.parse(localStorage.getItem("MJIDATA")!);

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    // Кровля
    window.appVariables.krovlyaDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.krovlyaName]["Выявленные дефекты"];
    window.appVariables.krovlyaPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.krovlyaName]["% деф. части"];
    clickGenerator(window.appVariables.krovlyaOcenka, loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.krovlyaName]["Оценка"], true);

    // Свесы
    window.appVariables.svesyDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.svesyName]["Выявленные дефекты"];
    window.appVariables.svesyPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.svesyName]["% деф. части"];
    clickGenerator(window.appVariables.svesyOcenka, loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.svesyName]["Оценка"], true);

    // Стропильная система
    window.appVariables.stropilnayaSistemaDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.stropilnayaSistemaName]["Выявленные дефекты"];
    window.appVariables.stropilnayaSistemaPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.stropilnayaSistemaName]["% деф. части"];
    clickGenerator(window.appVariables.stropilnayaSistemaOcenka, loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.stropilnayaSistemaName]["Оценка"], true);

    // Чердак
    window.appVariables.cherdakDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.cherdakName]["Выявленные дефекты"];
    window.appVariables.cherdakPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.cherdakName]["% деф. части"];
    clickGenerator(window.appVariables.cherdakOcenka, loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.cherdakName]["Оценка"], true);

    // Покрытие ж/б
    window.appVariables.pokritieJBDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.pokritieJBName]["Выявленные дефекты"];
    window.appVariables.pokritieJBPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.pokritieJBName]["% деф. части"];
    clickGenerator(window.appVariables.pokritieJBOcenka, loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.pokritieJBName]["Оценка"], true);

    // Все элементы
    window.appVariables.vsyaKrishaDefecty.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.vsyaKrishaName]["Выявленные дефекты"];
    window.appVariables.vsyaKrishaPercent.value = loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.vsyaKrishaName]["% деф. части"];
    clickGenerator(window.appVariables.vsyaKrishaOcenka, loadData["Результаты выборочного обследования"]["Крыша"][window.appVariables.vsyaKrishaName]["Оценка"], true);

    // Водоотвод
    window.appVariables.vodootvodDefecty.value = loadData["Результаты выборочного обследования"]["Водоотвод"]["Выявленные дефекты"];
    window.appVariables.vodootvodPercent.value = loadData["Результаты выборочного обследования"]["Водоотвод"]["% деф. части"];
    clickGenerator(window.appVariables.vodootvodOcenka, loadData["Результаты выборочного обследования"]["Водоотвод"]["Оценка"], true);

    // Межпанельные стыки
    window.appVariables.majpanelnyeStykiDefecty.value = loadData["Результаты выборочного обследования"]["Межпанельные стыки"]["Выявленные дефекты"];
    window.appVariables.majpanelnyeStykiPercent.value = loadData["Результаты выборочного обследования"]["Межпанельные стыки"]["% деф. части"];
    clickGenerator(window.appVariables.majpanelnyeStykiOcenka, loadData["Результаты выборочного обследования"]["Межпанельные стыки"]["Оценка"], true);

    // Фасад
    window.appVariables.fasadDefecty.value = loadData["Результаты выборочного обследования"]["Фасад"]["Выявленные дефекты"];
    window.appVariables.fasadPercent.value = loadData["Результаты выборочного обследования"]["Фасад"]["% деф. части"];
    clickGenerator(window.appVariables.fasadOcenka, loadData["Результаты выборочного обследования"]["Фасад"]["Оценка"], true);

    // Балконы
    // Балконы
    window.appVariables.balkonyDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.balkonyName]["Выявленные дефекты"];
    window.appVariables.balkonyPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.balkonyName]["% деф. части"];
    clickGenerator(window.appVariables.balkonyOcenka, loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.balkonyName]["Оценка"], true);

    // Лоджии
    window.appVariables.lodjiiDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.lodjiiName]["Выявленные дефекты"];
    window.appVariables.lodjiiPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.lodjiiName]["% деф. части"];
    clickGenerator(window.appVariables.lodjiiOcenka, loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.lodjiiName]["Оценка"], true);

    // Козырьки
    window.appVariables.kozirkiDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.kozirkiName]["Выявленные дефекты"];
    window.appVariables.kozirkiPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.kozirkiName]["% деф. части"];
    clickGenerator(window.appVariables.kozirkiOcenka, loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.kozirkiName]["Оценка"], true);

    // Эркеры
    window.appVariables.erkeryDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.erkeryName]["Выявленные дефекты"];
    window.appVariables.erkeryPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.erkeryName]["% деф. части"];
    clickGenerator(window.appVariables.erkeryOcenka, loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.erkeryName]["Оценка"], true);

    // Все элементы
    window.appVariables.vseBalkonyDefecty.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.vseBalkonyName]["Выявленные дефекты"];
    window.appVariables.vseBalkonyPercent.value = loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.vseBalkonyName]["% деф. части"];
    clickGenerator(window.appVariables.vseBalkonyOcenka, loadData["Результаты выборочного обследования"]["Балконы"][window.appVariables.vseBalkonyName]["Оценка"], true);

    // Стены
    window.appVariables.stenyDefecty.value = loadData["Результаты выборочного обследования"]["Стены"]["Выявленные дефекты"];
    window.appVariables.stenyPercent.value = loadData["Результаты выборочного обследования"]["Стены"]["% деф. части"];
    clickGenerator(window.appVariables.stenyOcenka, loadData["Результаты выборочного обследования"]["Стены"]["Оценка"], true);

    // Подвал
    window.appVariables.podvalDefecty.value = loadData["Результаты выборочного обследования"]["Подвал"]["Выявленные дефекты"];
    window.appVariables.podvalPercent.value = loadData["Результаты выборочного обследования"]["Подвал"]["% деф. части"];
    clickGenerator(window.appVariables.podvalOcenka, loadData["Результаты выборочного обследования"]["Подвал"]["Оценка"], true);

    // Тех.подполье
    window.appVariables.techPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["Тех.подполье"]["Выявленные дефекты"];
    window.appVariables.techPodpoliePercent.value = loadData["Результаты выборочного обследования"]["Тех.подполье"]["% деф. части"];
    clickGenerator(window.appVariables.techPodpolieOcenka, loadData["Результаты выборочного обследования"]["Тех.подполье"]["Оценка"], true);

    // Тех.этаж
    window.appVariables.techEtajDefecty.value = loadData["Результаты выборочного обследования"]["Тех.этаж"]["Выявленные дефекты"];
    window.appVariables.techEtajPercent.value = loadData["Результаты выборочного обследования"]["Тех.этаж"]["% деф. части"];
    clickGenerator(window.appVariables.techEtajOcenka, loadData["Результаты выборочного обследования"]["Тех.этаж"]["Оценка"], true);

    // Гараж стоянка (подземный)
    window.appVariables.garageDefecty.value = loadData["Результаты выборочного обследования"]["Гараж стоянка (подземный)"]["Выявленные дефекты"];
    window.appVariables.garagePercent.value = loadData["Результаты выборочного обследования"]["Гараж стоянка (подземный)"]["% деф. части"];
    clickGenerator(window.appVariables.garageOcenka, loadData["Результаты выборочного обследования"]["Гараж стоянка (подземный)"]["Оценка"], true);

    // Места общего пользования
    // Вестибюли
    window.appVariables.mopVestibuliDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVestibuliName]["Выявленные дефекты"];
    window.appVariables.mopVestibuliPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVestibuliName]["% деф. части"];
    clickGenerator(window.appVariables.mopVestibuliOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVestibuliName]["Оценка"], true);

    // Крыльца
    window.appVariables.mopKrilcaDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopKrilcaName]["Выявленные дефекты"];
    window.appVariables.mopKrilcaPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopKrilcaName]["% деф. части"];
    clickGenerator(window.appVariables.mopKrilcaOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopKrilcaName]["Оценка"], true);

    // Пандусы наружные
    window.appVariables.mopPandusyNaruzhnieDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopPandusyNaruzhnieName]["Выявленные дефекты"];
    window.appVariables.mopPandusyNaruzhniePercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopPandusyNaruzhnieName]["% деф. части"];
    clickGenerator(window.appVariables.mopPandusyNaruzhnieOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopPandusyNaruzhnieName]["Оценка"], true);

    // Пандусы внутри-подъездные
    window.appVariables.mopPandusyVnutrennieDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopPandusyVnutrennieName]["Выявленные дефекты"];
    window.appVariables.mopPandusyVnutrenniePercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopPandusyVnutrennieName]["% деф. части"];
    clickGenerator(window.appVariables.mopPandusyVnutrennieOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopPandusyVnutrennieName]["Оценка"], true);

    // Сходы/съезды
    window.appVariables.mopShodySiezdyDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopShodySiezdyName]["Выявленные дефекты"];
    window.appVariables.mopShodySiezdyPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopShodySiezdyName]["% деф. части"];
    clickGenerator(window.appVariables.mopShodySiezdyOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopShodySiezdyName]["Оценка"], true);

    // Окна, двери
    window.appVariables.mopOknaDveriDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopOknaDveriName]["Выявленные дефекты"];
    window.appVariables.mopOknaDveriPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopOknaDveriName]["% деф. части"];
    clickGenerator(window.appVariables.mopOknaDveriOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopOknaDveriName]["Оценка"], true);

    // Внутренняя отделка помещений
    window.appVariables.mopVnOtdelkaPomeshDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVnOtdelkaPomeshName]["Выявленные дефекты"];
    window.appVariables.mopVnOtdelkaPomeshPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVnOtdelkaPomeshName]["% деф. части"];
    clickGenerator(window.appVariables.mopVnOtdelkaPomeshOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVnOtdelkaPomeshName]["Оценка"], true);

    // Все элементы
    window.appVariables.mopVseElementyDefecty.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVseElementyName]["Выявленные дефекты"];
    window.appVariables.mopVseElementyPercent.value = loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVseElementyName]["% деф. части"];
    clickGenerator(window.appVariables.mopVseElementyOcenka, loadData["Результаты выборочного обследования"]["Места общего пользования"][window.appVariables.mopVseElementyName]["Оценка"], true);

    // Лестницы
    window.appVariables.lestnicyDefecty.value = loadData["Результаты выборочного обследования"]["Лестницы"]["Выявленные дефекты"];
    window.appVariables.lestnicyPercent.value = loadData["Результаты выборочного обследования"]["Лестницы"]["% деф. части"];
    clickGenerator(window.appVariables.lestnicyOcenka, loadData["Результаты выборочного обследования"]["Лестницы"]["Оценка"], true);

    // Перекрытия
    window.appVariables.perekrityaDefecty.value = loadData["Результаты выборочного обследования"]["Перекрытия"]["Выявленные дефекты"];
    window.appVariables.perekrityaPercent.value = loadData["Результаты выборочного обследования"]["Перекрытия"]["% деф. части"];
    clickGenerator(window.appVariables.perekrityaOcenka, loadData["Результаты выборочного обследования"]["Перекрытия"]["Оценка"], true);

    // Система отопления
    // Тех.подполье/тех.этаж
    window.appVariables.otopleniyeTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeTehPodpolieName]["Выявленные дефекты"];
    window.appVariables.otopleniyeTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeTehPodpolieName]["% деф. части"];
    clickGenerator(window.appVariables.otopleniyeTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeTehPodpolieName]["Оценка"], true);

    // Транзит питающий
    window.appVariables.otopleniyeTranzitPitaushDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeTranzitPitaushName]["Выявленные дефекты"];
    window.appVariables.otopleniyeTranzitPitaushPercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeTranzitPitaushName]["% деф. части"];
    clickGenerator(window.appVariables.otopleniyeTranzitPitaushOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeTranzitPitaushName]["Оценка"], true);

    // Чердак
    window.appVariables.otopleniyeCherdakDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeCherdakName]["Выявленные дефекты"];
    window.appVariables.otopleniyeCherdakPercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeCherdakName]["% деф. части"];
    clickGenerator(window.appVariables.otopleniyeCherdakOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeCherdakName]["Оценка"], true);

    // Этажи
    window.appVariables.otopleniyeEtajiDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeEtajiName]["Выявленные дефекты"];
    window.appVariables.otopleniyeEtajiPercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeEtajiName]["% деф. части"];
    clickGenerator(window.appVariables.otopleniyeEtajiOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.otopleniyeEtajiName]["Оценка"], true);

    // Вся система
    window.appVariables.vseOtopleniyeDefecty.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.vseOtopleniyeName]["Выявленные дефекты"];
    window.appVariables.vseOtopleniyePercent.value = loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.vseOtopleniyeName]["% деф. части"];
    clickGenerator(window.appVariables.vseOtopleniyeOcenka, loadData["Результаты выборочного обследования"]["Система отопления"][window.appVariables.vseOtopleniyeName]["Оценка"], true);

    // ГВС
    // Тех.подполье/тех.этаж
    window.appVariables.gvsTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsTehPodpolieName]["Выявленные дефекты"];
    window.appVariables.gvsTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsTehPodpolieName]["% деф. части"];
    clickGenerator(window.appVariables.gvsTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsTehPodpolieName]["Оценка"], true);

    // Транзит питающий
    window.appVariables.gvsTranzitPitaushDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsTranzitPitaushName]["Выявленные дефекты"];
    window.appVariables.gvsTranzitPitaushPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsTranzitPitaushName]["% деф. части"];
    clickGenerator(window.appVariables.gvsTranzitPitaushOcenka, loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsTranzitPitaushName]["Оценка"], true);

    // Чердак
    window.appVariables.gvsCherdakDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsCherdakName]["Выявленные дефекты"];
    window.appVariables.gvsCherdakPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsCherdakName]["% деф. части"];
    clickGenerator(window.appVariables.gvsCherdakOcenka, loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsCherdakName]["Оценка"], true);

    // Этажи
    window.appVariables.gvsEtajiDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsEtajiName]["Выявленные дефекты"];
    window.appVariables.gvsEtajiPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsEtajiName]["% деф. части"];
    clickGenerator(window.appVariables.gvsEtajiOcenka, loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.gvsEtajiName]["Оценка"], true);

    // Вся система
    window.appVariables.vseGvsDefecty.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.vseGvsName]["Выявленные дефекты"];
    window.appVariables.vseGvsPercent.value = loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.vseGvsName]["% деф. части"];
    clickGenerator(window.appVariables.vseGvsOcenka, loadData["Результаты выборочного обследования"]["ГВС"][window.appVariables.vseGvsName]["Оценка"], true);

    // ХВС
    // Тех.подполье/тех.этаж
    window.appVariables.hvsTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsTehPodpolieName]["Выявленные дефекты"];
    window.appVariables.hvsTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsTehPodpolieName]["% деф. части"];
    clickGenerator(window.appVariables.hvsTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsTehPodpolieName]["Оценка"], true);

    // Транзит питающий
    window.appVariables.hvsTranzitPitaushDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsTranzitPitaushName]["Выявленные дефекты"];
    window.appVariables.hvsTranzitPitaushPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsTranzitPitaushName]["% деф. части"];
    clickGenerator(window.appVariables.hvsTranzitPitaushOcenka, loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsTranzitPitaushName]["Оценка"], true);

    // Этажи
    window.appVariables.hvsEtajiDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsEtajiName]["Выявленные дефекты"];
    window.appVariables.hvsEtajiPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsEtajiName]["% деф. части"];
    clickGenerator(window.appVariables.hvsEtajiOcenka, loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsEtajiName]["Оценка"], true);

    // Внутренний пожарный водопровод
    window.appVariables.hvsVnPozharProvodDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsVnPozharProvodName]["Выявленные дефекты"];
    window.appVariables.hvsVnPozharProvodPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsVnPozharProvodName]["% деф. части"];
    clickGenerator(window.appVariables.hvsVnPozharProvodOcenka, loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.hvsVnPozharProvodName]["Оценка"], true);

    // Вся система
    window.appVariables.vseHvsDefecty.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.vseHvsName]["Выявленные дефекты"];
    window.appVariables.vseHvsPercent.value = loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.vseHvsName]["% деф. части"];
    clickGenerator(window.appVariables.vseHvsOcenka, loadData["Результаты выборочного обследования"]["ХВС"][window.appVariables.vseHvsName]["Оценка"], true);

    // Канализация
    // Тех.подполье/тех.этаж
    window.appVariables.kanalizaciaTehPodpolieDefecty.value = loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.kanalizaciaTehPodpolieName]["Выявленные дефекты"];
    window.appVariables.kanalizaciaTehPodpoliePercent.value = loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.kanalizaciaTehPodpolieName]["% деф. части"];
    clickGenerator(window.appVariables.kanalizaciaTehPodpolieOcenka, loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.kanalizaciaTehPodpolieName]["Оценка"], true);

    // Этажи
    window.appVariables.kanalizaciaEtajiDefecty.value = loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.kanalizaciaEtajiName]["Выявленные дефекты"];
    window.appVariables.kanalizaciaEtajiPercent.value = loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.kanalizaciaEtajiName]["% деф. части"];
    clickGenerator(window.appVariables.kanalizaciaEtajiOcenka, loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.kanalizaciaEtajiName]["Оценка"], true);

    // Вся система
    window.appVariables.vseKanalizaciaDefecty.value = loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.vseKanalizaciaName]["Выявленные дефекты"];
    window.appVariables.vseKanalizaciaPercent.value = loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.vseKanalizaciaName]["% деф. части"];
    clickGenerator(window.appVariables.vseKanalizaciaOcenka, loadData["Результаты выборочного обследования"]["Канализация"][window.appVariables.vseKanalizaciaName]["Оценка"], true);

    // Мусоропроводы
    window.appVariables.musoroprovodyDefecty.value = loadData["Результаты выборочного обследования"]["Мусоропроводы"]["Выявленные дефекты"];
    window.appVariables.musoroprovodyPercent.value = loadData["Результаты выборочного обследования"]["Мусоропроводы"]["% деф. части"];
    clickGenerator(window.appVariables.musoroprovodyOcenka, loadData["Результаты выборочного обследования"]["Мусоропроводы"]["Оценка"], true);

    // Связь с ОДС
    window.appVariables.odsDefecty.value = loadData["Результаты выборочного обследования"]["Связь с ОДС"]["Выявленные дефекты"];
    window.appVariables.odsPosledneeObsled.value = loadData["Результаты выборочного обследования"]["Связь с ОДС"]["№ и дата последнего обслед."];
    window.appVariables.odsOrganizacia.value = loadData["Результаты выборочного обследования"]["Связь с ОДС"]["Специализированная организация"];
    clickGenerator(window.appVariables.odsOcenka, loadData["Результаты выборочного обследования"]["Связь с ОДС"]["Оценка"], true);

    // Вентиляция
    window.appVariables.ventilaciaDefecty.value = loadData["Результаты выборочного обследования"]["Вентиляция"]["Выявленные дефекты"];
    window.appVariables.ventilaciaPosledneeObsled.value = loadData["Результаты выборочного обследования"]["Вентиляция"]["№ и дата последнего обслед."];
    window.appVariables.ventilaciaOrganizacia.value = loadData["Результаты выборочного обследования"]["Вентиляция"]["Специализированная организация"];
    clickGenerator(window.appVariables.ventilaciaOcenka, loadData["Результаты выборочного обследования"]["Вентиляция"]["Оценка"], true);

    // Система промывки и прочистки стволов мусоропроводов
    window.appVariables.musoroChistSistemaDefecty.value = loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["Выявленные дефекты"];
    window.appVariables.musoroChistSistemaPosledObsled.value = loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["№ и дата последнего обслед."];
    window.appVariables.musoroChistSistemaOrganizacia.value = loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["Специализированная организация"];
    clickGenerator(window.appVariables.musoroChistSistemaOcenka, loadData["Результаты выборочного обследования"]["Система промывки и прочистки стволов мусоропроводов"]["Оценка"], true);

    // ОЗДС (охранно-защитная дератизационная система)
    window.appVariables.ozdsDefecty.value = loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["Выявленные дефекты"];
    window.appVariables.ozdsPosledObsled.value = loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["№ и дата последнего обслед."];
    window.appVariables.ozdsOrganizacia.value = loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["Специализированная организация"];
    clickGenerator(window.appVariables.ozdsOcenka, loadData["Результаты выборочного обследования"]["ОЗДС (охранно-защитная дератизационная система)"]["Оценка"], true);

    // Газоходы
    window.appVariables.gazohodyDefecty.value = loadData["Результаты выборочного обследования"]["Газоходы"]["Выявленные дефекты"];
    window.appVariables.gazohodyPosledObsled.value = loadData["Результаты выборочного обследования"]["Газоходы"]["№ и дата последнего обслед."];
    window.appVariables.gazohodyOrganizacia.value = loadData["Результаты выборочного обследования"]["Газоходы"]["Специализированная организация"];
    clickGenerator(window.appVariables.gazohodyOcenka, loadData["Результаты выборочного обследования"]["Газоходы"]["Оценка"], true);

    // Лифты
    window.appVariables.liftyDefecty.value = loadData["Результаты выборочного обследования"]["Лифты"]["Выявленные дефекты"];
    window.appVariables.liftyPosledObsled.value = loadData["Результаты выборочного обследования"]["Лифты"]["№ и дата последнего обслед."];
    window.appVariables.liftyOrganizacia.value = loadData["Результаты выборочного обследования"]["Лифты"]["Специализированная организация"];
    clickGenerator(window.appVariables.liftyOcenka, loadData["Результаты выборочного обследования"]["Лифты"]["Оценка"], true);

    // Подъёмное устройство для маломобильной группы населения
    window.appVariables.podyomnikDefecty.value = loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["Выявленные дефекты"];
    window.appVariables.podyomnikPosledObsled.value = loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["№ и дата последнего обслед."];
    window.appVariables.podyomnikOrganizacia.value = loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["Специализированная организация"];
    clickGenerator(window.appVariables.podyomnikOcenka, loadData["Результаты выборочного обследования"]["Подъёмное устройство для маломобильной группы населения"]["Оценка"], true);

    // Устройство для автоматического опускания лифта
    window.appVariables.autoSpuskLiftDefecty.value = loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["Выявленные дефекты"];
    window.appVariables.autoSpuskLiftPosledObsled.value = loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["№ и дата последнего обслед."];
    window.appVariables.autoSpuskLiftOrganizacia.value = loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["Специализированная организация"];
    clickGenerator(window.appVariables.autoSpuskLiftOcenka, loadData["Результаты выборочного обследования"]["Устройство для автоматического опускания лифта"]["Оценка"], true);

    // Система ЭС
    window.appVariables.systemEsDefecty.value = loadData["Результаты выборочного обследования"]["Система ЭС"]["Выявленные дефекты"];
    window.appVariables.systemEsPosledObsled.value = loadData["Результаты выборочного обследования"]["Система ЭС"]["№ и дата последнего обслед."];
    window.appVariables.systemEsOrganizacia.value = loadData["Результаты выборочного обследования"]["Система ЭС"]["Специализированная организация"];
    clickGenerator(window.appVariables.systemEsOcenka, loadData["Результаты выборочного обследования"]["Система ЭС"]["Оценка"], true);

    // ВКВ (второй кабельный ввод)
    window.appVariables.vkvDefecty.value = loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["Выявленные дефекты"];
    window.appVariables.vkvPosledObsled.value = loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["№ и дата последнего обслед."];
    window.appVariables.vkvOrganizacia.value = loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["Специализированная организация"];
    clickGenerator(window.appVariables.vkvOcenka, loadData["Результаты выборочного обследования"]["ВКВ (второй кабельный ввод)"]["Оценка"], true);

    // АВР (автоматическое включение резервного питания)
    window.appVariables.avrDefecty.value = loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["Выявленные дефекты"];
    window.appVariables.avrPosledObsled.value = loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["№ и дата последнего обслед."];
    window.appVariables.avrOrganizacia.value = loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["Специализированная организация"];
    clickGenerator(window.appVariables.avrOcenka, loadData["Результаты выборочного обследования"]["АВР (автоматическое включение резервного питания)"]["Оценка"], true);

    // ППАиДУ
    window.appVariables.ppaiduDefecty.value = loadData["Результаты выборочного обследования"]["ППАиДУ"]["Выявленные дефекты"];
    window.appVariables.ppaiduPosledObsled.value = loadData["Результаты выборочного обследования"]["ППАиДУ"]["№ и дата последнего обслед."];
    window.appVariables.ppaiduOrganizacia.value = loadData["Результаты выборочного обследования"]["ППАиДУ"]["Специализированная организация"];
    clickGenerator(window.appVariables.ppaiduOcenka, loadData["Результаты выборочного обследования"]["ППАиДУ"]["Оценка"], true);

    // Система оповещения о пожаре
    window.appVariables.pozharOpoveshenDefecty.value = loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["Выявленные дефекты"];
    window.appVariables.pozharOpoveshenPosledObsled.value = loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["№ и дата последнего обслед."];
    window.appVariables.pozharOpoveshenOrganizacia.value = loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["Специализированная организация"];
    clickGenerator(window.appVariables.pozharOpoveshenOcenka, loadData["Результаты выборочного обследования"]["Система оповещения о пожаре"]["Оценка"], true);

    // Система ГС
    window.appVariables.sistemaGsDefecty.value = loadData["Результаты выборочного обследования"]["Система ГС"]["Выявленные дефекты"];
    window.appVariables.sistemaGsPosledObsled.value = loadData["Результаты выборочного обследования"]["Система ГС"]["№ и дата последнего обслед."];
    window.appVariables.sistemaGsOrganizacia.value = loadData["Результаты выборочного обследования"]["Система ГС"]["Специализированная организация"];
    clickGenerator(window.appVariables.sistemaGsOcenka, loadData["Результаты выборочного обследования"]["Система ГС"]["Оценка"], true);

    // Система видеонаблюдения
    window.appVariables.sistemaVideonabDefecty.value = loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["Выявленные дефекты"];
    window.appVariables.sistemaVideonabPosledObsled.value = loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["№ и дата последнего обслед."];
    window.appVariables.sistemaVideonabOrganizacia.value = loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["Специализированная организация"];
    clickGenerator(window.appVariables.sistemaVideonabOcenka, loadData["Результаты выборочного обследования"]["Система видеонаблюдения"]["Оценка"], true);

    window.appVariables.dopolnitDannye.value = loadData["Результаты выборочного обследования"]["Дополнительные данные"];
    clickGenerator(window.appVariables.recomendatciiPoUtepleniuSten, loadData["Результаты выборочного обследования"]["Рекомендации по утеплению стен"], true);
    window.appVariables.recomendatciiPoDopRabotam.value = loadData["Выводы по результатам обследования"]["РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам"];

    // Подписывающие лица
    // for (let i = 1; i < window.appVariables.signatoriesRows.length; i++) {
    // 	if (!window.appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
    // 		continue;
    // 	}
    // 	window.appVariables[i]["licaOt"].value = loadData["Подписывающие лица"]["Представители от"][i];
    // 	window.appVariables[i]["LicaDoljnost"].value = loadData["Подписывающие лица"]["Должность и наименование организации"][i];
    // 	window.appVariables[i]["licaFio"].value = loadData["Подписывающие лица"]["ФИО должностного лица"][i];
    // }

    localStorage.setItem("DataLoaded", JSON.stringify({ address: loadData.address.address }));

    window.appVariables.pasteButton.textContent = "Вставлено";
    window.appVariables.pasteButton.classList.add("main__button_done");
    setTimeout(() => {
        window.appVariables.pasteButton.textContent = "Вставка отчета";
        window.appVariables.pasteButton.classList.remove("main__button_done");
    }, 1500);
}