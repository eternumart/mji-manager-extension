import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

const execAsync = promisify(exec);

const zipFile = path.join(__dirname, "../MJI-manager.sfx.zip");
const exeFile = path.join(__dirname, "../MJI-manager.exe");
const configFile = path.join(__dirname, "../sfx-config.txt");
const iconFile = path.join(__dirname, "../public/ico16.ico");

interface SevenZipPaths {
  exe: string;
  sfx: string;
}

async function find7z(): Promise<SevenZipPaths | null> {
  // Стандартные пути установки 7-Zip в Windows
  const possibleBasePaths: string[] = [
    "C:\\Program Files\\7-Zip",
    "C:\\Program Files (x86)\\7-Zip",
  ];

  // Добавляем пути из переменных окружения, если они существуют
  if (process.env["ProgramFiles"]) {
    possibleBasePaths.push(path.join(process.env["ProgramFiles"], "7-Zip"));
  }
  if (process.env["ProgramFiles(x86)"]) {
    possibleBasePaths.push(path.join(process.env["ProgramFiles(x86)"], "7-Zip"));
  }
  if (process.env["ProgramW6432"]) {
    possibleBasePaths.push(path.join(process.env["ProgramW6432"], "7-Zip"));
  }

  // Сначала проверяем, есть ли 7z в PATH
  let exePath: string | null = null;
  try {
    await execAsync("where 7z");
    exePath = "7z";
  } catch {
    // Продолжаем проверку стандартных путей
  }

  // Возможные имена SFX модулей (в порядке приоритета)
  const possibleSfxNames = ["7zSD.sfx", "7zS2.sfx", "7z.sfx"];

  // Проверяем стандартные пути
  for (const basePath of possibleBasePaths) {
    if (!basePath) continue;
    
    const exe = path.join(basePath, "7z.exe");
    if (!fs.existsSync(exe)) continue;
    
    // Если exePath еще не найден, сохраняем этот путь
    if (!exePath) {
      exePath = exe;
    }
    
    // Пытаемся найти любой доступный SFX модуль
    for (const sfxName of possibleSfxNames) {
      const sfx = path.join(basePath, sfxName);
      if (fs.existsSync(sfx)) {
        console.log(`🔍 Найдено: ${exe}`);
        console.log(`🔍 Найдено: ${sfx} (${sfxName})`);
        return { exe, sfx };
      }
    }
  }

  // Если нашли exe, но не нашли SFX модуль, ищем в других путях
  if (exePath) {
    for (const basePath of possibleBasePaths) {
      if (!basePath) continue;
      for (const sfxName of possibleSfxNames) {
        const sfx = path.join(basePath, sfxName);
        if (fs.existsSync(sfx)) {
          console.log(`🔍 Найдено: ${exePath}`);
          console.log(`🔍 Найдено: ${sfx} (${sfxName})`);
          return { exe: exePath, sfx };
        }
      }
    }
  }

  // Выводим отладочную информацию
  console.log("🔍 Проверенные пути:");
  // Убираем дубликаты вручную
  const uniquePaths: string[] = [];
  for (const basePath of possibleBasePaths) {
    if (basePath && uniquePaths.indexOf(basePath) === -1) {
      uniquePaths.push(basePath);
    }
  }
  for (const basePath of uniquePaths) {
    const exe = path.join(basePath, "7z.exe");
    console.log(`  ${basePath}`);
    console.log(`    - 7z.exe: ${fs.existsSync(exe) ? "✅" : "❌"}`);
    
    // Проверяем все возможные SFX модули
    for (const sfxName of possibleSfxNames) {
      const sfx = path.join(basePath, sfxName);
      if (fs.existsSync(sfx)) {
        console.log(`    - ${sfxName}: ✅`);
      }
    }
  }

  return null;
}

function createSfxConfig(): void {
  // Создаем конфигурационный файл для SFX модуля
  // Тихий режим, автоматическая распаковка в текущую директорию
  const config = `;!@Install@!UTF-8!
Title="МЖИ Менеджер - Установка расширения"
BeginPrompt="Распаковка расширения МЖИ Менеджер..."
ExtractPathText="Распаковка в:"
ExtractPathTitle="Выберите папку для распаковки"
ExtractPath="."
GUIMode="1"
ExecuteFile=""
ExecuteParameters=""
;!@InstallEnd@!`;

  fs.writeFileSync(configFile, config, "utf8");
}

async function replaceIcon(exePath: string, iconPath: string): Promise<boolean> {
  // Сначала пытаемся использовать rcedit (если установлен через npm)
  try {
    // Проверяем наличие rcedit в node_modules
    const rceditModulePath = path.join(__dirname, "../node_modules/rcedit/lib/rcedit.js");
    if (fs.existsSync(rceditModulePath)) {
      // Используем rcedit через require
      const rcedit = require("rcedit");
      await rcedit(exePath, {
        icon: iconPath,
      });
      return true;
    }
    
    // Пытаемся использовать rcedit через командную строку
    const rceditPath = path.join(__dirname, "../node_modules/.bin/rcedit");
    if (fs.existsSync(rceditPath) || fs.existsSync(rceditPath + ".cmd")) {
      const rcedit = fs.existsSync(rceditPath + ".cmd") ? rceditPath + ".cmd" : rceditPath;
      const command = `"${rcedit}" "${exePath}" --set-icon "${iconPath}"`;
      await execAsync(command);
      return true;
    }
  } catch (error: any) {
    // rcedit не найден или не работает, продолжаем
    console.warn(`⚠️  rcedit не доступен: ${error.message}`);
  }

  // Пытаемся использовать Resource Hacker для замены иконки
  const resourceHackerPaths = [
    "C:\\Program Files\\Resource Hacker\\ResourceHacker.exe",
    "C:\\Program Files (x86)\\Resource Hacker\\ResourceHacker.exe",
    process.env["ProgramFiles"] + "\\Resource Hacker\\ResourceHacker.exe",
    process.env["ProgramFiles(x86)"] + "\\Resource Hacker\\ResourceHacker.exe",
  ];

  for (const rhPath of resourceHackerPaths) {
    if (rhPath && fs.existsSync(rhPath)) {
      try {
        // Resource Hacker команда для замены иконки
        const command = `"${rhPath}" -open "${exePath}" -save "${exePath}.tmp" -action addoverwrite -res "${iconPath}" -mask ICONGROUP,MAINICON,`;
        await execAsync(command);
        // Заменяем оригинальный файл
        if (fs.existsSync(exePath + ".tmp")) {
          fs.unlinkSync(exePath);
          fs.renameSync(exePath + ".tmp", exePath);
          return true;
        }
      } catch (error) {
        console.warn(`⚠️  Не удалось использовать Resource Hacker: ${error}`);
      }
    }
  }

  return false;
}

async function createExe(): Promise<void> {
  console.log("🔍 Проверяем наличие 7-Zip...");

  if (!fs.existsSync(zipFile)) {
    console.error(`❌ Файл ${zipFile} не найден!`);
    console.error("💡 Сначала выполните: npm run postbuild");
    process.exit(1);
  }

  const sevenZip = await find7z();

  if (!sevenZip) {
    console.warn("⚠️  7-Zip не найден в системе!");
    console.warn("📥 Для создания .exe файла установите 7-Zip:");
    console.warn("   https://www.7-zip.org/");
    console.warn("");
    console.warn(`✅ ZIP архив создан: ${zipFile}`);
    console.warn("💡 Вы можете использовать его для установки расширения вручную.");
    process.exit(0);
  }

  console.log(`✅ 7-Zip найден: ${sevenZip.exe}`);
  console.log(`✅ SFX модуль найден: ${sevenZip.sfx}`);

  // Проверяем наличие иконки
  if (!fs.existsSync(iconFile)) {
    console.warn(`⚠️  Иконка не найдена: ${iconFile}`);
    console.warn("💡 .exe файл будет создан с иконкой по умолчанию (7-Zip)");
  } else {
    console.log(`✅ Иконка найдена: ${iconFile}`);
  }

  console.log("📦 Создаем .exe файл с GUI интерфейсом...");

  try {
    // Создаем конфигурационный файл для SFX
    createSfxConfig();
    console.log("✅ Конфигурация SFX создана");

    // Используем 7z для создания SFX с иконкой (если возможно)
    // Если иконка найдена, пытаемся использовать параметр -i
    if (fs.existsSync(iconFile)) {
      try {
        // Пытаемся создать SFX через 7z с иконкой
        // Но 7z не поддерживает прямой параметр -i для SFX, поэтому создаем обычным способом
        // и затем заменяем иконку
        console.log("🎨 Применяем иконку...");
      } catch (error) {
        console.warn("⚠️  Не удалось применить иконку через 7z, создаем без иконки");
      }
    }

    // Объединяем: SFX модуль + конфиг + архив = .exe
    const sfxBuffer = fs.readFileSync(sevenZip.sfx);
    const configBuffer = fs.readFileSync(configFile);
    const zipBuffer = fs.readFileSync(zipFile);

    // Записываем в правильном порядке: SFX + Config + Archive
    const exeBuffer = Buffer.concat([sfxBuffer, configBuffer, zipBuffer]);
    fs.writeFileSync(exeFile, exeBuffer);

    // Пытаемся заменить иконку после создания .exe
    if (fs.existsSync(iconFile)) {
      console.log("🎨 Заменяем иконку в .exe файле...");
      const iconReplaced = await replaceIcon(exeFile, iconFile);
      if (iconReplaced) {
        console.log("✅ Иконка успешно применена!");
      } else {
        console.warn("⚠️  Не удалось автоматически заменить иконку.");
        console.warn("💡 Для замены иконки установите Resource Hacker:");
        console.warn("   http://www.angusj.com/resourcehacker/");
        console.warn(`   Затем откройте ${exeFile} и замените иконку вручную.`);
      }
    }

    // Удаляем временный конфигурационный файл
    fs.unlinkSync(configFile);

    console.log(`✅ .exe файл создан: ${exeFile}`);
    console.log("🎉 Готово! Файл будет распаковываться с GUI интерфейсом.");
  } catch (error: any) {
    console.error("❌ Ошибка при создании .exe файла:", error.message);
    // Удаляем конфиг файл в случае ошибки
    if (fs.existsSync(configFile)) {
      fs.unlinkSync(configFile);
    }
    process.exit(1);
  }
}

createExe();
