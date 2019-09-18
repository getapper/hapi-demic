import fs from 'fs';
import util from 'util';

export default class Project {
  version: String

  static get path() {
    return `${process.cwd()}/.hapi-demic.json`;
  }

  async read() {
    const readFile = util.promisify(fs.readFile);
    let buffer: Buffer = null;
    try {
      buffer = await readFile(Project.path);
    } catch (e) {}
    if (buffer) {
      Object.assign(this, JSON.parse(buffer.toString()));
    } else {
      this.version = null;
    }
  }
}
