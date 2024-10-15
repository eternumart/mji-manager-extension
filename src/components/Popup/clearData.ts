import { appVariables } from "./constants";
import { searchAllInputs } from "./searchAllInputs";
import { clickGenerator } from "./clickGenerator";
import { buttonError } from "./buttonError";
import { appData } from ".";

export const clearData = () => {
    if (!appData.availableFunctions.clearData) {
        return;
    }
    // Если страница не подходит для очистки - выдаем ошибку и выходим из функции
    if (!buttonError(appVariables.clearDataButton, appVariables.currentPage, "main", "Очистка отчета")) {
        return;
    }
    // находим все инпуты в отчете
    searchAllInputs();

    // РЕЗУЛЬТАТЫ ВЫБОРОЧНОГО ОБСЛЕДОВАНИЯ
    // Крыша
    // Кровля
    appVariables.krovlyaDefecty.value = "";
    appVariables.krovlyaPercent.value = "";
    clickGenerator(appVariables.krovlyaOcenka, "-", false);

    // Свесы
    appVariables.svesyDefecty.value = "";
    appVariables.svesyPercent.value = "";
    clickGenerator(appVariables.svesyOcenka, "-", false);

    // Стропильная система
    appVariables.stropilnayaSistemaDefecty.value = "";
    appVariables.stropilnayaSistemaPercent.value = "";
    clickGenerator(appVariables.stropilnayaSistemaOcenka, "-", false);

    // Чердак
    appVariables.cherdakDefecty.value = "";
    appVariables.cherdakPercent.value = "";
    clickGenerator(appVariables.cherdakOcenka, "-", false);

    // Покрытие ж/б
    appVariables.pokritieJBDefecty.value = "";
    appVariables.pokritieJBPercent.value = "";
    clickGenerator(appVariables.pokritieJBOcenka, "-", false);

    // Все элементы
    appVariables.vsyaKrishaDefecty.value = "";
    appVariables.vsyaKrishaPercent.value = "";
    clickGenerator(appVariables.vsyaKrishaOcenka, "-", false);

    // Водоотвод
    appVariables.vodootvodDefecty.value = "";
    appVariables.vodootvodPercent.value = "";
    clickGenerator(appVariables.vodootvodOcenka, "-", false);

    // Межпанельные стыки
    appVariables.majpanelnyeStykiDefecty.value = "";
    appVariables.majpanelnyeStykiPercent.value = "";
    clickGenerator(appVariables.majpanelnyeStykiProshlOcenka, "-", false);

    // Фасад
    appVariables.fasadDefecty.value = "";
    appVariables.fasadPercent.value = "";
    clickGenerator(appVariables.fasadOcenka, "-", false);

    // Балконы
    // Балконы
    appVariables.balkonyDefecty.value = "";
    appVariables.balkonyPercent.value = "";
    clickGenerator(appVariables.balkonyOcenka, "-", false);

    // Лоджии
    appVariables.lodjiiDefecty.value = "";
    appVariables.lodjiiPercent.value = "";
    clickGenerator(appVariables.lodjiiOcenka, "-", false);

    // Козырьки
    appVariables.kozirkiDefecty.value = "";
    appVariables.kozirkiPercent.value = "";
    clickGenerator(appVariables.kozirkiOcenka, "-", false);

    // Эркеры
    appVariables.erkeryDefecty.value = "";
    appVariables.erkeryPercent.value = "";
    clickGenerator(appVariables.erkeryOcenka, "-", false);

    // Все элементы
    appVariables.vseBalkonyDefecty.value = "";
    appVariables.vseBalkonyPercent.value = "";
    clickGenerator(appVariables.vseBalkonyOcenka, "-", false);

    // Стены
    appVariables.stenyDefecty.value = "";
    appVariables.stenyPercent.value = "";
    clickGenerator(appVariables.stenyOcenka, "-", false);

    // Подвал
    appVariables.podvalDefecty.value = "";
    appVariables.podvalPercent.value = "";
    clickGenerator(appVariables.podvalOcenka, "-", false);

    // Тех.подполье
    appVariables.techPodpolieDefecty.value = "";
    appVariables.techPodpoliePercent.value = "";
    clickGenerator(appVariables.techPodpolieOcenka, "-", false);

    // Тех.этаж
    appVariables.techEtajDefecty.value = "";
    appVariables.techEtajPercent.value = "";
    clickGenerator(appVariables.techEtajOcenka, "-", false);

    // Гараж стоянка (подземный)
    appVariables.garageDefecty.value = "";
    appVariables.garagePercent.value = "";
    clickGenerator(appVariables.garageOcenka, "-", false);

    // Места общего пользования
    // Вестибюли
    appVariables.mopVestibuliDefecty.value = "";
    appVariables.mopVestibuliPercent.value = "";
    clickGenerator(appVariables.mopVestibuliOcenka, "-", false);

    // Крыльца
    appVariables.mopKrilcaDefecty.value = "";
    appVariables.mopKrilcaPercent.value = "";
    clickGenerator(appVariables.mopKrilcaOcenka, "-", false);

    // Пандусы наружные
    appVariables.mopPandusyNaruzhnieDefecty.value = "";
    appVariables.mopPandusyNaruzhniePercent.value = "";
    clickGenerator(appVariables.mopPandusyNaruzhnieOcenka, "-", false);

    // Пандусы внутри-подъездные
    appVariables.mopPandusyVnutrennieDefecty.value = "";
    appVariables.mopPandusyVnutrenniePercent.value = "";
    clickGenerator(appVariables.mopPandusyVnutrennieOcenka, "-", false);

    // Сходы/съезды
    appVariables.mopShodySiezdyDefecty.value = "";
    appVariables.mopShodySiezdyPercent.value = "";
    clickGenerator(appVariables.mopShodySiezdyOcenka, "-", false);

    // Окна, двери
    appVariables.mopOknaDveriDefecty.value = "";
    appVariables.mopOknaDveriPercent.value = "";
    clickGenerator(appVariables.mopOknaDveriOcenka, "-", false);

    // Внутренняя отделка помещений
    appVariables.mopVnOtdelkaPomeshDefecty.value = "";
    appVariables.mopVnOtdelkaPomeshPercent.value = "";
    clickGenerator(appVariables.mopVnOtdelkaPomeshOcenka, "-", false);

    // Все элементы
    appVariables.mopVseElementyDefecty.value = "";
    appVariables.mopVseElementyPercent.value = "";
    clickGenerator(appVariables.mopVseElementyOcenka, "-", false);

    // Лестницы
    appVariables.lestnicyDefecty.value = "";
    appVariables.lestnicyPercent.value = "";
    clickGenerator(appVariables.lestnicyOcenka, "-", false);

    // Перекрытия
    appVariables.perekrityaDefecty.value = "";
    appVariables.perekrityaPercent.value = "";
    clickGenerator(appVariables.perekrityaOcenka, "-", false);

    // Система отопления
    // Тех.подполье/тех.этаж
    appVariables.otopleniyeTehPodpolieDefecty.value = "";
    appVariables.otopleniyeTehPodpoliePercent.value = "";
    clickGenerator(appVariables.otopleniyeTehPodpolieOcenka, "-", false);

    // Транзит питающий
    appVariables.otopleniyeTranzitPitaushDefecty.value = "";
    appVariables.otopleniyeTranzitPitaushPercent.value = "";
    clickGenerator(appVariables.otopleniyeTranzitPitaushOcenka, "-", false);

    // Чердак
    appVariables.otopleniyeCherdakDefecty.value = "";
    appVariables.otopleniyeCherdakPercent.value = "";
    clickGenerator(appVariables.otopleniyeCherdakOcenka, "-", false);

    // Этажи
    appVariables.otopleniyeEtajiDefecty.value = "";
    appVariables.otopleniyeEtajiPercent.value = "";
    clickGenerator(appVariables.otopleniyeEtajiOcenka, "-", false);

    // Вся система
    appVariables.vseOtopleniyeDefecty.value = "";
    appVariables.vseOtopleniyePercent.value = "";
    clickGenerator(appVariables.vseOtopleniyeOcenka, "-", false);

    // ГВС
    // Тех.подполье/тех.этаж
    appVariables.gvsTehPodpolieDefecty.value = "";
    appVariables.gvsTehPodpoliePercent.value = "";
    clickGenerator(appVariables.gvsTehPodpolieOcenka, "-", false);

    // Транзит питающий
    appVariables.gvsTranzitPitaushDefecty.value = "";
    appVariables.gvsTranzitPitaushPercent.value = "";
    clickGenerator(appVariables.gvsTranzitPitaushOcenka, "-", false);

    // Чердак
    appVariables.gvsCherdakDefecty.value = "";
    appVariables.gvsCherdakPercent.value = "";
    clickGenerator(appVariables.gvsCherdakOcenka, "-", false);

    // Этажи
    appVariables.gvsEtajiDefecty.value = "";
    appVariables.gvsEtajiPercent.value = "";
    clickGenerator(appVariables.gvsEtajiOcenka, "-", false);

    // Вся система
    appVariables.vseGvsDefecty.value = "";
    appVariables.vseGvsPercent.value = "";
    clickGenerator(appVariables.vseGvsOcenka, "-", false);

    // ХВС
    // Тех.подполье/тех.этаж
    appVariables.hvsTehPodpolieDefecty.value = "";
    appVariables.hvsTehPodpoliePercent.value = "";
    clickGenerator(appVariables.hvsTehPodpolieOcenka, "-", false);

    // Транзит питающий
    appVariables.hvsTranzitPitaushDefecty.value = "";
    appVariables.hvsTranzitPitaushPercent.value = "";
    clickGenerator(appVariables.hvsTranzitPitaushOcenka, "-", false);

    // Этажи
    appVariables.hvsEtajiDefecty.value = "";
    appVariables.hvsEtajiPercent.value = "";
    clickGenerator(appVariables.hvsEtajiOcenka, "-", false);

    // Внутренний пожарный водопровод
    appVariables.hvsVnPozharProvodDefecty.value = "";
    appVariables.hvsVnPozharProvodPercent.value = "";
    clickGenerator(appVariables.hvsVnPozharProvodOcenka, "-", false);

    // Вся система
    appVariables.vseHvsDefecty.value = "";
    appVariables.vseHvsPercent.value = "";
    clickGenerator(appVariables.vseHvsOcenka, "-", false);

    // Канализация
    // Тех.подполье/тех.этаж
    appVariables.kanalizaciaTehPodpolieDefecty.value = "";
    appVariables.kanalizaciaTehPodpoliePercent.value = "";
    clickGenerator(appVariables.kanalizaciaTehPodpolieOcenka, "-", false);

    // Этажи
    appVariables.kanalizaciaEtajiDefecty.value = "";
    appVariables.kanalizaciaEtajiPercent.value = "";
    clickGenerator(appVariables.kanalizaciaEtajiOcenka, "-", false);

    // Вся система
    appVariables.vseKanalizaciaDefecty.value = "";
    appVariables.vseKanalizaciaPercent.value = "";
    clickGenerator(appVariables.vseKanalizaciaOcenka, "-", false);

    // Мусоропроводы
    appVariables.musoroprovodyDefecty.value = "";
    appVariables.musoroprovodyPercent.value = "";
    clickGenerator(appVariables.musoroprovodyOcenka, "-", false);

    // Связь с ОДС
    appVariables.odsDefecty.value = "";
    appVariables.odsPosledneeObsled.value = "";
    appVariables.odsOrganizacia.value = "";
    clickGenerator(appVariables.odsOcenka, "-", false);

    // Вентиляция
    appVariables.ventilaciaDefecty.value = "";
    appVariables.ventilaciaPosledneeObsled.value = "";
    appVariables.odsOrganizacia.value = "";
    clickGenerator(appVariables.ventilaciaOcenka, "-", false);

    // Система промывки и прочистки стволов мусоропроводов
    appVariables.musoroChistSistemaDefecty.value = "";
    appVariables.musoroChistSistemaPosledObsled.value = "";
    appVariables.musoroChistSistemaOrganizacia.value = "";
    clickGenerator(appVariables.musoroChistSistemaOcenka, "-", false);

    // ОЗДС (охранно-защитная дератизационная система)
    appVariables.ozdsDefecty.value = "";
    appVariables.ozdsPosledObsled.value = "";
    appVariables.ozdsOrganizacia.value = "";
    clickGenerator(appVariables.ozdsOcenka, "-", false);

    // Газоходы
    appVariables.gazohodyDefecty.value = "";
    appVariables.gazohodyPosledObsled.value = "";
    appVariables.gazohodyOrganizacia.value = "";
    clickGenerator(appVariables.gazohodyOcenka, "-", false);

    // Лифты
    appVariables.liftyDefecty.value = "";
    appVariables.liftyPosledObsled.value = "";
    appVariables.liftyOrganizacia.value = "";
    clickGenerator(appVariables.liftyOcenka, "-", false);

    // Подъёмное устройство для маломобильной группы населения
    appVariables.podyomnikDefecty.value = "";
    appVariables.podyomnikPosledObsled.value = "";
    appVariables.podyomnikOrganizacia.value = "";
    clickGenerator(appVariables.podyomnikOcenka, "-", false);

    // Устройство для автоматического опускания лифта
    appVariables.autoSpuskLiftDefecty.value = "";
    appVariables.autoSpuskLiftPosledObsled.value = "";
    appVariables.autoSpuskLiftOrganizacia.value = "";
    clickGenerator(appVariables.autoSpuskLiftOcenka, "-", false);

    // Система ЭС
    appVariables.systemEsDefecty.value = "";
    appVariables.systemEsPosledObsled.value = "";
    appVariables.systemEsOrganizacia.value = "";
    clickGenerator(appVariables.systemEsOcenka, "-", false);

    // ВКВ (второй кабельный ввод)
    appVariables.vkvDefecty.value = "";
    appVariables.vkvPosledObsled.value = "";
    appVariables.vkvOrganizacia.value = "";
    clickGenerator(appVariables.vkvOcenka, "-", false);

    // АВР (автоматическое включение резервного питания)
    appVariables.avrDefecty.value = "";
    appVariables.avrPosledObsled.value = "";
    appVariables.avrOrganizacia.value = "";
    clickGenerator(appVariables.avrOcenka, "-", false);

    // ППАиДУ
    appVariables.ppaiduDefecty.value = "";
    appVariables.ppaiduPosledObsled.value = "";
    appVariables.ppaiduOrganizacia.value = "";
    clickGenerator(appVariables.ppaiduOcenka, "-", false);

    // Система оповещения о пожаре
    appVariables.pozharOpoveshenDefecty.value = "";
    appVariables.pozharOpoveshenPosledObsled.value = "";
    appVariables.pozharOpoveshenOrganizacia.value = "";
    clickGenerator(appVariables.pozharOpoveshenOcenka, "-", false);

    // Система ГС
    appVariables.sistemaGsDefecty.value = "";
    appVariables.sistemaGsPosledObsled.value = "";
    appVariables.sistemaGsOrganizacia.value = "";
    clickGenerator(appVariables.sistemaGsOcenka, "-", false);

    // Система видеонаблюдения
    appVariables.sistemaVideonabDefecty.value = "";
    appVariables.sistemaVideonabPosledObsled.value = "";
    appVariables.sistemaVideonabOrganizacia.value = "";
    clickGenerator(appVariables.sistemaVideonabProshlOcenka, "-", false);

    appVariables.dopolnitDannye.value = "";
    clickGenerator(appVariables.recomendatciiPoUtepleniuSten, "Н/и (не имеется)", false);
    appVariables.recomendatciiPoDopRabotam.value = "";

    // Подписывающие лица
    for (let i = 1; i < appVariables.signatoriesRows.length; i++) {
        if (!appVariables.signatoriesRows[i].querySelector("#comp_12340")) {
            continue;
        }
        appVariables[i]["licaOt"].value = "";
        appVariables[i]["LicaDoljnost"].value = "";
        appVariables[i]["licaFio"].value = "";
    }

    appVariables.clearDataButton.textContent = "Очищено";
    appVariables.clearDataButton.classList.add("main__button_done");
    setTimeout(() => {
        appVariables.clearDataButton.textContent = "Очистка отчета";
        appVariables.clearDataButton.classList.remove("main__button_done");
    }, 1500);
}