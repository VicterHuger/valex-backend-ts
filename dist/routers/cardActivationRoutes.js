"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var cardActivationController_1 = require("../controllers/cardActivationController");
var validateIdParam_1 = require("../middlewares/validateIdParam");
var validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
var cardActivateSchema_1 = __importDefault(require("../schemas/cardActivateSchema"));
var router = (0, express_1.Router)();
router.patch("/cards/activate/:id", (0, validateSchema_1["default"])(cardActivateSchema_1["default"]), validateIdParam_1.validateIdParam, cardActivationController_1.activateCard);
exports["default"] = router;
