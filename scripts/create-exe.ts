import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

const execAsync = promisify(exec);

const buildDir = path.join(__dirname, "../build");
const archive7z = path.join(__dirname, "../MJI-manager.7z");
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

/**
 * Заменяет иконку в SFX-модуле (копия) и возвращает буфер.
 * Важно: rcedit нельзя вызывать для готового .exe (SFX + конфиг + 7z), иначе он обрезает
 * прикреплённый архив и файл перестаёт открываться как 7z. Меняем иконку только в копии SFX.
 */
async function getSfxBufferWithIcon(sfxPath: string, iconPath: string): Promise<Buffer> {
  const tmpSfx = path.join(__dirname, "../7zSfx-tmp-icon.sfx");
  try {
    fs.copyFileSync(sfxPath, tmpSfx);
  } catch (e) {
    console.warn("⚠️ Не удалось создать копию SFX для иконки, используем оригинал");
    return fs.readFileSync(sfxPath);
  }

  try {
    const rceditModulePath = path.join(__dirname, "../node_modules/rcedit/lib/rcedit.js");
    if (fs.existsSync(rceditModulePath)) {
      const rcedit = require("rcedit");
      await rcedit(tmpSfx, { icon: iconPath });
      const buf = fs.readFileSync(tmpSfx);
      fs.unlinkSync(tmpSfx);
      return buf;
    }
    const rceditPath = path.join(__dirname, "../node_modules/.bin/rcedit");
    const rceditBin = fs.existsSync(rceditPath + ".cmd") ? rceditPath + ".cmd" : rceditPath;
    if (fs.existsSync(rceditBin) || fs.existsSync(rceditPath)) {
      const cmd = `"${rceditBin}" "${tmpSfx}" --set-icon "${iconPath}"`;
      await execAsync(cmd);
      const buf = fs.readFileSync(tmpSfx);
      fs.unlinkSync(tmpSfx);
      return buf;
    }
  } catch (error: any) {
    console.warn(`⚠️ rcedit не доступен или ошибка: ${error.message}, используем SFX без своей иконки`);
  }
  if (fs.existsSync(tmpSfx)) {
    const buf = fs.readFileSync(tmpSfx);
    fs.unlinkSync(tmpSfx);
    return buf;
  }
  return fs.readFileSync(sfxPath);
}

async function createExe(): Promise<void> {
  console.log("🔍 Проверяем наличие 7-Zip...");

  if (!fs.existsSync(buildDir)) {
    console.error(`❌ Папка ${buildDir} не найдена!`);
    console.error("💡 Сначала выполните: npm run build");
    process.exit(1);
  }

  const sevenZip = await find7z();

  if (!sevenZip) {
    console.warn("⚠️  7-Zip не найден в системе!");
    console.warn("📥 Для создания .exe файла установите 7-Zip:");
    console.warn("   https://www.7-zip.org/");
    process.exit(0);
  }

  console.log(`✅ 7-Zip найден: ${sevenZip.exe}`);
  console.log(`✅ SFX модуль найден: ${sevenZip.sfx}`);

  // Проверяем наличие иконки
  if (!fs.existsSync(iconFile)) {
    console.warn(`⚠️  Иконка не найдена: ${iconFile}`);
  } else {
    console.log(`✅ Иконка найдена: ${iconFile}`);
  }

  console.log("📦 Создаем .exe файл (SFX ожидает формат .7z, не .zip)...");

  try {
    // 1. Создаём архив .7z из папки build (7-Zip SFX понимает только .7z!)
    console.log("📦 Создаём архив .7z из папки build...");
    // Архивируем содержимое build/ в корень архива (manifest.json, index.html и т.д.)
    const sevenZipExe = sevenZip.exe === "7z" ? "7z" : `"${sevenZip.exe}"`;
    const archive7zAbs = path.resolve(archive7z);
    const addCmd = `${sevenZipExe} a -t7z "${archive7zAbs}" *`;
    await execAsync(addCmd, { cwd: buildDir });
    if (!fs.existsSync(archive7zAbs)) {
      throw new Error("Не удалось создать архив .7z");
    }
    console.log(`✅ Архив создан: ${archive7z}`);

    // 2. Конфигурация SFX
    createSfxConfig();
    console.log("✅ Конфигурация SFX создана");

    // 3. SFX с иконкой (меняем иконку в копии SFX, не в готовом .exe — иначе rcedit обрезает прикреплённый 7z)
    let sfxBuffer: Buffer;
    if (fs.existsSync(iconFile)) {
      console.log("🎨 Подставляем иконку в SFX-модуль...");
      sfxBuffer = await getSfxBufferWithIcon(sevenZip.sfx, iconFile);
      console.log("✅ Иконка применена к SFX.");
    } else {
      sfxBuffer = fs.readFileSync(sevenZip.sfx);
    }

    // 4. Объединяем: SFX модуль + конфиг + архив .7z = .exe (один раз, без последующего rcedit!)
    const configBuffer = fs.readFileSync(configFile);
    const archiveBuffer = fs.readFileSync(archive7zAbs);
    const exeBuffer = Buffer.concat([sfxBuffer, configBuffer, archiveBuffer]);
    fs.writeFileSync(exeFile, exeBuffer);

    // Удаляем временный .7z
    if (fs.existsSync(archive7zAbs)) {
      fs.unlinkSync(archive7zAbs);
    }

    // Удаляем временный конфигурационный файл
    fs.unlinkSync(configFile);

    console.log(`✅ .exe файл создан: ${exeFile}`);
    console.log("🎉 Готово! Файл будет распаковываться с GUI интерфейсом.");
  } catch (error: any) {
    console.error("❌ Ошибка при создании .exe файла:", error.message);
    if (fs.existsSync(configFile)) fs.unlinkSync(configFile);
    const temp7z = path.resolve(__dirname, "../MJI-manager.7z");
    if (fs.existsSync(temp7z)) fs.unlinkSync(temp7z);
    process.exit(1);
  }
}

createExe();
