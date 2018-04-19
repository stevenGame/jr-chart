/* eslint-disable */
const Sequelize = require('sequelize');


module.exports = class Symbol {
    static init(sequelize) {
        if (Symbol.cls == null) {
            const cls = sequelize.define('Symbol', {
                name: {
                    type: Sequelize.STRING
                },
                symbol: {
                    // should be primary key?
                    type: Sequelize.STRING
                },
                full_name: {
                    type: Sequelize.STRING
                },
                description: {
                    type: Sequelize.STRING
                },
                exchange: {
                    type: Sequelize.STRING
                },
                ticker: {
                    // primary key
                    type: Sequelize.STRING
                },
                type: {
                    type: Sequelize.STRING
                },
                timezone: Sequelize.STRING,
                minmov: Sequelize.DECIMAL,
                minmov2: Sequelize.DECIMAL,
                pointvalue: Sequelize.DECIMAL,
                session: Sequelize.STRING,
                has_intraday: Sequelize.BOOLEAN,
                pricescale: Sequelize.INTEGER

            });
            Symbol.cls = cls
        }

        return Symbol.cls
    }

    static demo() {
        return {
            "name": "AAPL",
            "exchange-traded": "NasdaqNM",
            "exchange-listed": "NasdaqNM",
            "timezone": "America/New_York",
            "minmov": 1,
            "minmov2": 0,
            "pointvalue": 1,
            "session": "0930-1630",
            "has_intraday": false,
            "has_no_volume": false,
            "description": "俊瑞网络",
            "type": "stock",
            "supported_resolutions": [
                "D",
                "2D",
                "3D",
                "W",
                "3W",
                "M",
                "6M"
            ],
            "pricescale": 100,
            "ticker": "AAPL"
        }
    }
}