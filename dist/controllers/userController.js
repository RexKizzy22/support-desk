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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOne = exports.getAll = exports.login = exports.register = void 0;
const http_status_codes_1 = __importStar(require("http-status-codes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import asyncHandler from "express-async-handler";
const userService_1 = __importDefault(require("../services/userService")); // "@services/userService"
const errors_1 = require("../shared/errors"); // "@shared/errors";
// import { generateToken } from "src/middlewares/auth";
const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN } = http_status_codes_1.default;
const { error } = console;
/**
 *
 * @desc   register new user
 * @access "public"
 * @route  /users/register
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new errors_1.ParamMissingError();
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield userService_1.default.addOne({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(OK).json(newUser);
    }
    catch (err) {
        error(err.message);
        res.status(FORBIDDEN).json(http_status_codes_1.ReasonPhrases.FORBIDDEN);
    }
});
exports.register = register;
/**
 *
 * @desc   login registered user
 * @access "public"
 * @route  /users/login
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new errors_1.ParamMissingError();
        }
        const newUser = yield userService_1.default.getOne({
            email
        });
        const matched = yield bcrypt_1.default.compare(password, newUser.password);
        if (matched) {
            return res.status(OK).json(newUser);
        }
        else {
            return res
                .status(UNAUTHORIZED)
                .json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
    }
    catch (err) {
        error(err.message);
        res.status(BAD_REQUEST).json(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    }
});
exports.login = login;
/**
 *
 * @desc   Get all users
 * @access "private"
 * @route  /api/users
 */
const getAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService_1.default.getAll();
    return res.status(OK).json({ users });
});
exports.getAll = getAll;
const addOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    yield userService_1.default.addOne(user);
    return res.status(CREATED).end();
});
exports.addOne = addOne;
