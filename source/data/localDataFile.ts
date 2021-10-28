import fs from 'fs';
/**
 * Reads data from json file
 * @returns Local json data
 */

function readData(): string {
  if (process.env.DATA_SOURCE === undefined) {
    throw new Error('DATA_SOURCE not defined');
  }
  return fs.readFileSync(process.env.DATA_SOURCE!, { encoding: 'utf-8' });
}

export default {
  readData
};
