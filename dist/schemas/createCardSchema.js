"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var typesOfBenefits = ['groceries', 'restaurant', 'transport', 'education', 'health'];
var createCardSchema = joi_1["default"].object({
    type: joi_1["default"].valid.apply(joi_1["default"], typesOfBenefits).required()
});
exports["default"] = createCardSchema;
