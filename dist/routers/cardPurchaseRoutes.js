"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var cardPurchasesControler_1 = require("../controllers/cardPurchasesControler");
var validateIdParam_1 = require("../middlewares/validateIdParam");
var validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
var cardPurchasePOSSchema_1 = __importDefault(require("../schemas/cardPurchasePOSSchema"));
var router = (0, express_1.Router)();
router.post("/cards/purchase/:id", (0, validateSchema_1["default"])(cardPurchasePOSSchema_1["default"]), validateIdParam_1.validateIdParam, cardPurchasesControler_1.createPurchase);
exports["default"] = router;
