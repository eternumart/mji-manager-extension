# Структура целевой страницы МЖИ (критерии для функций расширения)

Сохранённая страница: `МЖИ.html` (верхний уровень) + `МЖИ_files/tsn_prod.web.html` (содержимое iframe с формой).

---

## 1. Два уровня документа

| Уровень | Файл | Описание |
|--------|------|----------|
| **Верхняя страница** | `МЖИ.html` | Контейнер: верхняя панель, адрес в `#title`, **iframe `#formCanvas`**. |
| **Форма** | Загружается в iframe: `МЖИ_files/tsn_prod.web.html` | Вся форма МЖИ: поля, таблицы, группы. |

**Важно для расширения:** форма и все поля (`#formData181`, `#comboboxTextcomp_12339`, `#group_*` и т.д.) находятся **внутри iframe** `#formCanvas`. Поэтому:
- скрипт инжектируется во фрейм с формой (см. `DOMEvaluator.ts`);
- `htmlBody` / `form` / поиск полей — всегда в документе того же фрейма (см. `Popup/index.ts`: `docForForm`).

---

## 2. Ключевые селекторы (как в коде расширения)

### 2.1 Верхняя страница (в iframe не дублируются)

| Селектор | Назначение | Где используется |
|----------|------------|-------------------|
| `#title` | Текст адреса («ЦАО, Басманный р-н, Аптекарский пер., д.3/22») | `appVariables.wholeAddress`; может быть в top или в iframe. |
| `#formCanvas` | iframe с формой | В top-документе: `contentDoc = formCanvas.contentWindow.document` для доступа к форме. |

### 2.2 Форма (внутри iframe)

| Селектор | Назначение | Где используется |
|----------|------------|-------------------|
| `#formData181` | Основная форма (обследование) | `appVariables.form`; `currentPage = "main"`. |
| `#formData107` | Форма фото (другой тип) | `appVariables.form`; `currentPage = "photo"`. |
| `#comboboxTextcomp_12339` | Поле адреса объекта (combobox) | `appVariables.address` в `searchAllInputs.ts`. |

### 2.3 Блоки и таблицы (внутри формы)

Структура: `<form id="formData181">` → внутри неё `<fieldset class="groupBorderBig">` / `<div id="group_XXXX">` с `<legend>` или заголовками.

| Селектор | Назначение | В коде |
|----------|------------|--------|
| `#group_22130` | Таблица «Ремонтные проекты» (repair projects) | `repairProjectsTable` |
| `#group_22131` | Сетка заключений предыдущего обследования | `conclusionsPrevSurvey`, `gridSql_22131` |
| `#group_22127` | Блок «Выполнение рекомендаций по кап. ремонту» | `recomendationsDone` |
| `#group_22193` | Крыша (рекомендации) | `recomendationsRoofBlock` → `roofTable` |
| `#group_22196` | Балконы | `balconyBlock` |
| `#group_22201` | МОП | `mopBlock` |
| `#group_22204` | Система отопления | `heatSystemBlock` |
| `#group_22205` | ГВС | `gvsBlock` |
| `#group_22206` | ХВС | `hvsBlock` |
| `#group_22207` | Канализация | `sewerBlock` |
| `#group_22125` | «Результаты выборочного обследования» | `results` |
| `#group_22243` | Крыша (результаты) | `resultsRoofBlock` |
| `#group_22264` | Балконы (результаты) | `resultsBalconyBlock` |
| `#group_22268` | МОП (результаты) | `resultsMopBlock` |
| `#group_22271` | Отопление (результаты) | `resultsHeatSystemTable` |
| `#group_22272` | ГВС (результаты) | `resultsGvsBlock` |
| `#group_22273` | ХВС (результаты) | `resultsHvsBlock` |
| `#group_22274` | Канализация (результаты) | `resultsSewerBlock` |
| `#group_22133` | Подписанты | `signatoriesBlock` |

### 2.4 Поля «Результаты» (lookup по названию строки)

Внутри `#group_22125` блоки — `<fieldset class="groupBorder">` с `<legend class="groupTitle">` (название группы: Крыша, Водоотвод, Фасад и т.д.). Внутри — таблицы `.attr` с строками: ячейка с подписью (например `<span class="componentCaption">Конструкция крыши</span>`) и ячейка с полем `#lookupTextcomp_XXXX`.

| Группа (legend) | Поле (подпись) | ID элемента |
|-----------------|----------------|-------------|
| Крыша | Конструкция крыши | `#lookupTextcomp_12453` |
| Крыша | Материал кровли | `#lookupTextcomp_12454` |
| Водоотвод | Тип водоотвода | `#lookupTextcomp_12456` |
| Водоотвод | Материал водоотвода | `#lookupTextcomp_12457` |
| Межпанельные стыки | Тип стыков | `#lookupTextcomp_12458` |
| Фасад | Отделка стен / цоколя / Оконные заполнения | `#lookupTextcomp_12460`, `12461`, `12462` |
| Стены | Материал стен / Теплофизические свойства | `#lookupTextcomp_12444`, `12445` |
| Лестницы | Конструкция | `#lookupTextcomp_12370` |
| Перекрытия | Материал перекрытия | `#lookupTextcomp_12371` |
| Система отопления | Вид отопления, Материал труб, Тип приборов, ОДУУ, Тип стояков | `#lookupTextcomp_12605`, `13393`, `12372`, `12373`, `12375`, `12299` |
| ГВС / ХВС / Канализация | Аналогично | `#lookupTextcomp_12378`–`12383`, `13394`–`13396` |

Эти ID жёстко зашиты в `searchAllInputs.ts` в объекте `window.appVariables["options"][группа][поле]`.

---

## 3. Паттерны DOM для функций расширения

### 3.1 Определение типа страницы

- В **верхней** странице: `#formCanvas` → в нём документ с `#formData107` или `#formData181`.
- Форма: `document.querySelector("#formData107") || document.querySelector("#formData181")`.
- Если `form.id === "formData181"` → основная форма (main); если `formData107` → фото.

### 3.2 Адрес и «объект обследования»

- Текст адреса для заголовка: `#title` (в top или в iframe).
- Поле ввода адреса объекта в форме: `#comboboxTextcomp_12339` (внутри `#group_22132` «Объект обследования»). Значение: `input.value` или `input.getAttribute("value")`.

### 3.3 Группы с дефектами / оценками (Всплывающие поля, Рейтинги)

- **Группа:** `<fieldset class="groupBorder">` или `class="groupBorderBig"`, внутри — `<legend>` с названием группы (Крыша, Балконы, Система отопления и т.д.).
- **Строка:** в таблице `.attr` строка `<tr>`: в одной ячейке — подпись (например `<span class="componentCaption">` или вложенный `<span>` с названием элемента), в другой — поле ввода или lookup.
- **createFakeSelects:** ищет `window.resultsDefectsInputs.inputs`, для каждого поля — `input.closest(".groupBorder")` → `legend` = имя группы; имя строки — из соседней ячейки (например `container.previousElementSibling?.querySelector("span")`). Данные дефектов: `defectsData[groupName][rowName]`; ключи могут отличаться пробелами/переносами (нормализация в `createFakeSelects.ts`).

### 3.4 Сетки (GRID) — строки и ячейки

- Контейнер: `<div id="group_XXXX" data-group-type="GRID">` или `GRID_SQL`.
- Таблица: внутри `<table class="grid">` или с `id="22243"` и т.п., строки `<tr>`, ячейки с классами `gridData`, поля с `class="data"`, lookup’ы с `id="lookupText…"` или `id` вида `12645*CURR_RATE`.
- Рейтинги (setRatings): привязка к полям процентов и оценок по структуре групп и имён (Ocenka, Percent, Name) в `window.appVariables` и `ratesData`.

### 3.5 Подписанты

- Блок: `#group_22133`, внутри таблица с строками подписантов.

---

## 4. Итог по критериям

- **Контекст документа:** всегда документ iframe (когда форма в iframe), чтобы один и тот же документ использовался для `form`, `htmlBody`, поиска полей и вставки панели.
- **Форма:** идентификация по `#formData181` / `#formData107`.
- **Адрес:** `#title` для отображения, `#comboboxTextcomp_12339` для значения в форме.
- **Группы:** по `#group_*` и при необходимости по `fieldset.groupBorder` + `legend`.
- **Строки и поля:** по подписям (componentCaption / span) и ID `lookupTextcomp_*`, захардкоженным в `searchAllInputs.ts`.
- **Дефекты/оценки:** ключи — «группа» + «строка»; в данных с бэкенда возможны отличия в пробелах и переносах слов — в коде используется нормализация ключей в `createFakeSelects.ts`.

Файлы страницы (`МЖИ.html`, `МЖИ_files/tsn_prod.web.html`) — референс для проверки селекторов при изменении целевого сайта или логики расширения.
