const tokenKey = global.SALT_KEY
const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    return jwt.sign(data, tokenKey, { expiresIn: '1d' })
}
exports.validatiorToken = async (token) => {
    let verification = await jwt.verify(token, tokenKey)
    return verification
}
exports.authorize = function (require, response, next) {
    let token = require.body.token || require.query.token || require.headers['x-access-token']

    if (!token) {
        response.status(401).json({
            message: "UNAUTHORIZED!"
        })
    } else {
        jwt.verify(token, tokenKey, function (e, decoded) {
            if (e) {
                response.status(401).json({
                    message: "INVALID TOKEN!"
                })
            }
            else {
                next()
            }
        })
    }

}
exports.isAdmin = async function (require, response, next) {
    let token = require.body.token || require.query.token || require.headers['x-access-token']
    if (!token) {
        response.status(401).json({
            message: "UNAUTHORIZED!"
        })
    } else {
        jwt.verify(token, tokenKey, function (err ,decoded) {
            if (err) {
                response.status(401).json({
                    message:'invalid Token'
                })
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                }
                else {
                    response.status(403).json({
                        message: "action only for admins"
                    });
                }
            }
        });
    }
}
