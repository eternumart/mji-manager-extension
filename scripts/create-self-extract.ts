import fs from "fs";
import path from "path";
import archiver from "archiver";

// Получаем аргументы из командной строки
const args = process.argv.slice(2);
const extractPath = args[0] || "C:\\Program Files\\mji-manager"; // Путь распаковки (по умолчанию)
const iconPath = args[1] || "../public/ico512.png"; // Иконка (по умолчанию)

const buildDir = path.join(__dirname, "../build");
const outputFile = path.join(__dirname, "../MJI-manager.sfx.zip"); // ✅ Исправлено: должно быть .sfx.zip для 7z

console.log("📦 Начало создания архива...");
console.log(`🛠️ Путь распаковки: ${extractPath}`);
console.log(`🎨 Иконка: ${iconPath}`);

// ✅ Проверяем существование build директории
if (!fs.existsSync(buildDir)) {
  console.error(`❌ Ошибка: директория ${buildDir} не найдена!`);
  console.error("💡 Убедитесь, что вы выполнили 'npm run build' перед запуском скрипта.");
  process.exit(1);
}

// ✅ Проверяем, что build директория не пуста
const buildFiles = fs.readdirSync(buildDir);
if (buildFiles.length === 0) {
  console.error(`❌ Ошибка: директория ${buildDir} пуста!`);
  process.exit(1);
}

console.log(`📁 Найдено файлов в build: ${buildFiles.length}`);

// ✅ Создаем Promise для ожидания завершения архивации
const createArchive = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`✅ Архив создан: ${outputFile} (${archive.pointer()} байт)`);
      resolve();
    });

    output.on("error", (err) => {
      console.error("❌ Ошибка записи архива:", err);
      reject(err);
    });

    archive.on("error", (err) => {
      console.error("❌ Ошибка архивации:", err);
      reject(err);
    });

    archive.pipe(output);
    archive.directory(buildDir, false);
    archive.finalize();
  });
};

// ✅ Запускаем создание архива
createArchive()
  .then(() => {
    console.log("🎉 Скрипт успешно завершен!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("💥 Критическая ошибка:", err);
    process.exit(1);
  });
