"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.listTransactions = exports.createCard = void 0;
var cryptr_1 = __importDefault(require("cryptr"));
var dayjs_1 = __importDefault(require("dayjs"));
var faker_1 = require("@faker-js/faker");
var cardRepository = __importStar(require("../repositories/cardRepository"));
var companyRepository = __importStar(require("../repositories/companyRepository"));
var employeeRepository = __importStar(require("../repositories/employeeRepository"));
var rechargeRepository = __importStar(require("../repositories/rechargeRepository"));
var paymentRepository = __importStar(require("../repositories/paymentRepository"));
var errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
var cardAuxiliarServices = __importStar(require("./cardAuxiliarServices"));
function createCard(body, employeeId, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, cardEmployee, CVC, encryptedCVC, newCard, cardInsertedId, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardAuxiliarServices.verifyReturnExistingItem(headers, companyRepository.findByApiKey, "Unauthorized", "There is no company with this API-key")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cardAuxiliarServices.verifyReturnExistingItem(employeeId, employeeRepository.findById, "NotFound", "There is no employee with this id")];
                case 2:
                    employee = _a.sent();
                    return [4 /*yield*/, cardRepository.findByTypeAndEmployeeId(body.type, employeeId)];
                case 3:
                    cardEmployee = _a.sent();
                    if (cardEmployee) {
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("Conflict", "The employee ".concat(employee.fullName, " has already an card of ").concat(body.type, " type!"));
                    }
                    CVC = createCVC();
                    encryptedCVC = encryptCVC(CVC);
                    newCard = generateNewCard(employeeId, employee.fullName, body.type, encryptedCVC);
                    return [4 /*yield*/, cardRepository.insert(newCard)];
                case 4:
                    cardInsertedId = _a.sent();
                    if (!cardInsertedId)
                        (0, errorHandlerMiddleware_1.generateThrowErrorMessages)("InternalServerError", "It was not possible to insert a new card");
                    newCard.securityCode = CVC;
                    card = __assign(__assign({}, newCard), { id: cardInsertedId });
                    return [2 /*return*/, card];
            }
        });
    });
}
exports.createCard = createCard;
function listTransactions(id) {
    return __awaiter(this, void 0, void 0, function () {
        var card, recharges, transactions, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardAuxiliarServices.verifyReturnExistingItem(id, cardRepository.findById, "NotFound", "There is no card with id ".concat(id))];
                case 1:
                    card = _a.sent();
                    return [4 /*yield*/, rechargeRepository.findByCardId(id)];
                case 2:
                    recharges = _a.sent();
                    return [4 /*yield*/, paymentRepository.findByCardId(id)];
                case 3:
                    transactions = _a.sent();
                    balance = generateBalance(id, recharges, transactions);
                    return [2 /*return*/, {
                            balance: balance,
                            transactions: transactions,
                            recharges: recharges
                        }];
            }
        });
    });
}
exports.listTransactions = listTransactions;
function createCardName(string) {
    var newString = string.toUpperCase();
    var names = newString.split(" ");
    var arrayNewNames = [names[0]];
    for (var i = 1; i < names.length - 1; i++) {
        if (names[i].length >= 3)
            arrayNewNames.push(names[i][0]);
    }
    arrayNewNames.push(names[names.length - 1]);
    return arrayNewNames.join(" ");
}
function createCardNumber() {
    return faker_1.faker.random.numeric(16, { allowLeadingZeros: true });
}
function createCardExpirationDate() {
    return (0, dayjs_1["default"])().add(5, "y").format("MM/YY");
}
function createCVC() {
    var CVC = faker_1.faker.random.numeric(3, { allowLeadingZeros: true });
    return CVC;
}
function encryptCVC(cvc) {
    var cryptr = new cryptr_1["default"](process.env.CRYPTR_KEY);
    return cryptr.encrypt(cvc);
}
function generateNewCard(employeeId, fullName, type, encryptedCVC) {
    var card = {
        employeeId: employeeId,
        type: type,
        number: createCardNumber(),
        cardholderName: createCardName(fullName),
        expirationDate: createCardExpirationDate(),
        securityCode: encryptedCVC,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true
    };
    return card;
}
function generateBalance(id, recharges, transactions) {
    var receipts = recharges.reduce(function (prev, curr) {
        return prev + curr.amount;
    }, 0);
    var costs = transactions.reduce(function (prev, curr) {
        return prev + curr.amount;
    }, 0);
    return receipts - costs;
}
// function formatExtractTransactions(balance:number, costs:paymentRepository.PaymentWithBusinessName[], receipts:rechargeRepository.Recharge[]){
//     const transactions = costs.map(item=>{}
