"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var cardRoutes_1 = __importDefault(require("./cardRoutes"));
var cardActivationRoutes_1 = __importDefault(require("./cardActivationRoutes"));
var cardBlockRoutes_1 = __importDefault(require("./cardBlockRoutes"));
var cardRechargeRoutes_1 = __importDefault(require("./cardRechargeRoutes"));
var cardPurchaseRoutes_1 = __importDefault(require("./cardPurchaseRoutes"));
var router = (0, express_1.Router)();
router.use([cardRoutes_1["default"], cardActivationRoutes_1["default"], cardBlockRoutes_1["default"], cardRechargeRoutes_1["default"], cardPurchaseRoutes_1["default"]]);
exports["default"] = router;
