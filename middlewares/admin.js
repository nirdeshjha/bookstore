/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access Denied');
    next();
}