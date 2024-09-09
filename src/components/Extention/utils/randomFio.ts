export const randomFio = () => {
    const fioArr = ["А. Я. Забывчивый", "У. Е. Денюжкин", "Ф. Ф. Ристайлов", "Н. Н. Заиков", "К. С. Игроманов", "Ж. Е. Кавказов"];
	const randomIndex = Math.floor(Math.random() * fioArr.length);
	const randomValue = fioArr[randomIndex];

	return randomValue;
}