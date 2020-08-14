/**
 * wrapper around the api routes.
 * @param {function} handler 
 */
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    };
}