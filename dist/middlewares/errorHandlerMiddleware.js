"use strict";
exports.__esModule = true;
exports.generateThrowErrorMessages = void 0;
function errorHandler(error, req, res, next) {
    console.log(error);
    var errorStatus = {
        "BadRequest": 400,
        "Unauthorized": 401,
        "NotFound": 404,
        "Conflict": 409,
        "UnprocessableEntity": 422,
        "InternalServerError": 500
    };
    if (errorStatus[error.code] === undefined)
        return res.sendStatus(500);
    return res.status(errorStatus[error.code]).send(error.message);
}
exports["default"] = errorHandler;
function generateThrowErrorMessages(code, message) {
    var error = {
        code: code,
        message: message
    };
    throw (error);
}
exports.generateThrowErrorMessages = generateThrowErrorMessages;
