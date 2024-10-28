import { searchAllInputs } from "./searchAllInputs";
import { buttonError } from "./buttonError";

export const saveData = () => {
    if (!window.appData.functions.saveData) {
        return;
    }
    // Если страница не подходит для сохранения - выдаем ошибку и выходим из функции
    if (!buttonError(window.appVariables.copyButton, window.appVariables.currentPage, "main", "Копирование отчета")) {
        return;
    }

    // обновляем все значения объекта переменных
    searchAllInputs();
    interface data {
        [key: string]: any;
    }
    const data: data = {
        address: {
            area: window.appVariables.area,
            district: window.appVariables.district,
            address: window.appVariables.address,
        },
        "Паспортные данные": {
            "Количество этажей": window.appVariables.passportDannye.etajei.value,
            "Количество подъездов": window.appVariables.passportDannye.podjezdov.value,
            "Строительный объем здания": window.appVariables.passportDannye.stroyObjem.value,
            "Кол-во квартир": window.appVariables.passportDannye.kvartir.value,
            "Площадь полезная": window.appVariables.passportDannye.poleznayaPloschad.value,
            "Площадь в жилых помещениях": window.appVariables.passportDannye.jilayaPloschad.value,
            "Площадь в нежилых помещениях": window.appVariables.passportDannye.neJilayaPloschad.value,
            "Серия проекта": window.appVariables.passportDannye.seriyaProekta.value,
            "Год постройки": window.appVariables.passportDannye.godPostrioki.value,
            "Год реконструкции": window.appVariables.passportDannye.godRekonstrukcii.value,
            "Класс энергетической эффективности здания": window.appVariables.passportDannye.klassEnergoeffectivnosti.value,
            "Физический износ (%) по данным БТИ": window.appVariables.passportDannye.fizIznos.value,
            "по данным БТИ на дату": window.appVariables.passportDannye.dannyeBtiData.value,
            "Наличие встроенных инженерных сооружений": window.appVariables.passportDannye.nalichVstroenSooruj.value,
            "Кол-во встроенных инженерных сооружений": window.appVariables.passportDannye.kolichVstroenSooruj.value,
            "Кол-во надстроенных инженерных сооружений": window.appVariables.passportDannye.kolichNadstroenSooruj.value,
            ТП: window.appVariables.passportDannye.tp.value,
            "в т.ч. масляные ТП": window.appVariables.passportDannye.maslyanieTp.value,
            "Магистрали транзитные": window.appVariables.passportDannye.magistraliTranzit.value,
            "Факт. уд. потребление тепловой эн., Гкал/м²": window.appVariables.passportDannye.potreblenieTeplaFact.value,
            "Проект. уд. потребление тепловой эн., кДж/(м²×град.×сут.)": window.appVariables.passportDannye.potreblenieTeplaProekt.value,
            "Величина отклонения (%)": window.appVariables.passportDannye.potreblenieTeplaOtklonenie.value,
        },
        "Технические заключения и проекты ремонтов": {
            1: {
                Организация: "",
                "Дата, №": "",
                "Наименование, содержание": "",
            },
            2: {
                Организация: "",
                "Дата, №": "",
                "Наименование, содержание": "",
            },
            3: {
                Организация: "",
                "Дата, №": "",
                "Наименование, содержание": "",
            },
            4: {
                Организация: "",
                "Дата, №": "",
                "Наименование, содержание": "",
            },
        },
        "Выводы по результатам предыдущего обследования": {},
        "Выполнение рекомендаций по кап. ремонту": {
            Крыша: {
                Кровля: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Свесы: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Стропильная система": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Чердак: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Покрытие ж/б": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Все элементы": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
            },
            Водоотвод: {
                Рекомендации: window.appVariables.recomend.vodootvod.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.vodootvod.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.vodootvod.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.vodootvod.factObjom.value,
            },
            Герметизация: {
                Рекомендации: window.appVariables.recomend.germetizacia.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.germetizacia.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.germetizacia.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.germetizacia.factObjom.value,
            },
            Фасад: {
                Рекомендации: window.appVariables.recomend.fasad.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.fasad.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.fasad.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.fasad.factObjom.value,
                "Остекление оконных заполнений фасада": window.appVariables.recomendationsDone.querySelector("#lookupTextcomp_12601").value,
            },
            Балконы: {
                Балконы: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Лоджии: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Козырьки: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Эркеры: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Все элементы": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Остекление балконов": window.appVariables.recomend.balkony.balkony.osteklenie.value,
                "Остекление лоджий": window.appVariables.recomend.balkony.lodjii.osteklenie.value,
            },
            Стены: {
                Рекомендации: window.appVariables.recomend.steny.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.steny.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.steny.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.steny.factObjom.value,
                "Утепление стен": window.appVariables.recomend.steny.uteplenie.value,
            },
            Подвал: {
                Рекомендации: window.appVariables.recomend.podval.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.podval.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.podval.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.podval.factObjom.value,
            },
            "Тех.подполье": {
                Рекомендации: window.appVariables.recomend.tehPodpolie.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.tehPodpolie.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.tehPodpolie.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.tehPodpolie.factObjom.value,
            },
            "Тех.этаж": {
                Рекомендации: window.appVariables.recomend.tehEtaj.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.tehEtaj.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.tehEtaj.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.tehEtaj.factObjom.value,
            },
            "Гараж стоянка (подземный)": {
                Рекомендации: window.appVariables.recomend.garage.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.garage.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.garage.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.garage.factObjom.value,
            },
            "Места общего пользования": {
                Вестибюли: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Крыльца: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Пандусы наружные": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Пандусы внутриподъездные": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Сходы/съезды": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Окна, двери": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Внутренняя отделка помещений": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Все элементы": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
            },
            Лестницы: {
                Рекомендации: window.appVariables.recomend.lestnicy.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.lestnicy.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.lestnicy.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.lestnicy.factObjom.value,
            },
            Перекрытия: {
                Рекомендации: window.appVariables.recomend.perekritya.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.perekritya.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.perekritya.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.perekritya.factObjom.value,
            },
            "Система отопления": {
                "Тех.подполье/тех.этаж": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Транзит питающий": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Чердак: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Этажи: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Вся система": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
            },
            ГВС: {
                "Тех.подполье/тех.этаж": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Транзит питающий": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Чердак: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Этажи: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Вся система": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
            },
            ХВС: {
                "Тех.подполье/тех.этаж": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Транзит питающий": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Внутренний пожарный водопровод": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Этажи: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Вся система": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
            },
            Канализация: {
                "Тех.подполье/тех.этаж": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                Этажи: {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
                "Вся система": {
                    Рекомендации: "",
                    "Треб. объем, %": "",
                    "Выполнен, год": "",
                    "Факт. объем, %": "",
                },
            },
            Мусоропроводы: {
                Рекомендации: window.appVariables.recomend.musoroprovody.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.musoroprovody.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.musoroprovody.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.musoroprovody.factObjom.value,
            },
            "Система промывки и прочистки стволов мусоропроводов": {
                Рекомендации: window.appVariables.recomend.musoroChistSistema.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.musoroChistSistema.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.musoroChistSistema.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.musoroChistSistema.factObjom.value,
            },
            "Вентиляц.": {
                Рекомендации: window.appVariables.recomend.ventilacia.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.ventilacia.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.ventilacia.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.ventilacia.factObjom.value,
            },
            Газоходы: {
                Рекомендации: window.appVariables.recomend.gazohody.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.gazohody.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.gazohody.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.gazohody.factObjom.value,
            },
            Лифты: {
                Рекомендации: window.appVariables.recomend.lifty.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.lifty.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.lifty.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.lifty.factObjom.value,
            },
            "Подъёмное устройство для маломобильной группы населения": {
                Рекомендации: window.appVariables.recomend.podyomnik.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.podyomnik.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.podyomnik.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.podyomnik.factObjom.value,
            },
            "Устройство для автоматического опускания лифта": {
                Рекомендации: window.appVariables.recomend.autoSpuskLift.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.autoSpuskLift.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.autoSpuskLift.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.autoSpuskLift.factObjom.value,
            },
            "Система ЭС (ВРУ)": {
                Рекомендации: window.appVariables.recomend.systemEs.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.systemEs.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.systemEs.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.systemEs.factObjom.value,
            },
            "ВКВ (второй кабельный ввод)": {
                Рекомендации: window.appVariables.recomend.vkv.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.vkv.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.vkv.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.vkv.factObjom.value,
            },
            "АВР (автоматическое включение резервного питания)": {
                Рекомендации: window.appVariables.recomend.avr.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.avr.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.avr.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.avr.factObjom.value,
            },
            ППАиДУ: {
                Рекомендации: window.appVariables.recomend.ppaidu.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.ppaidu.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.ppaidu.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.ppaidu.factObjom.value,
            },
            "Система оповещения о пожаре": {
                Рекомендации: window.appVariables.recomend.pozharOpoveshen.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.pozharOpoveshen.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.pozharOpoveshen.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.pozharOpoveshen.factObjom.value,
            },
            ГС: {
                Рекомендации: window.appVariables.recomend.gs.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.gs.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.gs.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.gs.factObjom.value,
            },
            "Связь с ОДС": {
                Рекомендации: window.appVariables.recomend.ods.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.ods.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.ods.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.ods.factObjom.value,
            },
            "Система видеонаблюдения": {
                Рекомендации: window.appVariables.recomend.videonab.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.videonab.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.videonab.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.videonab.factObjom.value,
            },
            "ОЗДС(охранно-защитная дератизационная система)": {
                Рекомендации: window.appVariables.recomend.ozds.recomend.value,
                "Треб. объем, %": window.appVariables.recomend.ozds.trebObjom.value,
                "Выполнен, год": window.appVariables.recomend.ozds.vypolnenGod.value,
                "Факт. объем, %": window.appVariables.recomend.ozds.factObjom.value,
            },
            "Общий вывод: Рекомендации по выполнению объемов капитального ремонта": window.appVariables.recomend.obshiyVivod.value,
        },
        "Результаты выборочного обследования": {
            Крыша: {
                "Конструкция крыши": window.appVariables.roofConstruction.value,
                "Материал кровли": window.appVariables.roofMaterial.value,
                "Площадь кровли, м²": window.appVariables.roofSquare.value,
                Кровля: {
                    "Выявленные дефекты": window.appVariables.krovlyaDefecty.value,
                    "Оценка пред.": window.appVariables.krovlyaProshlOcenka.textContent,
                    "% деф. части": window.appVariables.krovlyaPercent.value,
                    Оценка: window.appVariables.krovlyaOcenka.value,
                },
                Свесы: {
                    "Выявленные дефекты": window.appVariables.svesyDefecty.value,
                    "Оценка пред.": window.appVariables.svesyProshlOcenka.textContent,
                    "% деф. части": window.appVariables.svesyPercent.value,
                    Оценка: window.appVariables.svesyOcenka.value,
                },
                "Стропильная система": {
                    "Выявленные дефекты": window.appVariables.stropilnayaSistemaDefecty.value,
                    "Оценка пред.": window.appVariables.stropilnayaSistemaProshlOcenka.textContent,
                    "% деф. части": window.appVariables.stropilnayaSistemaPercent.value,
                    Оценка: window.appVariables.stropilnayaSistemaOcenka.value,
                },
                Чердак: {
                    "Выявленные дефекты": window.appVariables.cherdakDefecty.value,
                    "Оценка пред.": window.appVariables.cherdakProshlOcenka.textContent,
                    "% деф. части": window.appVariables.cherdakPercent.value,
                    Оценка: window.appVariables.cherdakOcenka.value,
                },
                "Покрытие ж/б": {
                    "Выявленные дефекты": window.appVariables.pokritieJBDefecty.value,
                    "Оценка пред.": window.appVariables.pokritieJBProshlOcenka.textContent,
                    "% деф. части": window.appVariables.pokritieJBPercent.value,
                    Оценка: window.appVariables.pokritieJBOcenka.value,
                },
                "Все элементы": {
                    "Выявленные дефекты": window.appVariables.vsyaKrishaDefecty.value,
                    "Оценка пред.": window.appVariables.vsyaKrishaProshlOcenka.textContent,
                    "% деф. части": window.appVariables.vsyaKrishaPercent.value,
                    Оценка: window.appVariables.vsyaKrishaOcenka.value,
                },
            },
            Водоотвод: {
                "Тип водоотвода": window.appVariables.vodootvodType.value,
                "Материал водоотвода": window.appVariables.vodootvodMaterial.value,
                "Выявленные дефекты": window.appVariables.vodootvodDefecty.value,
                "Оценка пред.": window.appVariables.vodootvodProshlOcenka.textContent,
                "% деф. части": window.appVariables.vodootvodPercent.value,
                Оценка: window.appVariables.vodootvodOcenka.value,
            },
            "Межпанельные стыки": {
                "Тип стыков": window.appVariables.majpanelnyeStykiType.value,
                "Выявленные дефекты": window.appVariables.majpanelnyeStykiDefecty.value,
                "Оценка пред.": window.appVariables.majpanelnyeStykiProshlOcenka.textContent,
                "% деф. части": window.appVariables.majpanelnyeStykiPercent.value,
                Оценка: window.appVariables.majpanelnyeStykiOcenka.value,
            },
            Фасад: {
                "Площадь фасада, м²": window.appVariables.fasadSquare.value,
                "Отделка стен": window.appVariables.fasadOtdelkaSten.value,
                "Отделка цоколя": window.appVariables.fasadOblicovkaTsokolya.value,
                "Оконные заполнения": window.appVariables.fasadOkonnyeZapolneniya.value,
                "Выявленные дефекты": window.appVariables.fasadDefecty.value,
                "Оценка пред.": window.appVariables.fasadProshlOcenka.textContent,
                "% деф. части": window.appVariables.fasadPercent.value,
                Оценка: window.appVariables.fasadOcenka.value,
            },
            Балконы: {
                "Количество балконов": window.appVariables.balkonyKolich.value,
                "Количество лоджий": window.appVariables.balkonyLojii.value,
                "Козырьков над входами": window.appVariables.balkonyKozirkovVhody.value,
                "Козырьков на верхних этажах": window.appVariables.balkonyKozirkovVerh.value,
                "Козырьков непроектных": window.appVariables.balkonyKozirkovNeproekt.value,
                "Количество эркеров": window.appVariables.balkonyErkerovKolich.value,

                Балконы: {
                    "Выявленные дефекты": window.appVariables.balkonyDefecty.value,
                    "Оценка пред.": window.appVariables.balkonyProshlOcenka.textContent,
                    "% деф. части": window.appVariables.balkonyPercent.value,
                    Оценка: window.appVariables.balkonyOcenka.value,
                },
                Лоджии: {
                    "Выявленные дефекты": window.appVariables.lodjiiDefecty.value,
                    "Оценка пред.": window.appVariables.lodjiiProshlOcenka.textContent,
                    "% деф. части": window.appVariables.lodjiiPercent.value,
                    Оценка: window.appVariables.lodjiiOcenka.value,
                },
                Козырьки: {
                    "Выявленные дефекты": window.appVariables.kozirkiDefecty.value,
                    "Оценка пред.": window.appVariables.kozirkiProshlOcenka.textContent,
                    "% деф. части": window.appVariables.kozirkiPercent.value,
                    Оценка: window.appVariables.kozirkiOcenka.value,
                },
                Эркеры: {
                    "Выявленные дефекты": window.appVariables.erkeryDefecty.value,
                    "Оценка пред.": window.appVariables.erkeryProshlOcenka.textContent,
                    "% деф. части": window.appVariables.erkeryPercent.value,
                    Оценка: window.appVariables.erkeryOcenka.value,
                },
                "Все элементы": {
                    "Выявленные дефекты": window.appVariables.vseBalkonyDefecty.value,
                    "Оценка пред.": window.appVariables.vseBalkonyProshlOcenka.textContent,
                    "% деф. части": window.appVariables.vseBalkonyPercent.value,
                    Оценка: window.appVariables.vseBalkonyOcenka.value,
                },
            },
            Стены: {
                "Материал стен": window.appVariables.stenyMaterial.value,
                "Теплофизические свойства": window.appVariables.stenyTeploFizSvoistva.value,

                "Выявленные дефекты": window.appVariables.stenyDefecty.value,
                "Оценка пред.": window.appVariables.stenyProshlOcenka.textContent,
                "% деф. части": window.appVariables.stenyPercent.value,
                Оценка: window.appVariables.stenyOcenka.value,
            },
            Подвал: {
                "Наличие подвала": window.appVariables.podvalNalichie.value,
                "Площадь, м²": window.appVariables.podvalSquare.value,

                "Выявленные дефекты": window.appVariables.podvalDefecty.value,
                "Оценка пред.": window.appVariables.podvalProshlOcenka.textContent,
                "% деф. части": window.appVariables.podvalPercent.value,
                Оценка: window.appVariables.podvalOcenka.value,
            },
            "Тех.подполье": {
                "Наличие тех.подполья": window.appVariables.techPodpolieNalichie.value,

                "Выявленные дефекты": window.appVariables.techPodpolieDefecty.value,
                "Оценка пред.": window.appVariables.techPodpolieProshlOcenka.textContent,
                "% деф. части": window.appVariables.techPodpoliePercent.value,
                Оценка: window.appVariables.techPodpolieOcenka.value,
            },
            "Тех.этаж": {
                "Наличие тех.этажа": window.appVariables.techEtajNalichie.value,
                "Местонахождение, этаж": window.appVariables.techEtajMesto.value,

                "Выявленные дефекты": window.appVariables.techEtajDefecty.value,
                "Оценка пред.": window.appVariables.techEtajProshlOcenka.textContent,
                "% деф. части": window.appVariables.techEtajPercent.value,
                Оценка: window.appVariables.techEtajOcenka.value,
            },
            "Гараж стоянка (подземный)": {
                Тип: window.appVariables.garageType.value,
                "Площадь,м²": window.appVariables.garageSquare.value,
                "Этажность, эт": window.appVariables.garageEtagnost.value,
                "Количество маш.мест, шт": window.appVariables.garageKolichestvoMashin.value,

                "Выявленные дефекты": window.appVariables.garageDefecty.value,
                "Оценка пред.": window.appVariables.garageProshlOcenka.textContent,
                "% деф. части": window.appVariables.garagePercent.value,
                Оценка: window.appVariables.garageOcenka.value,
            },
            "Места общего пользования": {
                "Пандусы наружные, шт": window.appVariables.mopPandusyNaruzhKolich.value,
                "Пандусы внутренние, шт": window.appVariables.mopPandusyVnutrKolich.value,
                "Сходы-съезды, шт.": window.appVariables.mopShodySiezdyKolich.value,

                Вестибюли: {
                    "Выявленные дефекты": window.appVariables.mopVestibuliDefecty.value,
                    "Оценка пред.": window.appVariables.mopVestibuliProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopVestibuliPercent.value,
                    Оценка: window.appVariables.mopVestibuliOcenka.value,
                },
                Крыльца: {
                    "Выявленные дефекты": window.appVariables.mopKrilcaDefecty.value,
                    "Оценка пред.": window.appVariables.mopKrilcaProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopKrilcaPercent.value,
                    Оценка: window.appVariables.mopKrilcaOcenka.value,
                },
                "Пандусы наружные": {
                    "Выявленные дефекты": window.appVariables.mopPandusyNaruzhnieDefecty.value,
                    "Оценка пред.": window.appVariables.mopPandusyNaruzhnieProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopPandusyNaruzhniePercent.value,
                    Оценка: window.appVariables.mopPandusyNaruzhnieOcenka.value,
                },
                "Пандусы внутри-подъездные": {
                    "Выявленные дефекты": window.appVariables.mopPandusyVnutrennieDefecty.value,
                    "Оценка пред.": window.appVariables.mopPandusyVnutrennieProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopPandusyVnutrenniePercent.value,
                    Оценка: window.appVariables.mopPandusyVnutrennieOcenka.value,
                },
                "Сходы/съезды": {
                    "Выявленные дефекты": window.appVariables.mopShodySiezdyDefecty.value,
                    "Оценка пред.": window.appVariables.mopShodySiezdyProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopShodySiezdyPercent.value,
                    Оценка: window.appVariables.mopShodySiezdyOcenka.value,
                },
                "Окна, двери": {
                    "Выявленные дефекты": window.appVariables.mopOknaDveriDefecty.value,
                    "Оценка пред.": window.appVariables.mopOknaDveriProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopOknaDveriPercent.value,
                    Оценка: window.appVariables.mopOknaDveriOcenka.value,
                },
                "Внутренняя отделка помещений": {
                    "Выявленные дефекты": window.appVariables.mopVnOtdelkaPomeshDefecty.value,
                    "Оценка пред.": window.appVariables.mopVnOtdelkaPomeshProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopVnOtdelkaPomeshPercent.value,
                    Оценка: window.appVariables.mopVnOtdelkaPomeshOcenka.value,
                },
                "Все элементы": {
                    "Выявленные дефекты": window.appVariables.mopVseElementyDefecty.value,
                    "Оценка пред.": window.appVariables.mopVseElementyProshlOcenka.textContent,
                    "% деф. части": window.appVariables.mopVseElementyPercent.value,
                    Оценка: window.appVariables.mopVseElementyOcenka.value,
                },
            },
            Лестницы: {
                Конструкция: window.appVariables.lestnicyConstruction.value,

                "Выявленные дефекты": window.appVariables.lestnicyDefecty.value,
                "Оценка пред.": window.appVariables.lestnicyProshlOcenka.textContent,
                "% деф. части": window.appVariables.lestnicyPercent.value,
                Оценка: window.appVariables.lestnicyOcenka.value,
            },
            Перекрытия: {
                "Материал перекрытия": window.appVariables.perekrityaMaterial.value,

                "Выявленные дефекты": window.appVariables.perekrityaDefecty.value,
                "Оценка пред.": window.appVariables.perekrityaProshlOcenka.textContent,
                "% деф. части": window.appVariables.perekrityaPercent.value,
                Оценка: window.appVariables.perekrityaOcenka.value,
            },
            "Система отопления": {
                "Вид отопления": window.appVariables.otopleniyeVid.value,
                "Материал трубопроводов": window.appVariables.otopleniyeMaterial.value,
                "Тип приборов": window.appVariables.otopleniyeTypePribor.value,
                "Термо-регуляторы в квартирах": window.appVariables.otopleniyeTermoRegulKvartir.value,
                "Наличие АУУ, шт": window.appVariables.otopleniyeAuu.value,
                "Наличие ОДУУ": window.appVariables.otopleniyeOduu.value,
                "Элеваторный узел, шт": window.appVariables.otopleniyeElevUzel.value,
                "Тепловой узел, шт": window.appVariables.otopleniyeTeplovoyUzel.value,
                "Тип стояков": window.appVariables.otopleniyeTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": window.appVariables.otopleniyeTehPodpolieDefecty.value,
                    "Оценка пред.": window.appVariables.otopleniyeTehPodpolieProshlOcenka.textContent,
                    "% деф. части": window.appVariables.otopleniyeTehPodpoliePercent.value,
                    Оценка: window.appVariables.otopleniyeTehPodpolieOcenka.value,
                },
                "Транзит питающий": {
                    "Выявленные дефекты": window.appVariables.otopleniyeTranzitPitaushDefecty.value,
                    "Оценка пред.": window.appVariables.otopleniyeTranzitPitaushProshlOcenka.textContent,
                    "% деф. части": window.appVariables.otopleniyeTranzitPitaushPercent.value,
                    Оценка: window.appVariables.otopleniyeTranzitPitaushOcenka.value,
                },
                Чердак: {
                    "Выявленные дефекты": window.appVariables.otopleniyeCherdakDefecty.value,
                    "Оценка пред.": window.appVariables.otopleniyeCherdakProshlOcenka.textContent,
                    "% деф. части": window.appVariables.otopleniyeCherdakPercent.value,
                    Оценка: window.appVariables.otopleniyeCherdakOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": window.appVariables.otopleniyeEtajiDefecty.value,
                    "Оценка пред.": window.appVariables.otopleniyeEtajiProshlOcenka.textContent,
                    "% деф. части": window.appVariables.otopleniyeEtajiPercent.value,
                    Оценка: window.appVariables.otopleniyeEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": window.appVariables.vseOtopleniyeDefecty.value,
                    "Оценка пред.": window.appVariables.vseOtopleniyeProshlOcenka.textContent,
                    "% деф. части": window.appVariables.vseOtopleniyePercent.value,
                    Оценка: window.appVariables.vseOtopleniyeOcenka.value,
                },
            },
            ГВС: {
                "Тип системы": window.appVariables.gvsType.value,
                "Материал трубопроводов": window.appVariables.gvsMaterial.value,
                "Наличие ОДУУ": window.appVariables.gvsOduu.value,
                "Тип стояков": window.appVariables.gvsTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": window.appVariables.gvsTehPodpolieDefecty.value,
                    "Оценка пред.": window.appVariables.gvsTehPodpolieProshlOcenka.textContent,
                    "% деф. части": window.appVariables.gvsTehPodpoliePercent.value,
                    Оценка: window.appVariables.gvsTehPodpolieOcenka.value,
                },
                "Транзит питающий": {
                    "Выявленные дефекты": window.appVariables.gvsTranzitPitaushDefecty.value,
                    "Оценка пред.": window.appVariables.gvsTranzitPitaushProshlOcenka.textContent,
                    "% деф. части": window.appVariables.gvsTranzitPitaushPercent.value,
                    Оценка: window.appVariables.gvsTranzitPitaushOcenka.value,
                },
                Чердак: {
                    "Выявленные дефекты": window.appVariables.gvsCherdakDefecty.value,
                    "Оценка пред.": window.appVariables.gvsCherdakProshlOcenka.textContent,
                    "% деф. части": window.appVariables.gvsCherdakPercent.value,
                    Оценка: window.appVariables.gvsCherdakOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": window.appVariables.gvsEtajiDefecty.value,
                    "Оценка пред.": window.appVariables.gvsEtajiProshlOcenka.textContent,
                    "% деф. части": window.appVariables.gvsEtajiPercent.value,
                    Оценка: window.appVariables.gvsEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": window.appVariables.vseGvsDefecty.value,
                    "Оценка пред.": window.appVariables.vseGvsProshlOcenka.textContent,
                    "% деф. части": window.appVariables.vseGvsPercent.value,
                    Оценка: window.appVariables.vseGvsOcenka.value,
                },
            },
            ХВС: {
                "Материал трубопроводов": window.appVariables.hvsMaterial.value,
                "Наличие ОДУУ": window.appVariables.hvsOduu.value,
                "Тип стояков": window.appVariables.hvsTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": window.appVariables.hvsTehPodpolieDefecty.value,
                    "Оценка пред.": window.appVariables.hvsTehPodpolieProshlOcenka.textContent,
                    "% деф. части": window.appVariables.hvsTehPodpoliePercent.value,
                    Оценка: window.appVariables.hvsTehPodpolieOcenka.value,
                },
                "Транзит питающий": {
                    "Выявленные дефекты": window.appVariables.hvsTranzitPitaushDefecty.value,
                    "Оценка пред.": window.appVariables.hvsTranzitPitaushProshlOcenka.textContent,
                    "% деф. части": window.appVariables.hvsTranzitPitaushPercent.value,
                    Оценка: window.appVariables.hvsTranzitPitaushOcenka.value,
                },
                "Внутренний пожарный водопровод": {
                    "Выявленные дефекты": window.appVariables.hvsVnPozharProvodDefecty.value,
                    "Оценка пред.": window.appVariables.hvsVnPozharProvodProshlOcenka.textContent,
                    "% деф. части": window.appVariables.hvsVnPozharProvodPercent.value,
                    Оценка: window.appVariables.hvsVnPozharProvodOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": window.appVariables.hvsEtajiDefecty.value,
                    "Оценка пред.": window.appVariables.hvsEtajiProshlOcenka.textContent,
                    "% деф. части": window.appVariables.hvsEtajiPercent.value,
                    Оценка: window.appVariables.hvsEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": window.appVariables.vseHvsDefecty.value,
                    "Оценка пред.": window.appVariables.vseHvsProshlOcenka.textContent,
                    "% деф. части": window.appVariables.vseHvsPercent.value,
                    Оценка: window.appVariables.vseHvsOcenka.value,
                },
            },
            Канализация: {
                "Материал трубопроводов": window.appVariables.kanalizaciaMaterial.value,
                "Тип стояков": window.appVariables.kanalizaciaTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": window.appVariables.kanalizaciaTehPodpolieDefecty.value,
                    "Оценка пред.": window.appVariables.kanalizaciaTehPodpolieProshlOcenka.textContent,
                    "% деф. части": window.appVariables.kanalizaciaTehPodpoliePercent.value,
                    Оценка: window.appVariables.kanalizaciaTehPodpolieOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": window.appVariables.kanalizaciaEtajiDefecty.value,
                    "Оценка пред.": window.appVariables.kanalizaciaEtajiProshlOcenka.textContent,
                    "% деф. части": window.appVariables.kanalizaciaEtajiPercent.value,
                    Оценка: window.appVariables.kanalizaciaEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": window.appVariables.vseKanalizaciaDefecty.value,
                    "Оценка пред.": window.appVariables.vseKanalizaciaProshlOcenka.textContent,
                    "% деф. части": window.appVariables.vseKanalizaciaPercent.value,
                    Оценка: window.appVariables.vseKanalizaciaOcenka.value,
                },
            },
            Мусоропроводы: {
                Мусоропроводы: window.appVariables.musoroprovodyMesto.value,
                Мусорокамеры: window.appVariables.musoroprovodyKamery.value,

                "Выявленные дефекты": window.appVariables.musoroprovodyDefecty.value,
                "Оценка пред.": window.appVariables.musoroprovodyProshlOcenka.textContent,
                "% деф. части": window.appVariables.musoroprovodyPercent.value,
                Оценка: window.appVariables.musoroprovodyOcenka.value,
            },
            "Связь с ОДС": {
                Тип: window.appVariables.odsType.value,
                Состояние: window.appVariables.odsSostoyanie.value,

                "Выявленные дефекты": window.appVariables.odsDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.odsPosledneeObsled.value,
                "Специализированная организация": window.appVariables.odsOrganizacia.value,
                "Оценка пред.": window.appVariables.odsProshlOcenka.textContent,
                Оценка: window.appVariables.odsOcenka.value,
            },
            Вентиляция: {
                Состояние: window.appVariables.ventilaciaSostoyanie.value,

                "Выявленные дефекты": window.appVariables.ventilaciaDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.ventilaciaPosledneeObsled.value,
                "Специализированная организация": window.appVariables.ventilaciaOrganizacia.value,
                "Оценка пред.": window.appVariables.ventilaciaProshlOcenka.textContent,
                Оценка: window.appVariables.ventilaciaOcenka.value,
            },
            "Система промывки и прочистки стволов мусоропроводов": {
                Наличие: window.appVariables.musoroChistSistemaNalichie.value,
                Состояние: window.appVariables.musoroChistSistemaSostoyanie.value,

                "Выявленные дефекты": window.appVariables.musoroChistSistemaDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.musoroChistSistemaPosledObsled.value,
                "Специализированная организация": window.appVariables.musoroChistSistemaOrganizacia.value,
                "Оценка пред.": window.appVariables.musoroChistSistemaProshlOcenka.textContent,
                Оценка: window.appVariables.musoroChistSistemaOcenka.value,
            },
            "ОЗДС (охранно-защитная дератизационная система)": {
                Наличие: window.appVariables.ozdsNalichie.value,
                Состояние: window.appVariables.ozdsSostoyanie.value,

                "Выявленные дефекты": window.appVariables.ozdsDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.ozdsPosledObsled.value,
                "Специализированная организация": window.appVariables.ozdsOrganizacia.value,
                "Оценка пред.": window.appVariables.ozdsProshlOcenka.textContent,
                Оценка: window.appVariables.ozdsOcenka.value,
            },
            Газоходы: {
                Наличие: window.appVariables.gazohodyNalichie.value,
                Состояние: window.appVariables.gazohodySostoyanie.value,

                "Выявленные дефекты": window.appVariables.gazohodyDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.gazohodyPosledObsled.value,
                "Специализированная организация": window.appVariables.gazohodyOrganizacia.value,
                "Оценка пред.": window.appVariables.gazohodyProshlOcenka.textContent,
                Оценка: window.appVariables.gazohodyOcenka.value,
            },
            Лифты: {
                "Пассажирские, шт": window.appVariables.liftyPass.value,
                "Грузопассажирские, шт": window.appVariables.liftyGruzPass.value,
                "В т.ч. навесные, шт": window.appVariables.liftyNavesnye.value,
                Состояние: window.appVariables.liftySostoyanie.value,

                "Выявленные дефекты": window.appVariables.liftyDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.liftyPosledObsled.value,
                "Специализированная организация": window.appVariables.liftyOrganizacia.value,
                "Оценка пред.": window.appVariables.liftyProshlOcenka.textContent,
                Оценка: window.appVariables.liftyOcenka.value,
            },
            "Подъёмное устройство для маломобильной группы населения": {
                "Кол-во, шт": window.appVariables.podyomnikKolich.value,
                Состояние: window.appVariables.podyomnikSostoyanie.value,

                "Выявленные дефекты": window.appVariables.podyomnikDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.podyomnikPosledObsled.value,
                "Специализированная организация": window.appVariables.podyomnikOrganizacia.value,
                "Оценка пред.": window.appVariables.podyomnikProshlOcenka.textContent,
                Оценка: window.appVariables.podyomnikOcenka.value,
            },
            "Устройство для автоматического опускания лифта": {
                Наличие: window.appVariables.autoSpuskLiftNalichie.value,
                Состояние: window.appVariables.autoSpuskLiftSostoyanie.value,

                "Выявленные дефекты": window.appVariables.autoSpuskLiftDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.autoSpuskLiftPosledObsled.value,
                "Специализированная организация": window.appVariables.autoSpuskLiftOrganizacia.value,
                "Оценка пред.": window.appVariables.autoSpuskLiftProshlOcenka.textContent,
                Оценка: window.appVariables.autoSpuskLiftOcenka.value,
            },
            "Система ЭС": {
                "Кол-во ВРУ, шт": window.appVariables.systemEsKolich.value,
                "Размещение ВРУ": window.appVariables.systemEsRazmeshenie.value,
                Состояние: window.appVariables.systemEsSostoyanie.value,

                "Выявленные дефекты": window.appVariables.systemEsDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.systemEsPosledObsled.value,
                "Специализированная организация": window.appVariables.systemEsOrganizacia.value,
                "Оценка пред.": window.appVariables.systemEsProshlOcenka.textContent,
                Оценка: window.appVariables.systemEsOcenka.value,
            },
            "ВКВ (второй кабельный ввод)": {
                Наличие: window.appVariables.vkvNalichie.value,
                Состояние: window.appVariables.vkvSostoyanie.value,

                "Выявленные дефекты": window.appVariables.vkvDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.vkvPosledObsled.value,
                "Специализированная организация": window.appVariables.vkvOrganizacia.value,
                "Оценка пред.": window.appVariables.vkvProshlOcenka.textContent,
                Оценка: window.appVariables.vkvOcenka.value,
            },
            "АВР (автоматическое включение резервного питания)": {
                Наличие: window.appVariables.avrNalichie.value,
                Состояние: window.appVariables.avrSostoyanie.value,

                "Выявленные дефекты": window.appVariables.avrDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.avrPosledObsled.value,
                "Специализированная организация": window.appVariables.avrOrganizacia.value,
                "Оценка пред.": window.appVariables.avrProshlOcenka.textContent,
                Оценка: window.appVariables.avrOcenka.value,
            },
            ППАиДУ: {
                Тип: window.appVariables.ppaiduType.value,
                Состояние: window.appVariables.ppaiduSostoyanie.value,

                "Выявленные дефекты": window.appVariables.ppaiduDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.ppaiduPosledObsled.value,
                "Специализированная организация": window.appVariables.ppaiduOrganizacia.value,
                "Оценка пред.": window.appVariables.ppaiduProshlOcenka.textContent,
                Оценка: window.appVariables.ppaiduOcenka.value,
            },
            "Система оповещения о пожаре": {
                Наличие: window.appVariables.pozharOpoveshenNalichie.value,
                Состояние: window.appVariables.pozharOpoveshenSostoyanie.value,

                "Выявленные дефекты": window.appVariables.pozharOpoveshenDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.pozharOpoveshenPosledObsled.value,
                "Специализированная организация": window.appVariables.pozharOpoveshenOrganizacia.value,
                "Оценка пред.": window.appVariables.pozharOpoveshenProshlOcenka.textContent,
                Оценка: window.appVariables.pozharOpoveshenOcenka.value,
            },
            "Система ГС": {
                Вводы: window.appVariables.sistemaGsVvody.value,
                Разводка: window.appVariables.sistemaGsRazvodka.value,
                Состояние: window.appVariables.sistemaGsSostoyanie.value,

                "Выявленные дефекты": window.appVariables.sistemaGsDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.sistemaGsPosledObsled.value,
                "Специализированная организация": window.appVariables.sistemaGsOrganizacia.value,
                "Оценка пред.": window.appVariables.sistemaGsProshlOcenka.textContent,
                Оценка: window.appVariables.sistemaGsOcenka.value,
            },
            "Система видеонаблюдения": {
                Место: window.appVariables.sistemaVideonabMesto.value,
                Состояние: window.appVariables.sistemaGsSostoyanie.value,

                "Выявленные дефекты": window.appVariables.sistemaVideonabDefecty.value,
                "№ и дата последнего обслед.": window.appVariables.sistemaVideonabPosledObsled.value,
                "Специализированная организация": window.appVariables.sistemaVideonabOrganizacia.value,
                "Оценка пред.": window.appVariables.sistemaVideonabProshlOcenka.textContent,
                Оценка: window.appVariables.sistemaVideonabOcenka.value,
            },
            "Дополнительные данные": window.appVariables.dopolnitDannye.value,
            "Выполнено обследование": window.appVariables.obsledVypolneno.value,
            "Рекомендации по утеплению стен": window.appVariables.recomendatciiPoUtepleniuSten.value,
        },
        "Выводы по результатам обследования": {
            "Техническое состояние (приведенная оценка) здания (в целом)": window.appVariables.tehSostoyanieZdania.value,
            "РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам": window.appVariables.recomendatciiPoDopRabotam.value,
        },
        "Подписывающие лица": {
            "Представители от": {
                1: "",
                2: "",
                3: "",
                4: "",
            },
            "Должность и наименование организации": {
                1: "",
                2: "",
                3: "",
                4: "",
            },
            "ФИО должностного лица": {
                1: "",
                2: "",
                3: "",
                4: "",
            },
        },
    };

    // Для тех заключений и проектов
    for (let i = 0; i < window.appVariables.repairProjectsTableRows.length; i++) {
        if (i < 2 || window.appVariables.repairProjectsTableRows[i].classList.contains("gridBGTotal")) {
            continue;
        }
        if (i > 1) {
            data["Технические заключения и проекты ремонтов"][i]["Организация"] = window.appVariables["tehZakluchenia"][i]["organizacia"].value;
            data["Технические заключения и проекты ремонтов"][i]["Дата, №"] = window.appVariables["tehZakluchenia"][i]["dataNomer"].value;
            data["Технические заключения и проекты ремонтов"][i]["Наименование, содержание"] = window.appVariables["tehZakluchenia"][i]["naimenovanieSoderjanie"].value;
        }
    }

    // Для выводов по результатам пред. обследования
    for (let key in window.appVariables.vivodyPoRezultatam) {
        data["Выводы по результатам предыдущего обследования"][key] = new Object();
        data["Выводы по результатам предыдущего обследования"][key]["id"] = window.appVariables["vivodyPoRezultatam"][key]["id"].textContent;
        data["Выводы по результатам предыдущего обследования"][key]["Дата"] = window.appVariables["vivodyPoRezultatam"][key]["data"].textContent;
        data["Выводы по результатам предыдущего обследования"][key]["№"] = window.appVariables["vivodyPoRezultatam"][key]["number"].textContent;
        data["Выводы по результатам предыдущего обследования"][key]["Техническое состояние здания в целом"] = window.appVariables["vivodyPoRezultatam"][key]["tehSostoyanie"].textContent;
    }

    // РЕКОМЕНДАЦИИ ПО КАП РЕМОНТУ
    // Крыша
    for (let key in window.appVariables.recomend.krisha) {
        const neededObj = window.appVariables.recomend.krisha[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Балконы
    for (let key in window.appVariables.recomend.balkony) {
        const neededObj = window.appVariables.recomend.balkony[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Места общего пользования
    for (let key in window.appVariables.recomend.mop) {
        const neededObj = window.appVariables.recomend.mop[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Системы отопления
    for (let key in window.appVariables.recomend.sistemaOtoplenia) {
        const neededObj = window.appVariables.recomend.sistemaOtoplenia[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // ГВС
    for (let key in window.appVariables.recomend.gvs) {
        const neededObj = window.appVariables.recomend.gvs[key];
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // ХВС
    for (let key in window.appVariables.recomend.hvs) {
        const neededObj = window.appVariables.recomend.hvs[key];
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Канализация
    for (let key in window.appVariables.recomend.kanalizacia) {
        const neededObj = window.appVariables.recomend.kanalizacia[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }

    for (let counter = 1; counter <= 4; counter++) {
        const neededObj = window.appVariables[counter];
        data["Подписывающие лица"]["Представители от"][counter] = neededObj["licaOt"].value;
        data["Подписывающие лица"]["ФИО должностного лица"][counter] = neededObj["licaFio"].value;
        data["Подписывающие лица"]["Должность и наименование организации"][counter] = neededObj["LicaDoljnost"].value;
    }

    localStorage.setItem("MJIDATA", JSON.stringify(data));

    window.appVariables.copyButton.textContent = "Скопировано";
    window.appVariables.copyButton.classList.add("main__button_done");
    setTimeout(() => {
        window.appVariables.copyButton.textContent = "Копирование отчета";
        window.appVariables.copyButton.classList.remove("main__button_done");
    }, 1500);
}