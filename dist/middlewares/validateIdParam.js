"use strict";
exports.__esModule = true;
exports.validateIdParam = void 0;
var string_strip_html_1 = require("string-strip-html");
function validateIdParam(req, res, next) {
    var id = Number((0, string_strip_html_1.stripHtml)(req.params.id).result.trim());
    if (!id)
        return res.status(422).send("Id must be a valid one");
    res.locals.id = id;
    next();
}
exports.validateIdParam = validateIdParam;
