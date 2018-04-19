/* eslint-disable */
const Sequelize = require('sequelize');
const Symbol = require('../models/Symbol')
const History = require('../models/History')
module.exports = class DBInit {
    static init() {
        const sequelize = new Sequelize('stockDB', null, null, {
            dialect: 'sqlite',
            operatorsAliases: false,

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            // SQLite only
            storage: 'server/db/stock.sqlite'
        });
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                Symbol.init(sequelize)
                    .sync({force: true})
                    .then(() => {
                        return Symbol.cls.create(Symbol.demo())
                    });
                History.init(sequelize)
                    .sync({force: true})
                    .then(() => {
                        History.cls.create(History.demo())
                    });
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        return sequelize
    }
}
