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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOne = exports.getAll = exports.login = exports.register = void 0;
var http_status_codes_1 = __importStar(require("http-status-codes"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// import asyncHandler from "express-async-handler";
var userService_1 = __importDefault(require("@services/userService"));
var errors_1 = require("@shared/errors");
// import { generateToken } from "src/middlewares/auth";
var CREATED = http_status_codes_1.default.CREATED, OK = http_status_codes_1.default.OK, BAD_REQUEST = http_status_codes_1.default.BAD_REQUEST, UNAUTHORIZED = http_status_codes_1.default.UNAUTHORIZED, FORBIDDEN = http_status_codes_1.default.FORBIDDEN;
var error = console.error;
/**
 *
 * @desc   register new user
 * @access "public"
 * @route  /users/register
 */
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, salt, hashedPassword, newUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                if (!name_1 || !email || !password) {
                    throw new errors_1.ParamMissingError();
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, userService_1.default.addOne({
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                newUser = _b.sent();
                return [2 /*return*/, res.status(OK).json(newUser)];
            case 4:
                err_1 = _b.sent();
                error(err_1.message);
                res.status(FORBIDDEN).json(http_status_codes_1.ReasonPhrases.FORBIDDEN);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
/**
 *
 * @desc   login registered user
 * @access "public"
 * @route  /users/login
 */
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, newUser, matched, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!email || !password) {
                    throw new errors_1.ParamMissingError();
                }
                return [4 /*yield*/, userService_1.default.getOne({
                        email: email
                    })];
            case 2:
                newUser = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.compare(password, newUser.password)];
            case 3:
                matched = _b.sent();
                if (matched) {
                    return [2 /*return*/, res.status(OK).json(newUser)];
                }
                else {
                    return [2 /*return*/, res
                            .status(UNAUTHORIZED)
                            .json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED)];
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                error(err_2.message);
                res.status(BAD_REQUEST).json(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
/**
 *
 * @desc   Get all users
 * @access "private"
 * @route  /api/users
 */
var getAll = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userService_1.default.getAll()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(OK).json({ users: users })];
        }
    });
}); };
exports.getAll = getAll;
var addOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body.user;
                // Check param
                if (!user) {
                    throw new errors_1.ParamMissingError();
                }
                // Fetch data
                return [4 /*yield*/, userService_1.default.addOne(user)];
            case 1:
                // Fetch data
                _a.sent();
                return [2 /*return*/, res.status(CREATED).end()];
        }
    });
}); };
exports.addOne = addOne;
