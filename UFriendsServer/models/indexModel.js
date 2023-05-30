import dbConfig from '../config/database.js';
import {Sequelize} from 'sequelize';
import UsersModel from './UsersModel.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST, dialect: dbConfig.dialect, port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max, min: dbConfig.pool.min, acquire: dbConfig.pool.acquire, idle: dbConfig.pool.idle
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log('ici', dbConfig)
    console.error('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = UsersModel(sequelize);

db.sequelize.sync({force: false}).then(() => {
    console.log('yes re-sync done!');
}).catch(err => {
    console.log('error re-sync done!', err);
})

export default db;