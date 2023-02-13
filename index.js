require('dotenv').config();
const { start } = require('./src/server');

sequelize.sync().then(() => {
    console.log('Connection Successful');
    start();
}).catch(err => console.error(err));