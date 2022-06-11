import { fileURLToPath } from 'url';
import path from 'path';
import os from 'node:os';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export function getUserName() {
  const args = process.argv.slice(2);

  if (!args) {
    console.log('Пожалуйста введите корректную команду');
    return;
  }

  const userName = args[0].split('=')[1];

  if (!userName) {
    console.log('Пожалуйста введите корректную команду');
    return;
  }

  return userName;
}

export function getPath(currentPath, pathToFile) {
  const isAbsolutePath = path.isAbsolute(pathToFile);

  if (isAbsolutePath) {
    const homeDir = os.homedir();
    const absolutePath = homeDir.split(path.sep)[0];
    return path.normalize(absolutePath + pathToFile);
  }

  return path.normalize(currentPath + path.sep + pathToFile);
}
