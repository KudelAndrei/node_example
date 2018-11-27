import { DISABLE } from './entityStatus';

export default (database, Sequelize) => {
  const User = database.define('user', {
    email: {
      unique: true,
      type: Sequelize.STRING,
    },
    password: Sequelize.STRING,
    status: {
      type: Sequelize.INTEGER,
      defaultValue: +DISABLE,
    },
  }, {});
  User.associate = function (models) {};
  return User;
};
