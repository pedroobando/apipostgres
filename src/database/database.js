import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
  'apitest',
  'postgres',
  'c9817803#',
  {
    host: '172.17.0.2',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    },
    logging: false
  }
)