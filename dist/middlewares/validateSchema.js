"use strict";
exports.__esModule = true;
var string_strip_html_1 = require("string-strip-html");
function validateSchema(schema) {
    return function (req, res, next) {
        var _a;
        console.log("aqui");
        var body = req.body;
        for (var _i = 0, _b = Object.keys(body); _i < _b.length; _i++) {
            var key = _b[_i];
            typeof (body[key]) === "string" ? body[key] = (_a = (0, string_strip_html_1.stripHtml)(body[key])) === null || _a === void 0 ? void 0 : _a.result.trim() : body[key];
        }
        var error = schema.validate(body, { abortEarly: false }).error;
        if (error) {
            var errorMessages = error.details.map(function (item) { return item.message; });
            var finalError = errorMessages.reduce(function (prev, curr) {
                return "".concat(prev, " \n ").concat(curr);
            }, "");
            return res.status(422).send(finalError);
        }
        else {
            res.locals.body = body;
            next();
        }
    };
}
exports["default"] = validateSchema;
