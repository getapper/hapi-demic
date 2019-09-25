// DBS
import { ObjectId } from 'bson';

// LIBS
import _ from 'lodash';
import moment from 'moment';

export default class MongoBase {
  ['constructor']: typeof MongoBase
  _id: ObjectId
  created: Date

  init (params?) {
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
    return process.daos['mongo'];
  }

  async getById(_id, db) {
    let result = await MongoBase.dao.findOne(this.constructor.collectionName, {
      _id
    });
    result && this.init(result);
    return result !== null;
  }

  async update(object, db) {
    const response = await MongoBase.dao.update(
      db,
      this.constructor.collectionName,
      { _id: this._id },
      {
        $set: {
          ...object,
          updated: moment().toDate()
        }
      }
    );
    const result = _.get(response, 'ok', false);
    if (result) {
      this.init(response.value);
    } else {
      throw new Error(`Error updating ${this.constructor.collectionName}. _id: ${this._id}, params: ${object}`);
    }
  }

  async save(db) {
    this.created = moment().toDate();
    const response = await MongoBase.dao.create(db, this.constructor.collectionName, this);
    if (_.get(response, 'result.ok', false)) {
      this._id = _.get(response, 'insertedId', null);
    }
    return _.get(response, 'result.ok', false);
  }
}
