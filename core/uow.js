import Sequelize from 'sequelize';
import * as appConfig from '../configs/application.config';
import databaseConfig from '../configs/database.config';
import Repository from '../repository';
import logger from '../logger';

const database = databaseConfig[appConfig.node_env];

export default function UnitOfWork(model) {
  const db = new Sequelize({
    database: database.database,
    username: database.username,
    password: database.password,
    dialect: database.dialect,
  });

  db.authenticate()
    .then(() => {
      logger.info(`Authenticate postgresql. DB_NAME: ${database.database}, DB_USER: ${database.username}`);
    })
    .catch((e) => {
      throw new Error(e);
    });

  return new Repository(db, model);
}
