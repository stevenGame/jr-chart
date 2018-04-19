/* eslint-disable */
const Sequelize = require('sequelize');

module.exports = class History {

    static init(sequelize) {
        if (History.cls == null) {
            const historyCls = sequelize.define('History', {
                time: Sequelize.INTEGER,
                openPrice: Sequelize.DECIMAL,
                closingPrice: Sequelize.DECIMAL,
                highPrice: Sequelize.DECIMAL,
                lowPrice: Sequelize.DECIMAL,
                volume: Sequelize.DECIMAL,
                // many to one to symbol table
                ticker: Sequelize.DECIMAL

            });
            History.cls = historyCls;
        }

        return History.cls;
    }


    /**
     *
     * @returns History object
     */
    static demo() {
        return {
            time: 1492992000,
            openPrice: 143.5,
            closingPrice: 143.64,
            highPrice: 143.95,
            lowPrice: 143.18,
            volume: 17116599,
            ticker: 'APPL'
        }
    }
}