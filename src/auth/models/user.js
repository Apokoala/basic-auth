const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const COMPLEXITY = 8;

async function makeUser(sequelize) {
  console.log('makeUser function')
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.createWithHashed = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, COMPLEXITY);
    return User.create({ username, password: hashedPassword });
  };

  User.findLoggedIn = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;
    return bcrypt.compare(password, user.password) ? user : null;
  };

  return User;
}

module.exports = { makeUser };