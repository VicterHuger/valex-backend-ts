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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.activateCard = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
require("dayjs/locale/pt-br");
var cryptr_1 = __importDefault(require("cryptr"));
var cardAuxiliarServices = __importStar(require("./cardAuxiliarServices"));
var errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
var cardRepository = __importStar(require("../repositories/cardRepository"));
function activateCard(securityCode, password, id) {
    return __awaiter(this, void 0, void 0, function () {
        var card, updatedCardProperties, rowCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardAuxiliarServices.verifyReturnExistingItem(id, cardRepository.findById, "NotFound", "There is no card with id ".concat(id))];
                case 1:
                    card = _a.sent();
                    if (cardAuxiliarServices.isCardExpired(card.expirationDate))
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("BadRequest", "This card is expired and can't be activated!");
                    if (!!card.password)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("BadRequest", "This card can't be activated because a password has been already signup");
                    if (!isCVCCorrect(securityCode, card.securityCode))
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("Unauthorized", "The CVC is uncorrect!");
                    if (!isPasswordLenghtCorrect(password))
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("UnprocessableEntity", "Password must contains four numbers!");
                    updatedCardProperties = {
                        password: encryptPassword(password)
                    };
                    return [4 /*yield*/, cardRepository.update(id, updatedCardProperties)];
                case 2:
                    rowCount = _a.sent();
                    if (rowCount === 0)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("InternalServerError", "Something went wrong and the card was not activated");
                    return [2 /*return*/];
            }
        });
    });
}
exports.activateCard = activateCard;
function isCVCCorrect(CVC, encryptedCVC) {
    var cryptr = new cryptr_1["default"](process.env.CRYPTR_KEY);
    var descryptrCVC = cryptr.decrypt(encryptedCVC);
    return CVC === descryptrCVC;
}
function isPasswordLenghtCorrect(password) {
    var regexExpression = /^\d{4}$/;
    return regexExpression.test(password);
}
function encryptPassword(password) {
    var encryptedPassword = bcrypt_1["default"].hashSync(password, 10);
    return encryptedPassword;
}
