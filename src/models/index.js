const { Sequelize } = require('sequelize')
const { makeFood } = require('./user.model')
const { makeSauce } = require('./sauce.model')
const Collection = require('./class-collection')

const DATABASE_URL =
    process.env.NODE_ENV === 'test'
        ? 'sqlite::memory:'
        : process.env.DATABASE_URL

const CONNECTION_OPTIONS =
    process.env.NODE_ENV === 'test'
        ? {}
        : {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          }

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS)

const Food = makeFood(sequelize)
const Sauce = makeSauce(sequelize)

module.exports = {
    sequelize,
    foodCollection: new Collection(Food),
    sauceCollection: new Collection(Sauce),
}