import { fileURLToPath } from 'url';
import path from 'path';
import { makeReadline } from './input.js';
import { getUserName } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function onStart() {
  const userName = getUserName();

  if (!userName) return;

  console.log(`Welcome to the File Manager, ${userName}!`);
  makeReadline(userName);
}

onStart();
