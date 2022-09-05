"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var cardRechargeController_1 = require("../controllers/cardRechargeController");
var validateApiKey_1 = require("../middlewares/validateApiKey");
var validateIdParam_1 = require("../middlewares/validateIdParam");
var validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
var cardRechargeSchema_1 = __importDefault(require("../schemas/cardRechargeSchema"));
var router = (0, express_1.Router)();
router.post('/cards/recharge/:id', (0, validateSchema_1["default"])(cardRechargeSchema_1["default"]), validateApiKey_1.validateApiKey, validateIdParam_1.validateIdParam, cardRechargeController_1.rechargeCard);
exports["default"] = router;
