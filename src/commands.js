import path from 'path';
import { __dirname } from './utils.js';
import { goToPrevDirectory, goToDirectory, getAllFolderInfo } from './navigation.js';
import {
  readFile,
  createFile,
  renameFile,
  copyFile,
  relocateFile,
  deleteFile,
} from './fileOperations.js';
import { getSystemOptions } from './OperationSystem.js';
import { calcHash } from './hash.js';
import { gzip, unzip } from './zipOperations.js';

let startPath = __dirname;

export async function processingCommands(command) {
  const [commandIdentification, ...args] = command.split(' ');
  switch (commandIdentification) {
    case 'up': {
      startPath = await goToPrevDirectory(startPath);
      break;
    }
    case 'cd': {
      startPath = await goToDirectory(startPath, args[0]);
      break;
    }
    case 'ls': {
      await getAllFolderInfo(startPath);
      break;
    }
    case 'cat': {
      await readFile(startPath, args[0]);
      break;
    }
    case 'add': {
      await createFile(startPath, args[0]);
      break;
    }
    case 'rn': {
      await renameFile(startPath, args[0], args[1]);
      break;
    }
    case 'cp': {
      await copyFile(startPath, args[0], args[1]);
      break;
    }
    case 'mv': {
      await relocateFile(startPath, args[0], args[1]);
      break;
    }
    case 'rm': {
      await deleteFile(startPath, args[0]);
      break;
    }
    case 'os': {
      await getSystemOptions(args[0]);
      break;
    }
    case 'hash': {
      await calcHash(startPath, args[0]);
      break;
    }
    case 'compress': {
      await gzip(startPath, args[0], args[1]);
      break;
    }
    case 'decompress': {
      await unzip(startPath, args[0], args[1]);
      break;
    }
    default: {
      console.log('Invalid input');
    }
  }
  console.log(`You are currently in ${startPath}`);
}
