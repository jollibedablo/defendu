const { createInterface } = require('readline');
const { spawn } = require('child_process');

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer?.trim().toLowerCase());
    });
  });
}

(async () => {
  const answer = await ask('Run as tunnel? (y/n, default n): ');
  const useTunnel = answer === 'y' || answer === 'yes';
  const args = ['expo', 'start', ...(useTunnel ? ['--tunnel'] : [])];
  const proc = spawn('npx', args, { stdio: 'inherit', shell: true });
  proc.on('exit', (code) => process.exit(code ?? 0));
})();
