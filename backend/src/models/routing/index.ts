import fs from 'fs';
import util from 'util';

export default class Routing {
  apis: String

  static get path() {
    return `${process.cwd()}/src/constants/apis.json`;
  }

  async read() {
    const readFile = util.promisify(fs.readFile);
    let buffer: Buffer = null;
    try {
      buffer = await readFile(Routing.path);
    } catch (e) {}
    this.apis = !!buffer ? JSON.parse(buffer.toString()) : null;
  }
}
