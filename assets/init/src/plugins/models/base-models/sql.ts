// LIBS
import _ from 'lodash';
import moment from 'moment';

export default class MySQLBase {
  ['constructor']: typeof MySQLBase
  id: number
  created: Date

  init(params?) {
    Object.assign(this, params);
  }

  constructor(params?) {
    if (typeof params !== 'undefined') {
      this.init(params);
    }
  }

  static get collectionName() {
    return '';
  }

  static get dao() {
    return process.daos['sql'];
  }

  async getById(id) {
    let result = await MySQLBase.dao.findOne( this.constructor.collectionName, {
      id
    });
    result && this.init(result);
    return result !== null;
  }

  async save() {

    const response = await MySQLBase.dao.create(this.constructor.collectionName, this);
    if (_.get(response, 'affectedRows', false)) {
      this.id = _.get(response, 'insertedId', null);
    }
    return _.get(response, 'result.ok', false);
  }
}
