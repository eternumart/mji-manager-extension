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
	return '<div class="loader loader_spinner"></div>';
}

function checkHtml(): string {
	return '<span class="pdf-step-icon_done">✓</span>';
}

function errorHtml(): string {
	return '<span class="pdf-step-icon_error">✗</span>';
}

export function renderPdfSteps(container: HTMLElement, useAI: boolean): void {
	const steps = useAI ? [0, 1, 2, 3] : [0, 1, 3];
	container.innerHTML = steps
		.map(
			(i) =>
				`<div class="pdf-step" data-step="${i}">
  <span class="pdf-step-icon">${i === 0 ? checkHtml() : spinnerHtml()}</span>
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
		container.innerHTML = `<div class="pdf-steps-result">${finalText}</div>`;
	}
	setTimeout(() => {
		if (container) {
			container.classList.remove("form__loader_visible", "form__loader_visible_flex");
		}
	}, 1500);
}
