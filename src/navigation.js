import fs from 'fs/promises';
import path from 'path';
import os from 'node:os';
import { getPath } from './utils.js';

export async function goToPrevDirectory(currentPath) {
  const arrayPath = currentPath.split(path.sep);
  if (arrayPath.length === 1) {
    return currentPath;
  }
  arrayPath.pop();
  return arrayPath.join(path.sep);
}

export async function goToDirectory(currentPath, directoryPath) {
  const pathToDirectory = getPath(currentPath, directoryPath);

  try {
    await fs.opendir(pathToDirectory);
    return path.normalize(pathToDirectory);
  } catch {
    console.log('Operation failed');
    return path.normalize(currentPath);
  }
}

export async function getAllFolderInfo(currentPath) {
  try {
    const allInfo = await fs.opendir(currentPath);
    for await (let item of allInfo) {
      console.log(item.name);
    }
  } catch {
    console.log('Operation failed');
  }
}
