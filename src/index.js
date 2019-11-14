import app from './app';
import '@babel/polyfill';

const thePort = 4000;

async function main() {
  await app.listen(thePort);
  console.log(`Server on port ${thePort}`);
}

main();