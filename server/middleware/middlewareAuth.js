const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        return res.status(200)
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer
        if (!token) {
            return res.status(401).json({message: "Не авторизований користувачxxxx"})
        }
        const decoded = jwt.verify(token, process.env.PRIMARY_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: "Не авторизований користувачcccc"})
    }
}