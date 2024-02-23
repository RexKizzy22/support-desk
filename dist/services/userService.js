"use strict";
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
const errors_1 = require("../shared/errors"); //"@shared/errors";
const userModel_1 = __importDefault(require("../dbModels/userModel"));
const auth_1 = require("../middlewares/auth");
const { error } = console;
/**
 * Get all users.
 *
 * @returns
 */
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find();
});
/**
 * Get one users.
 *
 * @returns
 */
const getOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newUser = yield userModel_1.default.findOne(user).lean().exec();
        if (!newUser) {
            throw new errors_1.UserNotFoundError();
        }
        const data = {
            id: newUser._id,
            name: newUser.name,
            token: (0, auth_1.generateToken)((_a = newUser._id) === null || _a === void 0 ? void 0 : _a.toString()),
            email: newUser.email,
            password: newUser.password,
        };
        return data;
    }
    catch (err) {
        error(err.message);
        throw new Error("Error: finding user");
    }
});
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
const addOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userExists = yield userModel_1.default.exists({ email: user.email });
        if (userExists) {
            throw new Error("User already exists");
        }
        const newUser = yield userModel_1.default.create(user);
        return {
            id: newUser._id,
            token: (0, auth_1.generateToken)((_b = newUser._id) === null || _b === void 0 ? void 0 : _b.toString()),
            email: newUser.email,
            password: newUser.password,
        };
    }
    catch (err) {
        error(err.message);
        throw new Error(err.message);
    }
});
// Export default
exports.default = {
    getAll,
    getOne,
    addOne,
};
