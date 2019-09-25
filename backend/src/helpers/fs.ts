// LIBS
import fs from 'fs';
import util from 'util';

const readdir = util.promisify(fs.readdir);

export const listDirectory = async path => {
  const dirs = await readdir(path);
  return dirs.filter(d => fs.lstatSync(`${path}/${d}`).isDirectory());
};
