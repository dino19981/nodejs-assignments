import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { getPath } from './utils.js';

export function readFile(currentPath, filePath) {
  const pathToFile = getPath(currentPath, filePath);
  const readStream = fs.createReadStream(pathToFile, 'utf-8');

  readStream.on('data', (data) => {
    console.log(data);
  });

  readStream.on('error', () => {
    console.log('Operation failed');
  });
}

export async function createFile(currentPath, fileName) {
  const pathToFile = path.normalize(currentPath + path.sep + fileName);
  try {
    await fsPromises.appendFile(pathToFile, '');
  } catch {
    console.log('Operation failed');
  }
}

export async function renameFile(currentPath, fileName, newFileName) {
  const pathToFile = getPath(currentPath, fileName);

  try {
    await fsPromises.rename(pathToFile, newFileName);
  } catch {
    console.log('Operation failed');
  }
}

export async function copyFile(currentPath, fileName, copyFolder) {
  const pathToFile = getPath(currentPath, fileName);
  const pathToDestFolder = getPath(currentPath, copyFolder);
  try {
    await fsPromises.copyFile(pathToFile, pathToDestFolder);
  } catch {
    console.log('Operation failed');
  }
}

export async function relocateFile(currentPath, fileName, newPath) {
  const pathToFile = getPath(currentPath, fileName);
  const pathToDestFolder = getPath(currentPath, newPath);
  try {
    await fsPromises.copyFile(pathToFile, pathToDestFolder);
    await fsPromises.unlink(pathToFile);
  } catch {
    console.log('Operation failed');
  }
}

export async function deleteFile(currentPath, fileName) {
  const pathToFile = getPath(currentPath, fileName);
  console.log(pathToFile);
  try {
    await fsPromises.unlink(pathToFile);
  } catch {
    console.log('Operation failed');
  }
}
