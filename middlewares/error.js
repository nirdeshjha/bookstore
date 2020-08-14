/**
 * breaks the flow of code if some connection is dropped.
 * @param {object} err 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
module.exports = function (err, req, res, next) {

    res.status(500).send('Something failed.');
}