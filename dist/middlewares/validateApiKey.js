"use strict";
exports.__esModule = true;
exports.validateApiKey = void 0;
function validateApiKey(req, res, next) {
    var apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(400).send("The header x-api-key is missing or it is wrong formated");
    }
    res.locals.apiKey = apiKey;
    next();
}
exports.validateApiKey = validateApiKey;
