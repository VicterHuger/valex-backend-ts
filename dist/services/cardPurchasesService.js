"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createPurchase = void 0;
var businessRepository = __importStar(require("../repositories/businessRepository"));
var cardRespository = __importStar(require("../repositories/cardRepository"));
var cardAuxiliarServices = __importStar(require("./cardAuxiliarServices"));
var paymentRepository = __importStar(require("../repositories/paymentRepository"));
var cardOperationService_1 = require("./cardOperationService");
var errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
function createPurchase(cardId, businessId, amount, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card, business, transactions, rowCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardAuxiliarServices.verifyReturnExistingItem(cardId, cardRespository.findById, "NotFound", "There is no card with id ".concat(cardId))];
                case 1:
                    card = _a.sent();
                    cardAuxiliarServices.verifyCardActivated(password);
                    if (cardAuxiliarServices.isCardExpired(card.expirationDate))
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("BadRequest", "This card is expired and can't proceed the purchase!");
                    if (card.isBlocked)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("BadRequest", "This card can't proceed a purchase because it is blocked!");
                    if (!cardAuxiliarServices.isPasswordCorrect(card.password, password))
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("Unauthorized", "The password is incorrect!");
                    return [4 /*yield*/, businessRepository.findById(businessId)];
                case 2:
                    business = _a.sent();
                    if (!business)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("NotFound", "There is no business signUp with this id");
                    if (business.type !== card.type)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("BadRequest", "The card type doesn't match with the business type");
                    return [4 /*yield*/, (0, cardOperationService_1.listTransactions)(cardId)];
                case 3:
                    transactions = _a.sent();
                    if (transactions.balance < amount)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("Unauthorized", "Purchase was not allowed, amount is lower than the card balance");
                    return [4 /*yield*/, paymentRepository.insert({ cardId: cardId, businessId: businessId, amount: amount })];
                case 4:
                    rowCount = _a.sent();
                    if (rowCount === 0)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("InternalServerError", "Something went wrong, it was not possible to register the purchase");
                    return [2 /*return*/];
            }
        });
    });
}
exports.createPurchase = createPurchase;
