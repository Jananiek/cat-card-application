import minimist from 'minimist';
import { bindTwoImages } from './modules/images/services/index.js';
const argv = minimist(process.argv.slice(2));
//--greeting hello --who you --width 400 --height 500 --color pink --size 100

async function main() {
  try {
    await bindTwoImages(argv);
  } catch (error) {
    throw new Error(`Something went wrong : ${error.message}`);
  }
}
await main();
