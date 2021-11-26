const jwt = require("jsonwebtoken")
const connection = require('./connection')
const Cyclist = require('./models/cyclist')(connection)

const secret = process.env.JWT_SECRET;

const authenticate = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({
            status: false,
        })
        return
    }

    const token = req.headers.authorization.split(" ")[1]
    try {
        var decoded = jwt.verify(token, secret)
        req.body.jwtRole = decoded.Role
        req.body.jwtRegCode = decoded.RegCode
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message
        });
        return
    }

    if (decoded.Role !== 'panitia' && req.params.id && req.params.id !== decoded.RegCode) {
        res.status(403).end()
        return
    }

    next()

}

module.exports = authenticate