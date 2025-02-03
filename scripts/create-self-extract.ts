import fs from "fs";
import path from "path";
import archiver from "archiver";

// Получаем аргументы из командной строки
const args = process.argv.slice(2);
const extractPath = args[0] || "C:\\Program Files\\mji-manager"; // Путь распаковки (по умолчанию C:\Extension)
const iconPath = args[1] || "../public/ico512.png"; // Иконка (по умолчанию default-icon.ico)

const buildDir = path.join(__dirname, "../build");
const outputFile = path.join(__dirname, "../MJI-manager.zip");

console.log("📦 Начало создания архива...");
console.log(`🛠️ Путь распаковки: ${extractPath}`);
console.log(`🎨 Иконка: ${iconPath}`);

const output = fs.createWriteStream(outputFile);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`✅ Архив создан: ${outputFile} (${archive.pointer()} байт)`);
});

output.on("error", (err) => {
  console.error("❌ Ошибка записи архива:", err);
});

archive.on("error", (err) => {
  console.error("❌ Ошибка архивации:", err);
});

archive.pipe(output);
archive.directory(buildDir, false);
archive.finalize();

// ✅ Инструкция по запуску:
// npm run build && ts-node scripts/create-self-extract.ts "C:\\MyExtension" "my-icon.ico"
