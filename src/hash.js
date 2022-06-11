import { getPath } from './utils.js';
import crypto from 'crypto';
import fs from 'fs/promises';

export async function calcHash(currentPath, filePath) {
  const pathToFile = getPath(currentPath, filePath);

  try {
    const fileData = await fs.readFile(pathToFile);
    const hexFileData = crypto.createHash('sha256').update(fileData).digest('hex');
    console.log(hexFileData);
  } catch {
    console.log('Operation failed');
  }
}
