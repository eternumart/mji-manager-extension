/**
 * Нормализует ответ DeepSeek по PDF (результаты_обследования: конструкции_и_системы +
 * инженерные_системы_и_оборудование) в формат «Результаты выборочного обследования» для loadData.
 */

const SECTION_KEY_MAP: Record<string, string> = {
	"Тех. подполье": "Тех.подполье",
	"Тех. этаж": "Тех.этаж",
	"Гараж-стоянка (подземный)": "Гараж стоянка (подземный)",
	"Система ГВС": "ГВС",
	"Система ХВС": "ХВС",
};

const ENGINEERING_KEY_MAP: Record<string, string> = {
	"Система ЭС (ВРУ - вводно-распределительное устройство)": "Система ЭС",
	"Система ППАиДУ": "ППАиДУ",
};

function sectionKey(name: string): string {
	return SECTION_KEY_MAP[name] ?? name;
}

function engineeringKey(name: string): string {
	return ENGINEERING_KEY_MAP[name] ?? name;
}

const DEFECT_TEXT_KEYS = [
	"характер_и_местоположение",
	"характер и местоположение",
	"описание",
	"текст",
	"дефект",
	"описание_дефекта",
	"содержание",
	"description",
	"text",
];
const ELEMENT_NAME_KEYS = ["элемент", "element", "наименование", "name"];

const SKIP_KEYS = new Set([
	"элемент", "element", "наименование", "name",
	"процент_дефектной_части", "оценка_текущая", "оценка_по_предыдущему_обследованию",
]);

function getDefectText(d: any): string {
	if (!d || typeof d !== "object") return "";
	for (const k of DEFECT_TEXT_KEYS) {
		const v = (d as Record<string, unknown>)[k];
		if (v != null && String(v).trim() !== "") return String(v).trim();
	}
	for (const k of Object.keys(d as Record<string, unknown>)) {
		if (SKIP_KEYS.has(k)) continue;
		const v = (d as Record<string, unknown>)[k];
		if (typeof v === "string" && v.trim() !== "") return v.trim();
	}
	return "";
}

function getElementName(d: any): string {
	if (!d || typeof d !== "object") return "";
	for (const k of ELEMENT_NAME_KEYS) {
		const v = (d as Record<string, unknown>)[k];
		if (v != null && String(v).trim() !== "") return String(v).trim();
	}
	return "";
}

function getDefectPercent(d: any): string {
	if (d?.процент_дефектной_части != null) return String(d.процент_дефектной_части);
	const v = (d as Record<string, unknown>)?.["процент_дефектной_части"];
	return v != null ? String(v) : "";
}

function getDefectOcenka(d: any): string {
	const v = d?.оценка_текущая ?? (d as Record<string, unknown>)?.["оценка_текущая"];
	return v != null && String(v).trim() !== "" ? String(v).trim() : "-";
}

function defectToRow(d: any): { "Выявленные дефекты": string; "% деф. части": string; "Оценка": string } {
	return {
		"Выявленные дефекты": getDefectText(d),
		"% деф. части": getDefectPercent(d),
		"Оценка": getDefectOcenka(d),
	};
}

export function normalizeDeepSeekResults(raw: {
	конструкции_и_системы?: Array<{
		наименование?: string;
		характеристика?: string;
		дефекты?: Array<{
			элемент?: string;
			характер_и_местоположение?: string;
			оценка_по_предыдущему_обследованию?: string;
			процент_дефектной_части?: number | string;
			оценка_текущая?: string;
		}>;
	}>;
	инженерные_системы_и_оборудование?: Array<{
		наименование?: string;
		характеристика?: string;
		дефекты?: string;
		номер_и_дата_последнего_обследования?: string;
		специализированная_организация?: string;
		оценка_предыдущая?: string;
		оценка_текущая?: string;
	}>;
}): Record<string, unknown> {
	const rez: Record<string, unknown> = {};
	const constructions = raw?.["конструкции_и_системы"] ?? raw?.конструкции_и_системы ?? [];
	const engineering = raw?.["инженерные_системы_и_оборудование"] ?? raw?.инженерные_системы_и_оборудование ?? [];
	const elements = (raw as Record<string, unknown>)?.["элементы"] ?? [];

	if (constructions.length === 0 && engineering.length === 0 && Array.isArray(elements) && elements.length > 0) {
		for (const item of elements) {
			const name = String((item as any)?.наименование ?? "").trim();
			if (!name) continue;
			const key = engineeringKey(sectionKey(name));
			const defects = Array.isArray((item as any)?.дефекты) ? (item as any).дефекты : [];
			if (defects.length === 0) {
				rez[key] = { "Выявленные дефекты": "", "% деф. части": "", "Оценка": "-" };
				continue;
			}
			const hasSubItems = defects.some((d: any) => getElementName(d) !== "");
			if (hasSubItems) {
				const nested: Record<string, { "Выявленные дефекты": string; "% деф. части": string; "Оценка": string }> = {};
				for (const d of defects) {
					const subName = getElementName(d);
					const rowKey = subName || "Все элементы";
					nested[rowKey] = defectToRow(d);
				}
				rez[key] = nested;
			} else {
				const first = defects[0];
				rez[key] = first ? defectToRow(first) : { "Выявленные дефекты": "", "% деф. части": "", "Оценка": "-" };
			}
		}
		return rez;
	}

	if (constructions.length === 0 && engineering.length === 0 && (!Array.isArray(elements) || elements.length === 0)) {
		console.warn("[MJI] normalizeDeepSeekResults: пустые конструкции_и_системы, инженерные_системы_и_оборудование и элементы, ключи raw:", Object.keys(raw || {}));
	}
	for (const item of constructions) {
		const name = String(item?.наименование ?? "").trim();
		if (!name) continue;
		const key = sectionKey(name);
		const defects = Array.isArray(item?.дефекты) ? item["дефекты"]! : [];

		if (defects.length === 0) {
			rez[key] = { "Выявленные дефекты": "", "% деф. части": "", "Оценка": "-" };
			continue;
		}

		const hasSubItems = defects.some((d) => getElementName(d) !== "");
		if (hasSubItems) {
			const nested: Record<string, { "Выявленные дефекты": string; "% деф. части": string; "Оценка": string }> = {};
			for (const d of defects) {
				const subName = getElementName(d);
				const rowKey = subName || "Все элементы";
				nested[rowKey] = defectToRow(d);
			}
			rez[key] = nested;
		} else {
			const first = defects[0];
			rez[key] = first ? defectToRow(first) : { "Выявленные дефекты": "", "% деф. части": "", "Оценка": "-" };
		}
	}

	for (const item of engineering) {
		const name = String(item?.наименование ?? "").trim();
		if (!name) continue;
		const key = engineeringKey(name);
		const defectsStr = typeof item?.дефекты === "string" ? item["дефекты"]! : "";
		rez[key] = {
			"Выявленные дефекты": defectsStr.trim(),
			"№ и дата последнего обслед.": String(item?.номер_и_дата_последнего_обследования ?? "").trim(),
			"Специализированная организация": String(item?.специализированная_организация ?? "").trim(),
			"Оценка": String(item?.оценка_текущая ?? "").trim() || "-",
		};
	}

	return rez;
}
