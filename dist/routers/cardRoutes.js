"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
var createCardSchema_1 = __importDefault(require("../schemas/createCardSchema"));
var validateApiKey_1 = require("../middlewares/validateApiKey");
var cardOperationsController_1 = require("../controllers/cardOperationsController");
var validateIdParam_1 = require("../middlewares/validateIdParam");
var router = (0, express_1.Router)();
router.post("/cards/create/:id", (0, validateSchema_1["default"])(createCardSchema_1["default"]), validateApiKey_1.validateApiKey, validateIdParam_1.validateIdParam, cardOperationsController_1.createCard);
router.get("/cards/transactions/:id", validateIdParam_1.validateIdParam, cardOperationsController_1.listTransactions);
exports["default"] = router;
