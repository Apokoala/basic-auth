const { DataTypes } = require('sequelize')

function makeSauce(sequelize) {
    return sequelize.define('Sauce', {
        name: DataTypes.STRING,
        group: DataTypes.STRING,
    })
}

module.exports = { makeSauce }