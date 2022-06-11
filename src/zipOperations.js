import { promisify } from 'node:util';
import { getPath } from './utils.js';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'path';

const pipe = promisify(pipeline);

export async function gzip(currentPath, pathToFile, pathToQzipFile) {
  const pathToFileInput = getPath(currentPath, pathToFile);
  const fileName = pathToFileInput.split(path.sep).pop();
  const pathToFileDestination = getPath(currentPath, pathToQzipFile) + path.sep + fileName + '.gz';

  const gzip = createGzip();
  const source = createReadStream(pathToFileInput);
  const destination = createWriteStream(pathToFileDestination);
  try {
    await pipe(source, gzip, destination);
    await rm(pathToFileInput);
  } catch {
    console.log('Operation failed');
  }
}

export async function unzip(currentPath, pathToFile, pathToUnzipFile) {
  const pathToFileInput = getPath(currentPath, pathToFile);
  const fileName = pathToFileInput.split(path.sep).pop();
  const pathToFileDestination = getPath(currentPath, pathToUnzipFile) + path.sep + fileName + '.gz';

  const unzip = zlib.createUnzip();
  const source = fs.createReadStream(pathToFileInput);
  const destination = fs.createWriteStream(pathToFileDestination);
  try {
    await pipe(source, unzip, destination);
    await rm(pathToFileInput);
  } catch (error) {
    console.log('Operation failed');
  }
}
