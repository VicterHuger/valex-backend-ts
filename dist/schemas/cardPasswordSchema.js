"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var cardPasswordSchema = joi_1["default"].object({
    password: joi_1["default"].string().length(4).pattern(/^[0-9]+$/).required()
});
exports["default"] = cardPasswordSchema;
