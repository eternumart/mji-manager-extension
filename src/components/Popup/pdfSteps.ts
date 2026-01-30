/**
 * UI шагов обработки PDF: Загрузка → Парсинг → Перефразирование (если AI) → Вставка.
 * Галочка у выполненных, крутящийся кружок у ожидающих.
 */

const STEP_LABELS = [
	"Загрузка PDF",
	"Парсинг в DeepSeek",
	"Перефразирование (AI)",
	"Вставка на страницу",
];

function spinnerHtml(): string {
	return '<div class="loader" style="width:16px;height:16px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></div>';
}

function checkHtml(): string {
	return '<span style="color:var(--done-color,#0a0);font-weight:bold;margin-right:6px">✓</span>';
}

function errorHtml(): string {
	return '<span style="color:var(--error-color,#c00);margin-right:6px">✗</span>';
}

export function renderPdfSteps(container: HTMLElement, useAI: boolean): void {
	const steps = useAI ? [0, 1, 2, 3] : [0, 1, 3];
	container.innerHTML = steps
		.map(
			(i) =>
				`<div class="pdf-step" data-step="${i}" style="margin:6px 0;display:flex;align-items:center">
  <span class="pdf-step-icon" style="min-width:28px">${i === 0 ? checkHtml() : spinnerHtml()}</span>
  <span class="pdf-step-label">${STEP_LABELS[i]}</span>
</div>`
		)
		.join("");
	(window as any).appVariables.pdfStepContainers = container.querySelectorAll(".pdf-step");
}

export function updatePdfStep(stepIndex: number, status: "done" | "pending" | "error"): void {
	const av = (window as any).appVariables;
	if (!av?.pdfStepContainers) return;
	const step = Array.from(av.pdfStepContainers).find(
		(el: any) => Number((el as HTMLElement).dataset.step) === stepIndex
	) as HTMLElement | undefined;
	if (!step) return;
	const icon = step.querySelector(".pdf-step-icon");
	if (!icon) return;
	if (status === "done") {
		icon.innerHTML = checkHtml();
	} else if (status === "error") {
		icon.innerHTML = errorHtml();
	} else {
		icon.innerHTML = spinnerHtml();
	}
}

export function hidePdfSteps(container: HTMLElement, finalText?: string): void {
	if (finalText && container) {
		container.innerHTML = `<div style="padding:8px 0;color:var(--text-color,#333)">${finalText}</div>`;
	}
	setTimeout(() => {
		if (container) (container as HTMLElement).style.display = "none";
	}, 1500);
}
