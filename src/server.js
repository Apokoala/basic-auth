const express = require('express')
const { foodRoutes } = require('./routes/food.route')
const { sauceRoutes } = require('./routes/sauce.route')
const logger = require('./middleware/logger')
const errorHandler = require('./error-handlers/500')
const notFound = require('./error-handlers/404')
const { authRoutes } = require('./auth')
const server = express();
const PORT = process.env.PORT || 3002

server.use(authRoutes);
server.use(logger);
server.use(express.json());
server.use(foodRoutes);
server.use(sauceRoutes);
server.use('*', notFound);
server.use(errorHandler);

const start = () => {
    server.listen(PORT, () => console.log('listening on port', PORT));
}
module.exports = {
    server,
    start,
}