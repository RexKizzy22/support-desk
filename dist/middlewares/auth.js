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
exports.secure = exports.generateToken = void 0;
const http_status_codes_1 = __importStar(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../dbModels/userModel"));
const { UNAUTHORIZED, NOT_FOUND } = http_status_codes_1.default;
const { error } = console;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};
exports.generateToken = generateToken;
const secure = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorized = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    if (!authorized) {
        return res.status(UNAUTHORIZED).json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
    }
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        let { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user = yield userModel_1.default.findOne({ _id: id })
            .select("-password")
            .lean()
            .exec();
        if (!user) {
            return res.status(NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }
        const currentUser = Object.assign(Object.assign({}, user), { id: user._id });
        req.user = currentUser;
        next();
    }
    catch (err) {
        error(err.message);
        return res.status(UNAUTHORIZED).json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
    }
});
exports.secure = secure;
