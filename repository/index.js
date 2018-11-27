import Sequelize from 'sequelize';

export default class Repository {
  constructor(db, model) {
    this.db = db;
    this.model = model(db, Sequelize);
  }

  first = where => this.model.findOne({ where });

  findById = id => this.model.findById(id);

  findOne = where => this.model.findOne({ where });

  findAll = () => this.model.all();

  where = where => this.model.findAll({ where });

  create = value => this.model.create(value)

  update = (id, value) => this.model
    .findById(id)
    .then(user => user.update(value));

  delete = value => this.model
    .findById(value.id)
    .then(user => user.destroy());
}
