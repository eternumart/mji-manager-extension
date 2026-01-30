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

    if (!window.appVariables.pasteButton) return;

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
    let loadData: any;
    try {
        loadData = JSON.parse(localStorage.getItem("MJIDATA")!);
    } catch {
        window.appVariables.pasteButton.classList.add("main__button_error");
        window.appVariables.pasteButton.textContent = "Ошибка данных";
        setTimeout(() => {
            window.appVariables.pasteButton.textContent = "Вставка отчета";
            window.appVariables.pasteButton.classList.remove("main__button_error");
        }, 1500);
        return;
    }
    const rez = loadData["Результаты выборочного обследования"] ?? {};
    const vyvody = loadData["Выводы по результатам обследования"] ?? {};
    const setVal = (el: HTMLInputElement | HTMLTextAreaElement | null | undefined, v: string) => {
        if (el) el.value = (v ?? "");
    };

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    // Кровля
    setVal(window.appVariables.krovlyaDefecty, rez["Крыша"]?.[window.appVariables.krovlyaName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.krovlyaPercent, rez["Крыша"]?.[window.appVariables.krovlyaName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.krovlyaOcenka, rez["Крыша"]?.[window.appVariables.krovlyaName]?.["Оценка"] ?? "-", true);

    // Свесы
    setVal(window.appVariables.svesyDefecty, rez["Крыша"]?.[window.appVariables.svesyName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.svesyPercent, rez["Крыша"]?.[window.appVariables.svesyName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.svesyOcenka, rez["Крыша"]?.[window.appVariables.svesyName]?.["Оценка"] ?? "-", true);

    // Стропильная система
    setVal(window.appVariables.stropilnayaSistemaDefecty, rez["Крыша"]?.[window.appVariables.stropilnayaSistemaName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.stropilnayaSistemaPercent, rez["Крыша"]?.[window.appVariables.stropilnayaSistemaName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.stropilnayaSistemaOcenka, rez["Крыша"]?.[window.appVariables.stropilnayaSistemaName]?.["Оценка"] ?? "-", true);

    // Чердак
    setVal(window.appVariables.cherdakDefecty, rez["Крыша"]?.[window.appVariables.cherdakName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.cherdakPercent, rez["Крыша"]?.[window.appVariables.cherdakName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.cherdakOcenka, rez["Крыша"]?.[window.appVariables.cherdakName]?.["Оценка"] ?? "-", true);

    // Покрытие ж/б
    setVal(window.appVariables.pokritieJBDefecty, rez["Крыша"]?.[window.appVariables.pokritieJBName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.pokritieJBPercent, rez["Крыша"]?.[window.appVariables.pokritieJBName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.pokritieJBOcenka, rez["Крыша"]?.[window.appVariables.pokritieJBName]?.["Оценка"] ?? "-", true);

    // Все элементы
    setVal(window.appVariables.vsyaKrishaDefecty, rez["Крыша"]?.[window.appVariables.vsyaKrishaName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vsyaKrishaPercent, rez["Крыша"]?.[window.appVariables.vsyaKrishaName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vsyaKrishaOcenka, rez["Крыша"]?.[window.appVariables.vsyaKrishaName]?.["Оценка"] ?? "-", true);

    // Водоотвод
    setVal(window.appVariables.vodootvodDefecty, rez["Водоотвод"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vodootvodPercent, rez["Водоотвод"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vodootvodOcenka, rez["Водоотвод"]?.["Оценка"] ?? "-", true);

    // Межпанельные стыки
    setVal(window.appVariables.majpanelnyeStykiDefecty, rez["Межпанельные стыки"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.majpanelnyeStykiPercent, rez["Межпанельные стыки"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.majpanelnyeStykiOcenka, rez["Межпанельные стыки"]?.["Оценка"] ?? "-", true);

    // Фасад
    setVal(window.appVariables.fasadDefecty, rez["Фасад"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.fasadPercent, rez["Фасад"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.fasadOcenka, rez["Фасад"]?.["Оценка"] ?? "-", true);

    // Балконы
    // Балконы
    setVal(window.appVariables.balkonyDefecty, rez["Балконы"]?.[window.appVariables.balkonyName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.balkonyPercent, rez["Балконы"]?.[window.appVariables.balkonyName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.balkonyOcenka, rez["Балконы"]?.[window.appVariables.balkonyName]?.["Оценка"] ?? "-", true);

    // Лоджии
    setVal(window.appVariables.lodjiiDefecty, rez["Балконы"]?.[window.appVariables.lodjiiName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.lodjiiPercent, rez["Балконы"]?.[window.appVariables.lodjiiName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.lodjiiOcenka, rez["Балконы"]?.[window.appVariables.lodjiiName]?.["Оценка"] ?? "-", true);

    // Козырьки
    setVal(window.appVariables.kozirkiDefecty, rez["Балконы"]?.[window.appVariables.kozirkiName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.kozirkiPercent, rez["Балконы"]?.[window.appVariables.kozirkiName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.kozirkiOcenka, rez["Балконы"]?.[window.appVariables.kozirkiName]?.["Оценка"] ?? "-", true);

    // Эркеры
    setVal(window.appVariables.erkeryDefecty, rez["Балконы"]?.[window.appVariables.erkeryName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.erkeryPercent, rez["Балконы"]?.[window.appVariables.erkeryName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.erkeryOcenka, rez["Балконы"]?.[window.appVariables.erkeryName]?.["Оценка"] ?? "-", true);

    // Все элементы
    setVal(window.appVariables.vseBalkonyDefecty, rez["Балконы"]?.[window.appVariables.vseBalkonyName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vseBalkonyPercent, rez["Балконы"]?.[window.appVariables.vseBalkonyName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vseBalkonyOcenka, rez["Балконы"]?.[window.appVariables.vseBalkonyName]?.["Оценка"] ?? "-", true);

    // Стены
    setVal(window.appVariables.stenyDefecty, rez["Стены"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.stenyPercent, rez["Стены"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.stenyOcenka, rez["Стены"]?.["Оценка"] ?? "-", true);

    // Подвал
    setVal(window.appVariables.podvalDefecty, rez["Подвал"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.podvalPercent, rez["Подвал"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.podvalOcenka, rez["Подвал"]?.["Оценка"] ?? "-", true);

    // Тех.подполье
    setVal(window.appVariables.techPodpolieDefecty, rez["Тех.подполье"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.techPodpoliePercent, rez["Тех.подполье"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.techPodpolieOcenka, rez["Тех.подполье"]?.["Оценка"] ?? "-", true);

    // Тех.этаж
    setVal(window.appVariables.techEtajDefecty, rez["Тех.этаж"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.techEtajPercent, rez["Тех.этаж"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.techEtajOcenka, rez["Тех.этаж"]?.["Оценка"] ?? "-", true);

    // Гараж стоянка (подземный)
    setVal(window.appVariables.garageDefecty, rez["Гараж стоянка (подземный)"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.garagePercent, rez["Гараж стоянка (подземный)"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.garageOcenka, rez["Гараж стоянка (подземный)"]?.["Оценка"] ?? "-", true);

    // Места общего пользования
    const mop = rez["Места общего пользования"];
    // Вестибюли
    setVal(window.appVariables.mopVestibuliDefecty, mop?.[window.appVariables.mopVestibuliName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopVestibuliPercent, mop?.[window.appVariables.mopVestibuliName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopVestibuliOcenka, mop?.[window.appVariables.mopVestibuliName]?.["Оценка"] ?? "-", true);

    // Крыльца
    setVal(window.appVariables.mopKrilcaDefecty, mop?.[window.appVariables.mopKrilcaName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopKrilcaPercent, mop?.[window.appVariables.mopKrilcaName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopKrilcaOcenka, mop?.[window.appVariables.mopKrilcaName]?.["Оценка"] ?? "-", true);

    // Пандусы наружные
    setVal(window.appVariables.mopPandusyNaruzhnieDefecty, mop?.[window.appVariables.mopPandusyNaruzhnieName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopPandusyNaruzhniePercent, mop?.[window.appVariables.mopPandusyNaruzhnieName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopPandusyNaruzhnieOcenka, mop?.[window.appVariables.mopPandusyNaruzhnieName]?.["Оценка"] ?? "-", true);

    // Пандусы внутри-подъездные
    setVal(window.appVariables.mopPandusyVnutrennieDefecty, mop?.[window.appVariables.mopPandusyVnutrennieName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopPandusyVnutrenniePercent, mop?.[window.appVariables.mopPandusyVnutrennieName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopPandusyVnutrennieOcenka, mop?.[window.appVariables.mopPandusyVnutrennieName]?.["Оценка"] ?? "-", true);

    // Сходы/съезды
    setVal(window.appVariables.mopShodySiezdyDefecty, mop?.[window.appVariables.mopShodySiezdyName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopShodySiezdyPercent, mop?.[window.appVariables.mopShodySiezdyName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopShodySiezdyOcenka, mop?.[window.appVariables.mopShodySiezdyName]?.["Оценка"] ?? "-", true);

    // Окна, двери
    setVal(window.appVariables.mopOknaDveriDefecty, mop?.[window.appVariables.mopOknaDveriName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopOknaDveriPercent, mop?.[window.appVariables.mopOknaDveriName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopOknaDveriOcenka, mop?.[window.appVariables.mopOknaDveriName]?.["Оценка"] ?? "-", true);

    // Внутренняя отделка помещений
    setVal(window.appVariables.mopVnOtdelkaPomeshDefecty, mop?.[window.appVariables.mopVnOtdelkaPomeshName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopVnOtdelkaPomeshPercent, mop?.[window.appVariables.mopVnOtdelkaPomeshName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopVnOtdelkaPomeshOcenka, mop?.[window.appVariables.mopVnOtdelkaPomeshName]?.["Оценка"] ?? "-", true);

    // Все элементы
    setVal(window.appVariables.mopVseElementyDefecty, mop?.[window.appVariables.mopVseElementyName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.mopVseElementyPercent, mop?.[window.appVariables.mopVseElementyName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.mopVseElementyOcenka, mop?.[window.appVariables.mopVseElementyName]?.["Оценка"] ?? "-", true);

    // Лестницы
    setVal(window.appVariables.lestnicyDefecty, rez["Лестницы"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.lestnicyPercent, rez["Лестницы"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.lestnicyOcenka, rez["Лестницы"]?.["Оценка"] ?? "-", true);

    // Перекрытия
    setVal(window.appVariables.perekrityaDefecty, rez["Перекрытия"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.perekrityaPercent, rez["Перекрытия"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.perekrityaOcenka, rez["Перекрытия"]?.["Оценка"] ?? "-", true);

    // Система отопления
    const otop = rez["Система отопления"];
    setVal(window.appVariables.otopleniyeTehPodpolieDefecty, otop?.[window.appVariables.otopleniyeTehPodpolieName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.otopleniyeTehPodpoliePercent, otop?.[window.appVariables.otopleniyeTehPodpolieName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.otopleniyeTehPodpolieOcenka, otop?.[window.appVariables.otopleniyeTehPodpolieName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.otopleniyeTranzitPitaushDefecty, otop?.[window.appVariables.otopleniyeTranzitPitaushName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.otopleniyeTranzitPitaushPercent, otop?.[window.appVariables.otopleniyeTranzitPitaushName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.otopleniyeTranzitPitaushOcenka, otop?.[window.appVariables.otopleniyeTranzitPitaushName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.otopleniyeCherdakDefecty, otop?.[window.appVariables.otopleniyeCherdakName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.otopleniyeCherdakPercent, otop?.[window.appVariables.otopleniyeCherdakName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.otopleniyeCherdakOcenka, otop?.[window.appVariables.otopleniyeCherdakName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.otopleniyeEtajiDefecty, otop?.[window.appVariables.otopleniyeEtajiName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.otopleniyeEtajiPercent, otop?.[window.appVariables.otopleniyeEtajiName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.otopleniyeEtajiOcenka, otop?.[window.appVariables.otopleniyeEtajiName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.vseOtopleniyeDefecty, otop?.[window.appVariables.vseOtopleniyeName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vseOtopleniyePercent, otop?.[window.appVariables.vseOtopleniyeName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vseOtopleniyeOcenka, otop?.[window.appVariables.vseOtopleniyeName]?.["Оценка"] ?? "-", true);

    // ГВС
    const gvs = rez["ГВС"];
    setVal(window.appVariables.gvsTehPodpolieDefecty, gvs?.[window.appVariables.gvsTehPodpolieName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.gvsTehPodpoliePercent, gvs?.[window.appVariables.gvsTehPodpolieName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.gvsTehPodpolieOcenka, gvs?.[window.appVariables.gvsTehPodpolieName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.gvsTranzitPitaushDefecty, gvs?.[window.appVariables.gvsTranzitPitaushName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.gvsTranzitPitaushPercent, gvs?.[window.appVariables.gvsTranzitPitaushName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.gvsTranzitPitaushOcenka, gvs?.[window.appVariables.gvsTranzitPitaushName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.gvsCherdakDefecty, gvs?.[window.appVariables.gvsCherdakName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.gvsCherdakPercent, gvs?.[window.appVariables.gvsCherdakName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.gvsCherdakOcenka, gvs?.[window.appVariables.gvsCherdakName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.gvsEtajiDefecty, gvs?.[window.appVariables.gvsEtajiName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.gvsEtajiPercent, gvs?.[window.appVariables.gvsEtajiName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.gvsEtajiOcenka, gvs?.[window.appVariables.gvsEtajiName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.vseGvsDefecty, gvs?.[window.appVariables.vseGvsName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vseGvsPercent, gvs?.[window.appVariables.vseGvsName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vseGvsOcenka, gvs?.[window.appVariables.vseGvsName]?.["Оценка"] ?? "-", true);

    // ХВС
    const hvs = rez["ХВС"];
    setVal(window.appVariables.hvsTehPodpolieDefecty, hvs?.[window.appVariables.hvsTehPodpolieName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.hvsTehPodpoliePercent, hvs?.[window.appVariables.hvsTehPodpolieName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.hvsTehPodpolieOcenka, hvs?.[window.appVariables.hvsTehPodpolieName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.hvsTranzitPitaushDefecty, hvs?.[window.appVariables.hvsTranzitPitaushName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.hvsTranzitPitaushPercent, hvs?.[window.appVariables.hvsTranzitPitaushName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.hvsTranzitPitaushOcenka, hvs?.[window.appVariables.hvsTranzitPitaushName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.hvsEtajiDefecty, hvs?.[window.appVariables.hvsEtajiName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.hvsEtajiPercent, hvs?.[window.appVariables.hvsEtajiName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.hvsEtajiOcenka, hvs?.[window.appVariables.hvsEtajiName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.hvsVnPozharProvodDefecty, hvs?.[window.appVariables.hvsVnPozharProvodName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.hvsVnPozharProvodPercent, hvs?.[window.appVariables.hvsVnPozharProvodName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.hvsVnPozharProvodOcenka, hvs?.[window.appVariables.hvsVnPozharProvodName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.vseHvsDefecty, hvs?.[window.appVariables.vseHvsName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vseHvsPercent, hvs?.[window.appVariables.vseHvsName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vseHvsOcenka, hvs?.[window.appVariables.vseHvsName]?.["Оценка"] ?? "-", true);

    // Канализация
    const kan = rez["Канализация"];
    setVal(window.appVariables.kanalizaciaTehPodpolieDefecty, kan?.[window.appVariables.kanalizaciaTehPodpolieName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.kanalizaciaTehPodpoliePercent, kan?.[window.appVariables.kanalizaciaTehPodpolieName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.kanalizaciaTehPodpolieOcenka, kan?.[window.appVariables.kanalizaciaTehPodpolieName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.kanalizaciaEtajiDefecty, kan?.[window.appVariables.kanalizaciaEtajiName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.kanalizaciaEtajiPercent, kan?.[window.appVariables.kanalizaciaEtajiName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.kanalizaciaEtajiOcenka, kan?.[window.appVariables.kanalizaciaEtajiName]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.vseKanalizaciaDefecty, kan?.[window.appVariables.vseKanalizaciaName]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vseKanalizaciaPercent, kan?.[window.appVariables.vseKanalizaciaName]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.vseKanalizaciaOcenka, kan?.[window.appVariables.vseKanalizaciaName]?.["Оценка"] ?? "-", true);

    // Мусоропроводы
    setVal(window.appVariables.musoroprovodyDefecty, rez["Мусоропроводы"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.musoroprovodyPercent, rez["Мусоропроводы"]?.["% деф. части"] ?? "");
    clickGenerator(window.appVariables.musoroprovodyOcenka, rez["Мусоропроводы"]?.["Оценка"] ?? "-", true);

    // Связь с ОДС
    setVal(window.appVariables.odsDefecty, rez["Связь с ОДС"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.odsPosledneeObsled, rez["Связь с ОДС"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.odsOrganizacia, rez["Связь с ОДС"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.odsOcenka, rez["Связь с ОДС"]?.["Оценка"] ?? "-", true);

    // Вентиляция
    setVal(window.appVariables.ventilaciaDefecty, rez["Вентиляция"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.ventilaciaPosledneeObsled, rez["Вентиляция"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.ventilaciaOrganizacia, rez["Вентиляция"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.ventilaciaOcenka, rez["Вентиляция"]?.["Оценка"] ?? "-", true);

    // Система промывки и прочистки стволов мусоропроводов
    const musorChist = rez["Система промывки и прочистки стволов мусоропроводов"];
    setVal(window.appVariables.musoroChistSistemaDefecty, musorChist?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.musoroChistSistemaPosledObsled, musorChist?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.musoroChistSistemaOrganizacia, musorChist?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.musoroChistSistemaOcenka, musorChist?.["Оценка"] ?? "-", true);

    // ОЗДС (охранно-защитная дератизационная система)
    const ozds = rez["ОЗДС (охранно-защитная дератизационная система)"];
    setVal(window.appVariables.ozdsDefecty, ozds?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.ozdsPosledObsled, ozds?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.ozdsOrganizacia, ozds?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.ozdsOcenka, ozds?.["Оценка"] ?? "-", true);

    // Газоходы
    setVal(window.appVariables.gazohodyDefecty, rez["Газоходы"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.gazohodyPosledObsled, rez["Газоходы"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.gazohodyOrganizacia, rez["Газоходы"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.gazohodyOcenka, rez["Газоходы"]?.["Оценка"] ?? "-", true);

    // Лифты
    setVal(window.appVariables.liftyDefecty, rez["Лифты"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.liftyPosledObsled, rez["Лифты"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.liftyOrganizacia, rez["Лифты"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.liftyOcenka, rez["Лифты"]?.["Оценка"] ?? "-", true);

    // Подъёмное устройство для маломобильной группы населения
    const podyom = rez["Подъёмное устройство для маломобильной группы населения"];
    setVal(window.appVariables.podyomnikDefecty, podyom?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.podyomnikPosledObsled, podyom?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.podyomnikOrganizacia, podyom?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.podyomnikOcenka, podyom?.["Оценка"] ?? "-", true);

    // Устройство для автоматического опускания лифта
    const autoSpusk = rez["Устройство для автоматического опускания лифта"];
    setVal(window.appVariables.autoSpuskLiftDefecty, autoSpusk?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.autoSpuskLiftPosledObsled, autoSpusk?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.autoSpuskLiftOrganizacia, autoSpusk?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.autoSpuskLiftOcenka, autoSpusk?.["Оценка"] ?? "-", true);

    // Система ЭС
    setVal(window.appVariables.systemEsDefecty, rez["Система ЭС"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.systemEsPosledObsled, rez["Система ЭС"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.systemEsOrganizacia, rez["Система ЭС"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.systemEsOcenka, rez["Система ЭС"]?.["Оценка"] ?? "-", true);

    // ВКВ (второй кабельный ввод)
    setVal(window.appVariables.vkvDefecty, rez["ВКВ (второй кабельный ввод)"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.vkvPosledObsled, rez["ВКВ (второй кабельный ввод)"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.vkvOrganizacia, rez["ВКВ (второй кабельный ввод)"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.vkvOcenka, rez["ВКВ (второй кабельный ввод)"]?.["Оценка"] ?? "-", true);

    // АВР (автоматическое включение резервного питания)
    setVal(window.appVariables.avrDefecty, rez["АВР (автоматическое включение резервного питания)"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.avrPosledObsled, rez["АВР (автоматическое включение резервного питания)"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.avrOrganizacia, rez["АВР (автоматическое включение резервного питания)"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.avrOcenka, rez["АВР (автоматическое включение резервного питания)"]?.["Оценка"] ?? "-", true);

    // ППАиДУ
    setVal(window.appVariables.ppaiduDefecty, rez["ППАиДУ"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.ppaiduPosledObsled, rez["ППАиДУ"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.ppaiduOrganizacia, rez["ППАиДУ"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.ppaiduOcenka, rez["ППАиДУ"]?.["Оценка"] ?? "-", true);

    // Система оповещения о пожаре
    setVal(window.appVariables.pozharOpoveshenDefecty, rez["Система оповещения о пожаре"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.pozharOpoveshenPosledObsled, rez["Система оповещения о пожаре"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.pozharOpoveshenOrganizacia, rez["Система оповещения о пожаре"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.pozharOpoveshenOcenka, rez["Система оповещения о пожаре"]?.["Оценка"] ?? "-", true);

    // Система ГС
    setVal(window.appVariables.sistemaGsDefecty, rez["Система ГС"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.sistemaGsPosledObsled, rez["Система ГС"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.sistemaGsOrganizacia, rez["Система ГС"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.sistemaGsOcenka, rez["Система ГС"]?.["Оценка"] ?? "-", true);

    // Система видеонаблюдения
    setVal(window.appVariables.sistemaVideonabDefecty, rez["Система видеонаблюдения"]?.["Выявленные дефекты"] ?? "");
    setVal(window.appVariables.sistemaVideonabPosledObsled, rez["Система видеонаблюдения"]?.["№ и дата последнего обслед."] ?? "");
    setVal(window.appVariables.sistemaVideonabOrganizacia, rez["Система видеонаблюдения"]?.["Специализированная организация"] ?? "");
    clickGenerator(window.appVariables.sistemaVideonabOcenka, rez["Система видеонаблюдения"]?.["Оценка"] ?? "-", true);

    setVal(window.appVariables.dopolnitDannye, rez["Дополнительные данные"] ?? "");
    clickGenerator(window.appVariables.recomendatciiPoUtepleniuSten, rez["Рекомендации по утеплению стен"] ?? "-", true);
    setVal(window.appVariables.recomendatciiPoDopRabotam, vyvody["РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам"] ?? "");

    // Подписывающие лица
    // for (let i = 1; i < window.appVariables.signatoriesRows.length; i++) {
    // 	if (!window.appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
    // 		continue;
    // 	}
    // 	window.appVariables[i]["licaOt"].value = loadData["Подписывающие лица"]["Представители от"][i];
    // 	window.appVariables[i]["LicaDoljnost"].value = loadData["Подписывающие лица"]["Должность и наименование организации"][i];
    // 	window.appVariables[i]["licaFio"].value = loadData["Подписывающие лица"]["ФИО должностного лица"][i];
    // }

    localStorage.setItem("DataLoaded", JSON.stringify({ address: loadData?.address?.address ?? "" }));

    if (window.appVariables.pasteButton) {
        window.appVariables.pasteButton.textContent = "Вставлено";
        window.appVariables.pasteButton.classList.add("main__button_done");
        setTimeout(() => {
            if (window.appVariables.pasteButton) {
                window.appVariables.pasteButton.textContent = "Вставка отчета";
                window.appVariables.pasteButton.classList.remove("main__button_done");
            }
        }, 1500);
    }
}