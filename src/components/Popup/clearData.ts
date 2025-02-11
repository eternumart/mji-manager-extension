import { searchAllInputs } from "./searchAllInputs";
import { clickGenerator } from "./clickGenerator";
import { buttonError } from "./buttonError";

export const clearData = () => {
    if (!window.appData.functions.clearData || window.appVariables.currentPage === "parser") {
        return;
    }
    // Если страница не подходит для очистки - выдаем ошибку и выходим из функции
    if (!buttonError(window.appVariables.clearDataButton, window.appVariables.currentPage, "main", "Очистка отчета")) {
        return;
    }
    // находим все инпуты в отчете
    searchAllInputs();

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    // Кровля
    window.appVariables.krovlyaDefecty.value = "";
    window.appVariables.krovlyaPercent.value = "";
    clickGenerator(window.appVariables.krovlyaOcenka, "-", false);

    // Свесы
    window.appVariables.svesyDefecty.value = "";
    window.appVariables.svesyPercent.value = "";
    clickGenerator(window.appVariables.svesyOcenka, "-", false);

    // Стропильная система
    window.appVariables.stropilnayaSistemaDefecty.value = "";
    window.appVariables.stropilnayaSistemaPercent.value = "";
    clickGenerator(window.appVariables.stropilnayaSistemaOcenka, "-", false);

    // Чердак
    window.appVariables.cherdakDefecty.value = "";
    window.appVariables.cherdakPercent.value = "";
    clickGenerator(window.appVariables.cherdakOcenka, "-", false);

    // Покрытие ж/б
    window.appVariables.pokritieJBDefecty.value = "";
    window.appVariables.pokritieJBPercent.value = "";
    clickGenerator(window.appVariables.pokritieJBOcenka, "-", false);

    // Все элементы
    window.appVariables.vsyaKrishaDefecty.value = "";
    window.appVariables.vsyaKrishaPercent.value = "";
    clickGenerator(window.appVariables.vsyaKrishaOcenka, "-", false);

    // Водоотвод
    window.appVariables.vodootvodDefecty.value = "";
    window.appVariables.vodootvodPercent.value = "";
    clickGenerator(window.appVariables.vodootvodOcenka, "-", false);

    // Межпанельные стыки
    window.appVariables.majpanelnyeStykiDefecty.value = "";
    window.appVariables.majpanelnyeStykiPercent.value = "";
    clickGenerator(window.appVariables.majpanelnyeStykiProshlOcenka, "-", false);

    // Фасад
    window.appVariables.fasadDefecty.value = "";
    window.appVariables.fasadPercent.value = "";
    clickGenerator(window.appVariables.fasadOcenka, "-", false);

    // Балконы
    // Балконы
    window.appVariables.balkonyDefecty.value = "";
    window.appVariables.balkonyPercent.value = "";
    clickGenerator(window.appVariables.balkonyOcenka, "-", false);

    // Лоджии
    window.appVariables.lodjiiDefecty.value = "";
    window.appVariables.lodjiiPercent.value = "";
    clickGenerator(window.appVariables.lodjiiOcenka, "-", false);

    // Козырьки
    window.appVariables.kozirkiDefecty.value = "";
    window.appVariables.kozirkiPercent.value = "";
    clickGenerator(window.appVariables.kozirkiOcenka, "-", false);

    // Эркеры
    window.appVariables.erkeryDefecty.value = "";
    window.appVariables.erkeryPercent.value = "";
    clickGenerator(window.appVariables.erkeryOcenka, "-", false);

    // Все элементы
    window.appVariables.vseBalkonyDefecty.value = "";
    window.appVariables.vseBalkonyPercent.value = "";
    clickGenerator(window.appVariables.vseBalkonyOcenka, "-", false);

    // Стены
    window.appVariables.stenyDefecty.value = "";
    window.appVariables.stenyPercent.value = "";
    clickGenerator(window.appVariables.stenyOcenka, "-", false);

    // Подвал
    window.appVariables.podvalDefecty.value = "";
    window.appVariables.podvalPercent.value = "";
    clickGenerator(window.appVariables.podvalOcenka, "-", false);

    // Тех.подполье
    window.appVariables.techPodpolieDefecty.value = "";
    window.appVariables.techPodpoliePercent.value = "";
    clickGenerator(window.appVariables.techPodpolieOcenka, "-", false);

    // Тех.этаж
    window.appVariables.techEtajDefecty.value = "";
    window.appVariables.techEtajPercent.value = "";
    clickGenerator(window.appVariables.techEtajOcenka, "-", false);

    // Гараж стоянка (подземный)
    window.appVariables.garageDefecty.value = "";
    window.appVariables.garagePercent.value = "";
    clickGenerator(window.appVariables.garageOcenka, "-", false);

    // Места общего пользования
    // Вестибюли
    window.appVariables.mopVestibuliDefecty.value = "";
    window.appVariables.mopVestibuliPercent.value = "";
    clickGenerator(window.appVariables.mopVestibuliOcenka, "-", false);

    // Крыльца
    window.appVariables.mopKrilcaDefecty.value = "";
    window.appVariables.mopKrilcaPercent.value = "";
    clickGenerator(window.appVariables.mopKrilcaOcenka, "-", false);

    // Пандусы наружные
    window.appVariables.mopPandusyNaruzhnieDefecty.value = "";
    window.appVariables.mopPandusyNaruzhniePercent.value = "";
    clickGenerator(window.appVariables.mopPandusyNaruzhnieOcenka, "-", false);

    // Пандусы внутри-подъездные
    window.appVariables.mopPandusyVnutrennieDefecty.value = "";
    window.appVariables.mopPandusyVnutrenniePercent.value = "";
    clickGenerator(window.appVariables.mopPandusyVnutrennieOcenka, "-", false);

    // Сходы/съезды
    window.appVariables.mopShodySiezdyDefecty.value = "";
    window.appVariables.mopShodySiezdyPercent.value = "";
    clickGenerator(window.appVariables.mopShodySiezdyOcenka, "-", false);

    // Окна, двери
    window.appVariables.mopOknaDveriDefecty.value = "";
    window.appVariables.mopOknaDveriPercent.value = "";
    clickGenerator(window.appVariables.mopOknaDveriOcenka, "-", false);

    // Внутренняя отделка помещений
    window.appVariables.mopVnOtdelkaPomeshDefecty.value = "";
    window.appVariables.mopVnOtdelkaPomeshPercent.value = "";
    clickGenerator(window.appVariables.mopVnOtdelkaPomeshOcenka, "-", false);

    // Все элементы
    window.appVariables.mopVseElementyDefecty.value = "";
    window.appVariables.mopVseElementyPercent.value = "";
    clickGenerator(window.appVariables.mopVseElementyOcenka, "-", false);

    // Лестницы
    window.appVariables.lestnicyDefecty.value = "";
    window.appVariables.lestnicyPercent.value = "";
    clickGenerator(window.appVariables.lestnicyOcenka, "-", false);

    // Перекрытия
    window.appVariables.perekrityaDefecty.value = "";
    window.appVariables.perekrityaPercent.value = "";
    clickGenerator(window.appVariables.perekrityaOcenka, "-", false);

    // Система отопления
    // Тех.подполье/тех.этаж
    window.appVariables.otopleniyeTehPodpolieDefecty.value = "";
    window.appVariables.otopleniyeTehPodpoliePercent.value = "";
    clickGenerator(window.appVariables.otopleniyeTehPodpolieOcenka, "-", false);

    // Транзит питающий
    window.appVariables.otopleniyeTranzitPitaushDefecty.value = "";
    window.appVariables.otopleniyeTranzitPitaushPercent.value = "";
    clickGenerator(window.appVariables.otopleniyeTranzitPitaushOcenka, "-", false);

    // Чердак
    window.appVariables.otopleniyeCherdakDefecty.value = "";
    window.appVariables.otopleniyeCherdakPercent.value = "";
    clickGenerator(window.appVariables.otopleniyeCherdakOcenka, "-", false);

    // Этажи
    window.appVariables.otopleniyeEtajiDefecty.value = "";
    window.appVariables.otopleniyeEtajiPercent.value = "";
    clickGenerator(window.appVariables.otopleniyeEtajiOcenka, "-", false);

    // Вся система
    window.appVariables.vseOtopleniyeDefecty.value = "";
    window.appVariables.vseOtopleniyePercent.value = "";
    clickGenerator(window.appVariables.vseOtopleniyeOcenka, "-", false);

    // ГВС
    // Тех.подполье/тех.этаж
    window.appVariables.gvsTehPodpolieDefecty.value = "";
    window.appVariables.gvsTehPodpoliePercent.value = "";
    clickGenerator(window.appVariables.gvsTehPodpolieOcenka, "-", false);

    // Транзит питающий
    window.appVariables.gvsTranzitPitaushDefecty.value = "";
    window.appVariables.gvsTranzitPitaushPercent.value = "";
    clickGenerator(window.appVariables.gvsTranzitPitaushOcenka, "-", false);

    // Чердак
    window.appVariables.gvsCherdakDefecty.value = "";
    window.appVariables.gvsCherdakPercent.value = "";
    clickGenerator(window.appVariables.gvsCherdakOcenka, "-", false);

    // Этажи
    window.appVariables.gvsEtajiDefecty.value = "";
    window.appVariables.gvsEtajiPercent.value = "";
    clickGenerator(window.appVariables.gvsEtajiOcenka, "-", false);

    // Вся система
    window.appVariables.vseGvsDefecty.value = "";
    window.appVariables.vseGvsPercent.value = "";
    clickGenerator(window.appVariables.vseGvsOcenka, "-", false);

    // ХВС
    // Тех.подполье/тех.этаж
    window.appVariables.hvsTehPodpolieDefecty.value = "";
    window.appVariables.hvsTehPodpoliePercent.value = "";
    clickGenerator(window.appVariables.hvsTehPodpolieOcenka, "-", false);

    // Транзит питающий
    window.appVariables.hvsTranzitPitaushDefecty.value = "";
    window.appVariables.hvsTranzitPitaushPercent.value = "";
    clickGenerator(window.appVariables.hvsTranzitPitaushOcenka, "-", false);

    // Этажи
    window.appVariables.hvsEtajiDefecty.value = "";
    window.appVariables.hvsEtajiPercent.value = "";
    clickGenerator(window.appVariables.hvsEtajiOcenka, "-", false);

    // Внутренний пожарный водопровод
    window.appVariables.hvsVnPozharProvodDefecty.value = "";
    window.appVariables.hvsVnPozharProvodPercent.value = "";
    clickGenerator(window.appVariables.hvsVnPozharProvodOcenka, "-", false);

    // Вся система
    window.appVariables.vseHvsDefecty.value = "";
    window.appVariables.vseHvsPercent.value = "";
    clickGenerator(window.appVariables.vseHvsOcenka, "-", false);

    // Канализация
    // Тех.подполье/тех.этаж
    window.appVariables.kanalizaciaTehPodpolieDefecty.value = "";
    window.appVariables.kanalizaciaTehPodpoliePercent.value = "";
    clickGenerator(window.appVariables.kanalizaciaTehPodpolieOcenka, "-", false);

    // Этажи
    window.appVariables.kanalizaciaEtajiDefecty.value = "";
    window.appVariables.kanalizaciaEtajiPercent.value = "";
    clickGenerator(window.appVariables.kanalizaciaEtajiOcenka, "-", false);

    // Вся система
    window.appVariables.vseKanalizaciaDefecty.value = "";
    window.appVariables.vseKanalizaciaPercent.value = "";
    clickGenerator(window.appVariables.vseKanalizaciaOcenka, "-", false);

    // Мусоропроводы
    window.appVariables.musoroprovodyDefecty.value = "";
    window.appVariables.musoroprovodyPercent.value = "";
    clickGenerator(window.appVariables.musoroprovodyOcenka, "-", false);

    // Связь с ОДС
    window.appVariables.odsDefecty.value = "";
    window.appVariables.odsPosledneeObsled.value = "";
    window.appVariables.odsOrganizacia.value = "";
    clickGenerator(window.appVariables.odsOcenka, "-", false);

    // Вентиляция
    window.appVariables.ventilaciaDefecty.value = "";
    window.appVariables.ventilaciaPosledneeObsled.value = "";
    window.appVariables.odsOrganizacia.value = "";
    clickGenerator(window.appVariables.ventilaciaOcenka, "-", false);

    // Система промывки и прочистки стволов мусоропроводов
    window.appVariables.musoroChistSistemaDefecty.value = "";
    window.appVariables.musoroChistSistemaPosledObsled.value = "";
    window.appVariables.musoroChistSistemaOrganizacia.value = "";
    clickGenerator(window.appVariables.musoroChistSistemaOcenka, "-", false);

    // ОЗДС (охранно-защитная дератизационная система)
    window.appVariables.ozdsDefecty.value = "";
    window.appVariables.ozdsPosledObsled.value = "";
    window.appVariables.ozdsOrganizacia.value = "";
    clickGenerator(window.appVariables.ozdsOcenka, "-", false);

    // Газоходы
    window.appVariables.gazohodyDefecty.value = "";
    window.appVariables.gazohodyPosledObsled.value = "";
    window.appVariables.gazohodyOrganizacia.value = "";
    clickGenerator(window.appVariables.gazohodyOcenka, "-", false);

    // Лифты
    window.appVariables.liftyDefecty.value = "";
    window.appVariables.liftyPosledObsled.value = "";
    window.appVariables.liftyOrganizacia.value = "";
    clickGenerator(window.appVariables.liftyOcenka, "-", false);

    // Подъёмное устройство для маломобильной группы населения
    window.appVariables.podyomnikDefecty.value = "";
    window.appVariables.podyomnikPosledObsled.value = "";
    window.appVariables.podyomnikOrganizacia.value = "";
    clickGenerator(window.appVariables.podyomnikOcenka, "-", false);

    // Устройство для автоматического опускания лифта
    window.appVariables.autoSpuskLiftDefecty.value = "";
    window.appVariables.autoSpuskLiftPosledObsled.value = "";
    window.appVariables.autoSpuskLiftOrganizacia.value = "";
    clickGenerator(window.appVariables.autoSpuskLiftOcenka, "-", false);

    // Система ЭС
    window.appVariables.systemEsDefecty.value = "";
    window.appVariables.systemEsPosledObsled.value = "";
    window.appVariables.systemEsOrganizacia.value = "";
    clickGenerator(window.appVariables.systemEsOcenka, "-", false);

    // ВКВ (второй кабельный ввод)
    window.appVariables.vkvDefecty.value = "";
    window.appVariables.vkvPosledObsled.value = "";
    window.appVariables.vkvOrganizacia.value = "";
    clickGenerator(window.appVariables.vkvOcenka, "-", false);

    // АВР (автоматическое включение резервного питания)
    window.appVariables.avrDefecty.value = "";
    window.appVariables.avrPosledObsled.value = "";
    window.appVariables.avrOrganizacia.value = "";
    clickGenerator(window.appVariables.avrOcenka, "-", false);

    // ППАиДУ
    window.appVariables.ppaiduDefecty.value = "";
    window.appVariables.ppaiduPosledObsled.value = "";
    window.appVariables.ppaiduOrganizacia.value = "";
    clickGenerator(window.appVariables.ppaiduOcenka, "-", false);

    // Система оповещения о пожаре
    window.appVariables.pozharOpoveshenDefecty.value = "";
    window.appVariables.pozharOpoveshenPosledObsled.value = "";
    window.appVariables.pozharOpoveshenOrganizacia.value = "";
    clickGenerator(window.appVariables.pozharOpoveshenOcenka, "-", false);

    // Система ГС
    window.appVariables.sistemaGsDefecty.value = "";
    window.appVariables.sistemaGsPosledObsled.value = "";
    window.appVariables.sistemaGsOrganizacia.value = "";
    clickGenerator(window.appVariables.sistemaGsOcenka, "-", false);

    // Система видеонаблюдения
    window.appVariables.sistemaVideonabDefecty.value = "";
    window.appVariables.sistemaVideonabPosledObsled.value = "";
    window.appVariables.sistemaVideonabOrganizacia.value = "";
    clickGenerator(window.appVariables.sistemaVideonabProshlOcenka, "-", false);

    window.appVariables.dopolnitDannye.value = "";
    clickGenerator(window.appVariables.recomendatciiPoUtepleniuSten, "Н/и (не имеется)", false);
    window.appVariables.recomendatciiPoDopRabotam.value = "";

    // Подписывающие лица
    for (let i = 1; i < window.appVariables.signatoriesRows.length; i++) {
        if (!window.appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
            continue;
        }
        window.appVariables[i]["licaOt"].value = "";
        window.appVariables[i]["LicaDoljnost"].value = "";
        window.appVariables[i]["licaFio"].value = "";
    }

    window.appVariables.clearDataButton.textContent = "Очищено";
    window.appVariables.clearDataButton.classList.add("main__button_done");
    setTimeout(() => {
        window.appVariables.clearDataButton.textContent = "Очистка отчета";
        window.appVariables.clearDataButton.classList.remove("main__button_done");
    }, 1500);
}