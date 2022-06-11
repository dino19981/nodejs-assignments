import os from 'node:os';

export function getSystemOptions(optionName) {
  switch (optionName) {
    case '--EOL': {
      console.log(os.EOL);
      break;
    }
    case '--cpus': {
      const cpus = os.cpus();
      console.log(cpus);
      break;
    }
    case '--homedir': {
      const homedir = os.homedir();
      console.log(homedir);
      break;
    }
    case '--username': {
      const userInfo = os.userInfo();
      console.log(userInfo.username);
      break;
    }
    case '--architecture': {
      const arch = os.arch();
      console.log(arch);
      break;
    }
  }
}
