"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.connection = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = __importDefault(require("pg"));
dotenv_1["default"].config();
var Pool = pg_1["default"].Pool;
exports.connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
