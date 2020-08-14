const jwt = require('jsonwebtoken');
const config = require('config');
/**
 * verifies the token provided token
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}