// DAOS
import mongoDaoFactory from 'root/daos/mongo';
import sqlDaoFactory from 'root/daos/sql';

// MODELS
import {
  MongoBase,
  MySQLBase
} from './base-models';
import LogModel from './log';
import LogErrorModel from './log-error';
import LogInternalErrorModel from './log-internal-error';

const plugin = {
  async register (server, {
    useMongo,
    useMysql,
    useMssql,
    loggerDb,
    auth
  }) {
    let mongoDb: any;
    let mysqlDb: any;
    let mssqlDb: any;
    let mongoDao: any;
    let mysqlDao: any;
    let mssqlDao: any;
    let LoggerBase: any;
    let Log: any;
    let LogError: any;
    let LogInternalError: any;

    process.daos = {};
    if (useMongo) {
      mongoDb = server.mongo.db;
      mongoDao = mongoDaoFactory(mongoDb);
      process.daos['mongo'] = mongoDao;
    }
    if (useMysql) {
      mysqlDb = server.mysql.db;
      mysqlDao = sqlDaoFactory(mysqlDb);
      process.daos['sql'] = mysqlDao;
    }
    if (useMssql) {
      mssqlDb = server.mysql.db;
      mssqlDao = sqlDaoFactory(mysqlDb);
      process.daos['sql'] = mssqlDao;
    }

    switch (loggerDb) {
      case 'mongo':
        LoggerBase = MongoBase;
        break;
      case 'mysql':
        LoggerBase = MySQLBase;
        break;
    }

    if (LoggerBase) {
      Log = LogModel(LoggerBase);
      LogError = LogErrorModel(LoggerBase);
      LogInternalError =  LogInternalErrorModel(LoggerBase);
    };

    const expose = {
      Log,
      LogError,
      LogInternalError
    };

    server.decorate('server', 'models', expose);
    server.decorate('request', 'models', expose);
  },
  name: 'hapi-models',
  version: '0.0.0'
};

export default {
  plugin
};
