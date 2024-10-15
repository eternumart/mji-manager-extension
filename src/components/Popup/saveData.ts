import { appVariables } from "./constants";
import { searchAllInputs } from "./searchAllInputs";
import { buttonError } from "./buttonError";
import { appData } from ".";

export const saveData = () => {
    if (!appData.availableFunctions.saveData) {
        return;
    }
    // Если страница не подходит для сохранения - выдаем ошибку и выходим из функции
    if (!buttonError(appVariables.copyButton, appVariables.currentPage, "main", "Копирование отчета")) {
        return;
    }

    // обновляем все значения объекта переменных
    searchAllInputs();
    interface data {
        [key: string]: any;
    }
    const data: data = {
        address: {
            area: appVariables.area,
            district: appVariables.district,
            address: appVariables.address,
        },
        "Паспортные данные": {
            "Количество этажей": appVariables.passportDannye.etajei.value,
            "Количество подъездов": appVariables.passportDannye.podjezdov.value,
            "Строительный объем здания": appVariables.passportDannye.stroyObjem.value,
            "Кол-во квартир": appVariables.passportDannye.kvartir.value,
            "Площадь полезная": appVariables.passportDannye.poleznayaPloschad.value,
            "Площадь в жилых помещениях": appVariables.passportDannye.jilayaPloschad.value,
            "Площадь в нежилых помещениях": appVariables.passportDannye.neJilayaPloschad.value,
            "Серия проекта": appVariables.passportDannye.seriyaProekta.value,
            "Год постройки": appVariables.passportDannye.godPostrioki.value,
            "Год реконструкции": appVariables.passportDannye.godRekonstrukcii.value,
            "Класс энергетической эффективности здания": appVariables.passportDannye.klassEnergoeffectivnosti.value,
            "Физический износ (%) по данным БТИ": appVariables.passportDannye.fizIznos.value,
            "по данным БТИ на дату": appVariables.passportDannye.dannyeBtiData.value,
            "Наличие встроенных инженерных сооружений": appVariables.passportDannye.nalichVstroenSooruj.value,
            "Кол-во встроенных инженерных сооружений": appVariables.passportDannye.kolichVstroenSooruj.value,
            "Кол-во надстроенных инженерных сооружений": appVariables.passportDannye.kolichNadstroenSooruj.value,
            ТП: appVariables.passportDannye.tp.value,
            "в т.ч. масляные ТП": appVariables.passportDannye.maslyanieTp.value,
            "Магистрали транзитные": appVariables.passportDannye.magistraliTranzit.value,
            "Факт. уд. потребление тепловой эн., Гкал/м²": appVariables.passportDannye.potreblenieTeplaFact.value,
            "Проект. уд. потребление тепловой эн., кДж/(м²×град.×сут.)": appVariables.passportDannye.potreblenieTeplaProekt.value,
            "Величина отклонения (%)": appVariables.passportDannye.potreblenieTeplaOtklonenie.value,
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
                Рекомендации: appVariables.recomend.vodootvod.recomend.value,
                "Треб. объем, %": appVariables.recomend.vodootvod.trebObjom.value,
                "Выполнен, год": appVariables.recomend.vodootvod.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.vodootvod.factObjom.value,
            },
            Герметизация: {
                Рекомендации: appVariables.recomend.germetizacia.recomend.value,
                "Треб. объем, %": appVariables.recomend.germetizacia.trebObjom.value,
                "Выполнен, год": appVariables.recomend.germetizacia.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.germetizacia.factObjom.value,
            },
            Фасад: {
                Рекомендации: appVariables.recomend.fasad.recomend.value,
                "Треб. объем, %": appVariables.recomend.fasad.trebObjom.value,
                "Выполнен, год": appVariables.recomend.fasad.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.fasad.factObjom.value,
                "Остекление оконных заполнений фасада": appVariables.recomendationsDone.querySelector("#lookupTextcomp_12601").value,
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
                "Остекление балконов": appVariables.recomend.balkony.balkony.osteklenie.value,
                "Остекление лоджий": appVariables.recomend.balkony.lodjii.osteklenie.value,
            },
            Стены: {
                Рекомендации: appVariables.recomend.steny.recomend.value,
                "Треб. объем, %": appVariables.recomend.steny.trebObjom.value,
                "Выполнен, год": appVariables.recomend.steny.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.steny.factObjom.value,
                "Утепление стен": appVariables.recomend.steny.uteplenie.value,
            },
            Подвал: {
                Рекомендации: appVariables.recomend.podval.recomend.value,
                "Треб. объем, %": appVariables.recomend.podval.trebObjom.value,
                "Выполнен, год": appVariables.recomend.podval.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.podval.factObjom.value,
            },
            "Тех.подполье": {
                Рекомендации: appVariables.recomend.tehPodpolie.recomend.value,
                "Треб. объем, %": appVariables.recomend.tehPodpolie.trebObjom.value,
                "Выполнен, год": appVariables.recomend.tehPodpolie.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.tehPodpolie.factObjom.value,
            },
            "Тех.этаж": {
                Рекомендации: appVariables.recomend.tehEtaj.recomend.value,
                "Треб. объем, %": appVariables.recomend.tehEtaj.trebObjom.value,
                "Выполнен, год": appVariables.recomend.tehEtaj.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.tehEtaj.factObjom.value,
            },
            "Гараж стоянка (подземный)": {
                Рекомендации: appVariables.recomend.garage.recomend.value,
                "Треб. объем, %": appVariables.recomend.garage.trebObjom.value,
                "Выполнен, год": appVariables.recomend.garage.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.garage.factObjom.value,
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
                Рекомендации: appVariables.recomend.lestnicy.recomend.value,
                "Треб. объем, %": appVariables.recomend.lestnicy.trebObjom.value,
                "Выполнен, год": appVariables.recomend.lestnicy.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.lestnicy.factObjom.value,
            },
            Перекрытия: {
                Рекомендации: appVariables.recomend.perekritya.recomend.value,
                "Треб. объем, %": appVariables.recomend.perekritya.trebObjom.value,
                "Выполнен, год": appVariables.recomend.perekritya.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.perekritya.factObjom.value,
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
                Рекомендации: appVariables.recomend.musoroprovody.recomend.value,
                "Треб. объем, %": appVariables.recomend.musoroprovody.trebObjom.value,
                "Выполнен, год": appVariables.recomend.musoroprovody.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.musoroprovody.factObjom.value,
            },
            "Система промывки и прочистки стволов мусоропроводов": {
                Рекомендации: appVariables.recomend.musoroChistSistema.recomend.value,
                "Треб. объем, %": appVariables.recomend.musoroChistSistema.trebObjom.value,
                "Выполнен, год": appVariables.recomend.musoroChistSistema.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.musoroChistSistema.factObjom.value,
            },
            "Вентиляц.": {
                Рекомендации: appVariables.recomend.ventilacia.recomend.value,
                "Треб. объем, %": appVariables.recomend.ventilacia.trebObjom.value,
                "Выполнен, год": appVariables.recomend.ventilacia.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.ventilacia.factObjom.value,
            },
            Газоходы: {
                Рекомендации: appVariables.recomend.gazohody.recomend.value,
                "Треб. объем, %": appVariables.recomend.gazohody.trebObjom.value,
                "Выполнен, год": appVariables.recomend.gazohody.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.gazohody.factObjom.value,
            },
            Лифты: {
                Рекомендации: appVariables.recomend.lifty.recomend.value,
                "Треб. объем, %": appVariables.recomend.lifty.trebObjom.value,
                "Выполнен, год": appVariables.recomend.lifty.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.lifty.factObjom.value,
            },
            "Подъёмное устройство для маломобильной группы населения": {
                Рекомендации: appVariables.recomend.podyomnik.recomend.value,
                "Треб. объем, %": appVariables.recomend.podyomnik.trebObjom.value,
                "Выполнен, год": appVariables.recomend.podyomnik.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.podyomnik.factObjom.value,
            },
            "Устройство для автоматического опускания лифта": {
                Рекомендации: appVariables.recomend.autoSpuskLift.recomend.value,
                "Треб. объем, %": appVariables.recomend.autoSpuskLift.trebObjom.value,
                "Выполнен, год": appVariables.recomend.autoSpuskLift.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.autoSpuskLift.factObjom.value,
            },
            "Система ЭС (ВРУ)": {
                Рекомендации: appVariables.recomend.systemEs.recomend.value,
                "Треб. объем, %": appVariables.recomend.systemEs.trebObjom.value,
                "Выполнен, год": appVariables.recomend.systemEs.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.systemEs.factObjom.value,
            },
            "ВКВ (второй кабельный ввод)": {
                Рекомендации: appVariables.recomend.vkv.recomend.value,
                "Треб. объем, %": appVariables.recomend.vkv.trebObjom.value,
                "Выполнен, год": appVariables.recomend.vkv.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.vkv.factObjom.value,
            },
            "АВР (автоматическое включение резервного питания)": {
                Рекомендации: appVariables.recomend.avr.recomend.value,
                "Треб. объем, %": appVariables.recomend.avr.trebObjom.value,
                "Выполнен, год": appVariables.recomend.avr.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.avr.factObjom.value,
            },
            ППАиДУ: {
                Рекомендации: appVariables.recomend.ppaidu.recomend.value,
                "Треб. объем, %": appVariables.recomend.ppaidu.trebObjom.value,
                "Выполнен, год": appVariables.recomend.ppaidu.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.ppaidu.factObjom.value,
            },
            "Система оповещения о пожаре": {
                Рекомендации: appVariables.recomend.pozharOpoveshen.recomend.value,
                "Треб. объем, %": appVariables.recomend.pozharOpoveshen.trebObjom.value,
                "Выполнен, год": appVariables.recomend.pozharOpoveshen.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.pozharOpoveshen.factObjom.value,
            },
            ГС: {
                Рекомендации: appVariables.recomend.gs.recomend.value,
                "Треб. объем, %": appVariables.recomend.gs.trebObjom.value,
                "Выполнен, год": appVariables.recomend.gs.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.gs.factObjom.value,
            },
            "Связь с ОДС": {
                Рекомендации: appVariables.recomend.ods.recomend.value,
                "Треб. объем, %": appVariables.recomend.ods.trebObjom.value,
                "Выполнен, год": appVariables.recomend.ods.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.ods.factObjom.value,
            },
            "Система видеонаблюдения": {
                Рекомендации: appVariables.recomend.videonab.recomend.value,
                "Треб. объем, %": appVariables.recomend.videonab.trebObjom.value,
                "Выполнен, год": appVariables.recomend.videonab.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.videonab.factObjom.value,
            },
            "ОЗДС(охранно-защитная дератизационная система)": {
                Рекомендации: appVariables.recomend.ozds.recomend.value,
                "Треб. объем, %": appVariables.recomend.ozds.trebObjom.value,
                "Выполнен, год": appVariables.recomend.ozds.vypolnenGod.value,
                "Факт. объем, %": appVariables.recomend.ozds.factObjom.value,
            },
            "Общий вывод: Рекомендации по выполнению объемов капитального ремонта": appVariables.recomend.obshiyVivod.value,
        },
        "Результаты выборочного обследования": {
            Крыша: {
                "Конструкция крыши": appVariables.roofConstruction.value,
                "Материал кровли": appVariables.roofMaterial.value,
                "Площадь кровли, м²": appVariables.roofSquare.value,
                Кровля: {
                    "Выявленные дефекты": appVariables.krovlyaDefecty.value,
                    "Оценка пред.": appVariables.krovlyaProshlOcenka.textContent,
                    "% деф. части": appVariables.krovlyaPercent.value,
                    Оценка: appVariables.krovlyaOcenka.value,
                },
                Свесы: {
                    "Выявленные дефекты": appVariables.svesyDefecty.value,
                    "Оценка пред.": appVariables.svesyProshlOcenka.textContent,
                    "% деф. части": appVariables.svesyPercent.value,
                    Оценка: appVariables.svesyOcenka.value,
                },
                "Стропильная система": {
                    "Выявленные дефекты": appVariables.stropilnayaSistemaDefecty.value,
                    "Оценка пред.": appVariables.stropilnayaSistemaProshlOcenka.textContent,
                    "% деф. части": appVariables.stropilnayaSistemaPercent.value,
                    Оценка: appVariables.stropilnayaSistemaOcenka.value,
                },
                Чердак: {
                    "Выявленные дефекты": appVariables.cherdakDefecty.value,
                    "Оценка пред.": appVariables.cherdakProshlOcenka.textContent,
                    "% деф. части": appVariables.cherdakPercent.value,
                    Оценка: appVariables.cherdakOcenka.value,
                },
                "Покрытие ж/б": {
                    "Выявленные дефекты": appVariables.pokritieJBDefecty.value,
                    "Оценка пред.": appVariables.pokritieJBProshlOcenka.textContent,
                    "% деф. части": appVariables.pokritieJBPercent.value,
                    Оценка: appVariables.pokritieJBOcenka.value,
                },
                "Все элементы": {
                    "Выявленные дефекты": appVariables.vsyaKrishaDefecty.value,
                    "Оценка пред.": appVariables.vsyaKrishaProshlOcenka.textContent,
                    "% деф. части": appVariables.vsyaKrishaPercent.value,
                    Оценка: appVariables.vsyaKrishaOcenka.value,
                },
            },
            Водоотвод: {
                "Тип водоотвода": appVariables.vodootvodType.value,
                "Материал водоотвода": appVariables.vodootvodMaterial.value,
                "Выявленные дефекты": appVariables.vodootvodDefecty.value,
                "Оценка пред.": appVariables.vodootvodProshlOcenka.textContent,
                "% деф. части": appVariables.vodootvodPercent.value,
                Оценка: appVariables.vodootvodOcenka.value,
            },
            "Межпанельные стыки": {
                "Тип стыков": appVariables.majpanelnyeStykiType.value,
                "Выявленные дефекты": appVariables.majpanelnyeStykiDefecty.value,
                "Оценка пред.": appVariables.majpanelnyeStykiProshlOcenka.textContent,
                "% деф. части": appVariables.majpanelnyeStykiPercent.value,
                Оценка: appVariables.majpanelnyeStykiOcenka.value,
            },
            Фасад: {
                "Площадь фасада, м²": appVariables.fasadSquare.value,
                "Отделка стен": appVariables.fasadOtdelkaSten.value,
                "Отделка цоколя": appVariables.fasadOblicovkaTsokolya.value,
                "Оконные заполнения": appVariables.fasadOkonnyeZapolneniya.value,
                "Выявленные дефекты": appVariables.fasadDefecty.value,
                "Оценка пред.": appVariables.fasadProshlOcenka.textContent,
                "% деф. части": appVariables.fasadPercent.value,
                Оценка: appVariables.fasadOcenka.value,
            },
            Балконы: {
                "Количество балконов": appVariables.balkonyKolich.value,
                "Количество лоджий": appVariables.balkonyLojii.value,
                "Козырьков над входами": appVariables.balkonyKozirkovVhody.value,
                "Козырьков на верхних этажах": appVariables.balkonyKozirkovVerh.value,
                "Козырьков непроектных": appVariables.balkonyKozirkovNeproekt.value,
                "Количество эркеров": appVariables.balkonyErkerovKolich.value,

                Балконы: {
                    "Выявленные дефекты": appVariables.balkonyDefecty.value,
                    "Оценка пред.": appVariables.balkonyProshlOcenka.textContent,
                    "% деф. части": appVariables.balkonyPercent.value,
                    Оценка: appVariables.balkonyOcenka.value,
                },
                Лоджии: {
                    "Выявленные дефекты": appVariables.lodjiiDefecty.value,
                    "Оценка пред.": appVariables.lodjiiProshlOcenka.textContent,
                    "% деф. части": appVariables.lodjiiPercent.value,
                    Оценка: appVariables.lodjiiOcenka.value,
                },
                Козырьки: {
                    "Выявленные дефекты": appVariables.kozirkiDefecty.value,
                    "Оценка пред.": appVariables.kozirkiProshlOcenka.textContent,
                    "% деф. части": appVariables.kozirkiPercent.value,
                    Оценка: appVariables.kozirkiOcenka.value,
                },
                Эркеры: {
                    "Выявленные дефекты": appVariables.erkeryDefecty.value,
                    "Оценка пред.": appVariables.erkeryProshlOcenka.textContent,
                    "% деф. части": appVariables.erkeryPercent.value,
                    Оценка: appVariables.erkeryOcenka.value,
                },
                "Все элементы": {
                    "Выявленные дефекты": appVariables.vseBalkonyDefecty.value,
                    "Оценка пред.": appVariables.vseBalkonyProshlOcenka.textContent,
                    "% деф. части": appVariables.vseBalkonyPercent.value,
                    Оценка: appVariables.vseBalkonyOcenka.value,
                },
            },
            Стены: {
                "Материал стен": appVariables.stenyMaterial.value,
                "Теплофизические свойства": appVariables.stenyTeploFizSvoistva.value,

                "Выявленные дефекты": appVariables.stenyDefecty.value,
                "Оценка пред.": appVariables.stenyProshlOcenka.textContent,
                "% деф. части": appVariables.stenyPercent.value,
                Оценка: appVariables.stenyOcenka.value,
            },
            Подвал: {
                "Наличие подвала": appVariables.podvalNalichie.value,
                "Площадь, м²": appVariables.podvalSquare.value,

                "Выявленные дефекты": appVariables.podvalDefecty.value,
                "Оценка пред.": appVariables.podvalProshlOcenka.textContent,
                "% деф. части": appVariables.podvalPercent.value,
                Оценка: appVariables.podvalOcenka.value,
            },
            "Тех.подполье": {
                "Наличие тех.подполья": appVariables.techPodpolieNalichie.value,

                "Выявленные дефекты": appVariables.techPodpolieDefecty.value,
                "Оценка пред.": appVariables.techPodpolieProshlOcenka.textContent,
                "% деф. части": appVariables.techPodpoliePercent.value,
                Оценка: appVariables.techPodpolieOcenka.value,
            },
            "Тех.этаж": {
                "Наличие тех.этажа": appVariables.techEtajNalichie.value,
                "Местонахождение, этаж": appVariables.techEtajMesto.value,

                "Выявленные дефекты": appVariables.techEtajDefecty.value,
                "Оценка пред.": appVariables.techEtajProshlOcenka.textContent,
                "% деф. части": appVariables.techEtajPercent.value,
                Оценка: appVariables.techEtajOcenka.value,
            },
            "Гараж стоянка (подземный)": {
                Тип: appVariables.garageType.value,
                "Площадь,м²": appVariables.garageSquare.value,
                "Этажность, эт": appVariables.garageEtagnost.value,
                "Количество маш.мест, шт": appVariables.garageKolichestvoMashin.value,

                "Выявленные дефекты": appVariables.garageDefecty.value,
                "Оценка пред.": appVariables.garageProshlOcenka.textContent,
                "% деф. части": appVariables.garagePercent.value,
                Оценка: appVariables.garageOcenka.value,
            },
            "Места общего пользования": {
                "Пандусы наружные, шт": appVariables.mopPandusyNaruzhKolich.value,
                "Пандусы внутренние, шт": appVariables.mopPandusyVnutrKolich.value,
                "Сходы-съезды, шт.": appVariables.mopShodySiezdyKolich.value,

                Вестибюли: {
                    "Выявленные дефекты": appVariables.mopVestibuliDefecty.value,
                    "Оценка пред.": appVariables.mopVestibuliProshlOcenka.textContent,
                    "% деф. части": appVariables.mopVestibuliPercent.value,
                    Оценка: appVariables.mopVestibuliOcenka.value,
                },
                Крыльца: {
                    "Выявленные дефекты": appVariables.mopKrilcaDefecty.value,
                    "Оценка пред.": appVariables.mopKrilcaProshlOcenka.textContent,
                    "% деф. части": appVariables.mopKrilcaPercent.value,
                    Оценка: appVariables.mopKrilcaOcenka.value,
                },
                "Пандусы наружные": {
                    "Выявленные дефекты": appVariables.mopPandusyNaruzhnieDefecty.value,
                    "Оценка пред.": appVariables.mopPandusyNaruzhnieProshlOcenka.textContent,
                    "% деф. части": appVariables.mopPandusyNaruzhniePercent.value,
                    Оценка: appVariables.mopPandusyNaruzhnieOcenka.value,
                },
                "Пандусы внутри-подъездные": {
                    "Выявленные дефекты": appVariables.mopPandusyVnutrennieDefecty.value,
                    "Оценка пред.": appVariables.mopPandusyVnutrennieProshlOcenka.textContent,
                    "% деф. части": appVariables.mopPandusyVnutrenniePercent.value,
                    Оценка: appVariables.mopPandusyVnutrennieOcenka.value,
                },
                "Сходы/съезды": {
                    "Выявленные дефекты": appVariables.mopShodySiezdyDefecty.value,
                    "Оценка пред.": appVariables.mopShodySiezdyProshlOcenka.textContent,
                    "% деф. части": appVariables.mopShodySiezdyPercent.value,
                    Оценка: appVariables.mopShodySiezdyOcenka.value,
                },
                "Окна, двери": {
                    "Выявленные дефекты": appVariables.mopOknaDveriDefecty.value,
                    "Оценка пред.": appVariables.mopOknaDveriProshlOcenka.textContent,
                    "% деф. части": appVariables.mopOknaDveriPercent.value,
                    Оценка: appVariables.mopOknaDveriOcenka.value,
                },
                "Внутренняя отделка помещений": {
                    "Выявленные дефекты": appVariables.mopVnOtdelkaPomeshDefecty.value,
                    "Оценка пред.": appVariables.mopVnOtdelkaPomeshProshlOcenka.textContent,
                    "% деф. части": appVariables.mopVnOtdelkaPomeshPercent.value,
                    Оценка: appVariables.mopVnOtdelkaPomeshOcenka.value,
                },
                "Все элементы": {
                    "Выявленные дефекты": appVariables.mopVseElementyDefecty.value,
                    "Оценка пред.": appVariables.mopVseElementyProshlOcenka.textContent,
                    "% деф. части": appVariables.mopVseElementyPercent.value,
                    Оценка: appVariables.mopVseElementyOcenka.value,
                },
            },
            Лестницы: {
                Конструкция: appVariables.lestnicyConstruction.value,

                "Выявленные дефекты": appVariables.lestnicyDefecty.value,
                "Оценка пред.": appVariables.lestnicyProshlOcenka.textContent,
                "% деф. части": appVariables.lestnicyPercent.value,
                Оценка: appVariables.lestnicyOcenka.value,
            },
            Перекрытия: {
                "Материал перекрытия": appVariables.perekrityaMaterial.value,

                "Выявленные дефекты": appVariables.perekrityaDefecty.value,
                "Оценка пред.": appVariables.perekrityaProshlOcenka.textContent,
                "% деф. части": appVariables.perekrityaPercent.value,
                Оценка: appVariables.perekrityaOcenka.value,
            },
            "Система отопления": {
                "Вид отопления": appVariables.otopleniyeVid.value,
                "Материал трубопроводов": appVariables.otopleniyeMaterial.value,
                "Тип приборов": appVariables.otopleniyeTypePribor.value,
                "Термо-регуляторы в квартирах": appVariables.otopleniyeTermoRegulKvartir.value,
                "Наличие АУУ, шт": appVariables.otopleniyeAuu.value,
                "Наличие ОДУУ": appVariables.otopleniyeOduu.value,
                "Элеваторный узел, шт": appVariables.otopleniyeElevUzel.value,
                "Тепловой узел, шт": appVariables.otopleniyeTeplovoyUzel.value,
                "Тип стояков": appVariables.otopleniyeTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": appVariables.otopleniyeTehPodpolieDefecty.value,
                    "Оценка пред.": appVariables.otopleniyeTehPodpolieProshlOcenka.textContent,
                    "% деф. части": appVariables.otopleniyeTehPodpoliePercent.value,
                    Оценка: appVariables.otopleniyeTehPodpolieOcenka.value,
                },
                "Транзит питающий": {
                    "Выявленные дефекты": appVariables.otopleniyeTranzitPitaushDefecty.value,
                    "Оценка пред.": appVariables.otopleniyeTranzitPitaushProshlOcenka.textContent,
                    "% деф. части": appVariables.otopleniyeTranzitPitaushPercent.value,
                    Оценка: appVariables.otopleniyeTranzitPitaushOcenka.value,
                },
                Чердак: {
                    "Выявленные дефекты": appVariables.otopleniyeCherdakDefecty.value,
                    "Оценка пред.": appVariables.otopleniyeCherdakProshlOcenka.textContent,
                    "% деф. части": appVariables.otopleniyeCherdakPercent.value,
                    Оценка: appVariables.otopleniyeCherdakOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": appVariables.otopleniyeEtajiDefecty.value,
                    "Оценка пред.": appVariables.otopleniyeEtajiProshlOcenka.textContent,
                    "% деф. части": appVariables.otopleniyeEtajiPercent.value,
                    Оценка: appVariables.otopleniyeEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": appVariables.vseOtopleniyeDefecty.value,
                    "Оценка пред.": appVariables.vseOtopleniyeProshlOcenka.textContent,
                    "% деф. части": appVariables.vseOtopleniyePercent.value,
                    Оценка: appVariables.vseOtopleniyeOcenka.value,
                },
            },
            ГВС: {
                "Тип системы": appVariables.gvsType.value,
                "Материал трубопроводов": appVariables.gvsMaterial.value,
                "Наличие ОДУУ": appVariables.gvsOduu.value,
                "Тип стояков": appVariables.gvsTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": appVariables.gvsTehPodpolieDefecty.value,
                    "Оценка пред.": appVariables.gvsTehPodpolieProshlOcenka.textContent,
                    "% деф. части": appVariables.gvsTehPodpoliePercent.value,
                    Оценка: appVariables.gvsTehPodpolieOcenka.value,
                },
                "Транзит питающий": {
                    "Выявленные дефекты": appVariables.gvsTranzitPitaushDefecty.value,
                    "Оценка пред.": appVariables.gvsTranzitPitaushProshlOcenka.textContent,
                    "% деф. части": appVariables.gvsTranzitPitaushPercent.value,
                    Оценка: appVariables.gvsTranzitPitaushOcenka.value,
                },
                Чердак: {
                    "Выявленные дефекты": appVariables.gvsCherdakDefecty.value,
                    "Оценка пред.": appVariables.gvsCherdakProshlOcenka.textContent,
                    "% деф. части": appVariables.gvsCherdakPercent.value,
                    Оценка: appVariables.gvsCherdakOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": appVariables.gvsEtajiDefecty.value,
                    "Оценка пред.": appVariables.gvsEtajiProshlOcenka.textContent,
                    "% деф. части": appVariables.gvsEtajiPercent.value,
                    Оценка: appVariables.gvsEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": appVariables.vseGvsDefecty.value,
                    "Оценка пред.": appVariables.vseGvsProshlOcenka.textContent,
                    "% деф. части": appVariables.vseGvsPercent.value,
                    Оценка: appVariables.vseGvsOcenka.value,
                },
            },
            ХВС: {
                "Материал трубопроводов": appVariables.hvsMaterial.value,
                "Наличие ОДУУ": appVariables.hvsOduu.value,
                "Тип стояков": appVariables.hvsTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": appVariables.hvsTehPodpolieDefecty.value,
                    "Оценка пред.": appVariables.hvsTehPodpolieProshlOcenka.textContent,
                    "% деф. части": appVariables.hvsTehPodpoliePercent.value,
                    Оценка: appVariables.hvsTehPodpolieOcenka.value,
                },
                "Транзит питающий": {
                    "Выявленные дефекты": appVariables.hvsTranzitPitaushDefecty.value,
                    "Оценка пред.": appVariables.hvsTranzitPitaushProshlOcenka.textContent,
                    "% деф. части": appVariables.hvsTranzitPitaushPercent.value,
                    Оценка: appVariables.hvsTranzitPitaushOcenka.value,
                },
                "Внутренний пожарный водопровод": {
                    "Выявленные дефекты": appVariables.hvsVnPozharProvodDefecty.value,
                    "Оценка пред.": appVariables.hvsVnPozharProvodProshlOcenka.textContent,
                    "% деф. части": appVariables.hvsVnPozharProvodPercent.value,
                    Оценка: appVariables.hvsVnPozharProvodOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": appVariables.hvsEtajiDefecty.value,
                    "Оценка пред.": appVariables.hvsEtajiProshlOcenka.textContent,
                    "% деф. части": appVariables.hvsEtajiPercent.value,
                    Оценка: appVariables.hvsEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": appVariables.vseHvsDefecty.value,
                    "Оценка пред.": appVariables.vseHvsProshlOcenka.textContent,
                    "% деф. части": appVariables.vseHvsPercent.value,
                    Оценка: appVariables.vseHvsOcenka.value,
                },
            },
            Канализация: {
                "Материал трубопроводов": appVariables.kanalizaciaMaterial.value,
                "Тип стояков": appVariables.kanalizaciaTypeStoyakov.value,

                "Тех.подполье/тех.этаж": {
                    "Выявленные дефекты": appVariables.kanalizaciaTehPodpolieDefecty.value,
                    "Оценка пред.": appVariables.kanalizaciaTehPodpolieProshlOcenka.textContent,
                    "% деф. части": appVariables.kanalizaciaTehPodpoliePercent.value,
                    Оценка: appVariables.kanalizaciaTehPodpolieOcenka.value,
                },
                Этажи: {
                    "Выявленные дефекты": appVariables.kanalizaciaEtajiDefecty.value,
                    "Оценка пред.": appVariables.kanalizaciaEtajiProshlOcenka.textContent,
                    "% деф. части": appVariables.kanalizaciaEtajiPercent.value,
                    Оценка: appVariables.kanalizaciaEtajiOcenka.value,
                },
                "Вся система": {
                    "Выявленные дефекты": appVariables.vseKanalizaciaDefecty.value,
                    "Оценка пред.": appVariables.vseKanalizaciaProshlOcenka.textContent,
                    "% деф. части": appVariables.vseKanalizaciaPercent.value,
                    Оценка: appVariables.vseKanalizaciaOcenka.value,
                },
            },
            Мусоропроводы: {
                Мусоропроводы: appVariables.musoroprovodyMesto.value,
                Мусорокамеры: appVariables.musoroprovodyKamery.value,

                "Выявленные дефекты": appVariables.musoroprovodyDefecty.value,
                "Оценка пред.": appVariables.musoroprovodyProshlOcenka.textContent,
                "% деф. части": appVariables.musoroprovodyPercent.value,
                Оценка: appVariables.musoroprovodyOcenka.value,
            },
            "Связь с ОДС": {
                Тип: appVariables.odsType.value,
                Состояние: appVariables.odsSostoyanie.value,

                "Выявленные дефекты": appVariables.odsDefecty.value,
                "№ и дата последнего обслед.": appVariables.odsPosledneeObsled.value,
                "Специализированная организация": appVariables.odsOrganizacia.value,
                "Оценка пред.": appVariables.odsProshlOcenka.textContent,
                Оценка: appVariables.odsOcenka.value,
            },
            Вентиляция: {
                Состояние: appVariables.ventilaciaSostoyanie.value,

                "Выявленные дефекты": appVariables.ventilaciaDefecty.value,
                "№ и дата последнего обслед.": appVariables.ventilaciaPosledneeObsled.value,
                "Специализированная организация": appVariables.ventilaciaOrganizacia.value,
                "Оценка пред.": appVariables.ventilaciaProshlOcenka.textContent,
                Оценка: appVariables.ventilaciaOcenka.value,
            },
            "Система промывки и прочистки стволов мусоропроводов": {
                Наличие: appVariables.musoroChistSistemaNalichie.value,
                Состояние: appVariables.musoroChistSistemaSostoyanie.value,

                "Выявленные дефекты": appVariables.musoroChistSistemaDefecty.value,
                "№ и дата последнего обслед.": appVariables.musoroChistSistemaPosledObsled.value,
                "Специализированная организация": appVariables.musoroChistSistemaOrganizacia.value,
                "Оценка пред.": appVariables.musoroChistSistemaProshlOcenka.textContent,
                Оценка: appVariables.musoroChistSistemaOcenka.value,
            },
            "ОЗДС (охранно-защитная дератизационная система)": {
                Наличие: appVariables.ozdsNalichie.value,
                Состояние: appVariables.ozdsSostoyanie.value,

                "Выявленные дефекты": appVariables.ozdsDefecty.value,
                "№ и дата последнего обслед.": appVariables.ozdsPosledObsled.value,
                "Специализированная организация": appVariables.ozdsOrganizacia.value,
                "Оценка пред.": appVariables.ozdsProshlOcenka.textContent,
                Оценка: appVariables.ozdsOcenka.value,
            },
            Газоходы: {
                Наличие: appVariables.gazohodyNalichie.value,
                Состояние: appVariables.gazohodySostoyanie.value,

                "Выявленные дефекты": appVariables.gazohodyDefecty.value,
                "№ и дата последнего обслед.": appVariables.gazohodyPosledObsled.value,
                "Специализированная организация": appVariables.gazohodyOrganizacia.value,
                "Оценка пред.": appVariables.gazohodyProshlOcenka.textContent,
                Оценка: appVariables.gazohodyOcenka.value,
            },
            Лифты: {
                "Пассажирские, шт": appVariables.liftyPass.value,
                "Грузопассажирские, шт": appVariables.liftyGruzPass.value,
                "В т.ч. навесные, шт": appVariables.liftyNavesnye.value,
                Состояние: appVariables.liftySostoyanie.value,

                "Выявленные дефекты": appVariables.liftyDefecty.value,
                "№ и дата последнего обслед.": appVariables.liftyPosledObsled.value,
                "Специализированная организация": appVariables.liftyOrganizacia.value,
                "Оценка пред.": appVariables.liftyProshlOcenka.textContent,
                Оценка: appVariables.liftyOcenka.value,
            },
            "Подъёмное устройство для маломобильной группы населения": {
                "Кол-во, шт": appVariables.podyomnikKolich.value,
                Состояние: appVariables.podyomnikSostoyanie.value,

                "Выявленные дефекты": appVariables.podyomnikDefecty.value,
                "№ и дата последнего обслед.": appVariables.podyomnikPosledObsled.value,
                "Специализированная организация": appVariables.podyomnikOrganizacia.value,
                "Оценка пред.": appVariables.podyomnikProshlOcenka.textContent,
                Оценка: appVariables.podyomnikOcenka.value,
            },
            "Устройство для автоматического опускания лифта": {
                Наличие: appVariables.autoSpuskLiftNalichie.value,
                Состояние: appVariables.autoSpuskLiftSostoyanie.value,

                "Выявленные дефекты": appVariables.autoSpuskLiftDefecty.value,
                "№ и дата последнего обслед.": appVariables.autoSpuskLiftPosledObsled.value,
                "Специализированная организация": appVariables.autoSpuskLiftOrganizacia.value,
                "Оценка пред.": appVariables.autoSpuskLiftProshlOcenka.textContent,
                Оценка: appVariables.autoSpuskLiftOcenka.value,
            },
            "Система ЭС": {
                "Кол-во ВРУ, шт": appVariables.systemEsKolich.value,
                "Размещение ВРУ": appVariables.systemEsRazmeshenie.value,
                Состояние: appVariables.systemEsSostoyanie.value,

                "Выявленные дефекты": appVariables.systemEsDefecty.value,
                "№ и дата последнего обслед.": appVariables.systemEsPosledObsled.value,
                "Специализированная организация": appVariables.systemEsOrganizacia.value,
                "Оценка пред.": appVariables.systemEsProshlOcenka.textContent,
                Оценка: appVariables.systemEsOcenka.value,
            },
            "ВКВ (второй кабельный ввод)": {
                Наличие: appVariables.vkvNalichie.value,
                Состояние: appVariables.vkvSostoyanie.value,

                "Выявленные дефекты": appVariables.vkvDefecty.value,
                "№ и дата последнего обслед.": appVariables.vkvPosledObsled.value,
                "Специализированная организация": appVariables.vkvOrganizacia.value,
                "Оценка пред.": appVariables.vkvProshlOcenka.textContent,
                Оценка: appVariables.vkvOcenka.value,
            },
            "АВР (автоматическое включение резервного питания)": {
                Наличие: appVariables.avrNalichie.value,
                Состояние: appVariables.avrSostoyanie.value,

                "Выявленные дефекты": appVariables.avrDefecty.value,
                "№ и дата последнего обслед.": appVariables.avrPosledObsled.value,
                "Специализированная организация": appVariables.avrOrganizacia.value,
                "Оценка пред.": appVariables.avrProshlOcenka.textContent,
                Оценка: appVariables.avrOcenka.value,
            },
            ППАиДУ: {
                Тип: appVariables.ppaiduType.value,
                Состояние: appVariables.ppaiduSostoyanie.value,

                "Выявленные дефекты": appVariables.ppaiduDefecty.value,
                "№ и дата последнего обслед.": appVariables.ppaiduPosledObsled.value,
                "Специализированная организация": appVariables.ppaiduOrganizacia.value,
                "Оценка пред.": appVariables.ppaiduProshlOcenka.textContent,
                Оценка: appVariables.ppaiduOcenka.value,
            },
            "Система оповещения о пожаре": {
                Наличие: appVariables.pozharOpoveshenNalichie.value,
                Состояние: appVariables.pozharOpoveshenSostoyanie.value,

                "Выявленные дефекты": appVariables.pozharOpoveshenDefecty.value,
                "№ и дата последнего обслед.": appVariables.pozharOpoveshenPosledObsled.value,
                "Специализированная организация": appVariables.pozharOpoveshenOrganizacia.value,
                "Оценка пред.": appVariables.pozharOpoveshenProshlOcenka.textContent,
                Оценка: appVariables.pozharOpoveshenOcenka.value,
            },
            "Система ГС": {
                Вводы: appVariables.sistemaGsVvody.value,
                Разводка: appVariables.sistemaGsRazvodka.value,
                Состояние: appVariables.sistemaGsSostoyanie.value,

                "Выявленные дефекты": appVariables.sistemaGsDefecty.value,
                "№ и дата последнего обслед.": appVariables.sistemaGsPosledObsled.value,
                "Специализированная организация": appVariables.sistemaGsOrganizacia.value,
                "Оценка пред.": appVariables.sistemaGsProshlOcenka.textContent,
                Оценка: appVariables.sistemaGsOcenka.value,
            },
            "Система видеонаблюдения": {
                Место: appVariables.sistemaVideonabMesto.value,
                Состояние: appVariables.sistemaGsSostoyanie.value,

                "Выявленные дефекты": appVariables.sistemaVideonabDefecty.value,
                "№ и дата последнего обслед.": appVariables.sistemaVideonabPosledObsled.value,
                "Специализированная организация": appVariables.sistemaVideonabOrganizacia.value,
                "Оценка пред.": appVariables.sistemaVideonabProshlOcenka.textContent,
                Оценка: appVariables.sistemaVideonabOcenka.value,
            },
            "Дополнительные данные": appVariables.dopolnitDannye.value,
            "Выполнено обследование": appVariables.obsledVypolneno.value,
            "Рекомендации по утеплению стен": appVariables.recomendatciiPoUtepleniuSten.value,
        },
        "Выводы по результатам обследования": {
            "Техническое состояние (приведенная оценка) здания (в целом)": appVariables.tehSostoyanieZdania.value,
            "РЕКОМЕНДАЦИИ по ремонтно-восстановительным работам": appVariables.recomendatciiPoDopRabotam.value,
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
    for (let i = 0; i < appVariables.repairProjectsTableRows.length; i++) {
        if (i < 2 || appVariables.repairProjectsTableRows[i].classList.contains("gridBGTotal")) {
            continue;
        }
        if (i > 1) {
            data["Технические заключения и проекты ремонтов"][i]["Организация"] = appVariables["tehZakluchenia"][i]["organizacia"].value;
            data["Технические заключения и проекты ремонтов"][i]["Дата, №"] = appVariables["tehZakluchenia"][i]["dataNomer"].value;
            data["Технические заключения и проекты ремонтов"][i]["Наименование, содержание"] = appVariables["tehZakluchenia"][i]["naimenovanieSoderjanie"].value;
        }
    }

    // Для выводов по результатам пред. обследования
    for (let key in appVariables.vivodyPoRezultatam) {
        data["Выводы по результатам предыдущего обследования"][key] = new Object();
        data["Выводы по результатам предыдущего обследования"][key]["id"] = appVariables["vivodyPoRezultatam"][key]["id"].textContent;
        data["Выводы по результатам предыдущего обследования"][key]["Дата"] = appVariables["vivodyPoRezultatam"][key]["data"].textContent;
        data["Выводы по результатам предыдущего обследования"][key]["№"] = appVariables["vivodyPoRezultatam"][key]["number"].textContent;
        data["Выводы по результатам предыдущего обследования"][key]["Техническое состояние здания в целом"] = appVariables["vivodyPoRezultatam"][key]["tehSostoyanie"].textContent;
    }

    // РЕКОМЕНДАЦИИ ПО КАП РЕМОНТУ
    // Крыша
    for (let key in appVariables.recomend.krisha) {
        const neededObj = appVariables.recomend.krisha[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Крыша"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Балконы
    for (let key in appVariables.recomend.balkony) {
        const neededObj = appVariables.recomend.balkony[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Балконы"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Места общего пользования
    for (let key in appVariables.recomend.mop) {
        const neededObj = appVariables.recomend.mop[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Места общего пользования"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Системы отопления
    for (let key in appVariables.recomend.sistemaOtoplenia) {
        const neededObj = appVariables.recomend.sistemaOtoplenia[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Система отопления"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // ГВС
    for (let key in appVariables.recomend.gvs) {
        const neededObj = appVariables.recomend.gvs[key];
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ГВС"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // ХВС
    for (let key in appVariables.recomend.hvs) {
        const neededObj = appVariables.recomend.hvs[key];
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["ХВС"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }
    // Канализация
    for (let key in appVariables.recomend.kanalizacia) {
        const neededObj = appVariables.recomend.kanalizacia[key];
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Рекомендации"] = neededObj.recomend.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Треб. объем, %"] = neededObj.trebObjom.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Выполнен, год"] = neededObj.vypolnenGod.value;
        data["Выполнение рекомендаций по кап. ремонту"]["Канализация"][neededObj.name]["Факт. объем, %"] = neededObj.factObjom.value;
    }

    for (let counter = 1; counter <= 4; counter++) {
        const neededObj = appVariables[counter];
        data["Подписывающие лица"]["Представители от"][counter] = neededObj["licaOt"].value;
        data["Подписывающие лица"]["ФИО должностного лица"][counter] = neededObj["licaFio"].value;
        data["Подписывающие лица"]["Должность и наименование организации"][counter] = neededObj["LicaDoljnost"].value;
    }

    localStorage.setItem("MJIDATA", JSON.stringify(data));

    appVariables.copyButton.textContent = "Скопировано";
    appVariables.copyButton.classList.add("main__button_done");
    setTimeout(() => {
        appVariables.copyButton.textContent = "Копирование отчета";
        appVariables.copyButton.classList.remove("main__button_done");
    }, 1500);
}