const logger = (req, _, next) => {
    console.log(req.path)
    next()
}

module.exports = logger