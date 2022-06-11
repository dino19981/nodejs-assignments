import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { processingCommands } from './commands.js';

export function makeReadline(userName) {
  const rl = readline.createInterface({ input, output });

  rl.on('line', (text) => {
    if (text === '.exit') {
      rl.close();
      return;
    }
    processingCommands(text);
  });

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
  });
}
