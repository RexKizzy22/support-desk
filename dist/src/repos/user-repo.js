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
var functions_1 = require("@shared/functions");
var mock_orm_1 = __importDefault(require("./mock-orm"));
/**
 * Get one user.
 *
 * @param email
 * @returns
 */
function getOne(email) {
    return __awaiter(this, void 0, void 0, function () {
        var db, _i, _a, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mock_orm_1.default.openDb()];
                case 1:
                    db = _b.sent();
                    for (_i = 0, _a = db.users; _i < _a.length; _i++) {
                        user = _a[_i];
                        if (user.email === email) {
                            return [2 /*return*/, user];
                        }
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
/**
 * See if a user with the given id exists.
 *
 * @param id
 */
function persists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, _i, _a, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mock_orm_1.default.openDb()];
                case 1:
                    db = _b.sent();
                    for (_i = 0, _a = db.users; _i < _a.length; _i++) {
                        user = _a[_i];
                        if (user.id === id) {
                            return [2 /*return*/, true];
                        }
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mock_orm_1.default.openDb()];
                case 1:
                    db = _a.sent();
                    return [2 /*return*/, db.users];
            }
        });
    });
}
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function add(user) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mock_orm_1.default.openDb()];
                case 1:
                    db = _a.sent();
                    user.id = (0, functions_1.getRandomInt)();
                    db.users.push(user);
                    return [2 /*return*/, mock_orm_1.default.saveDb(db)];
            }
        });
    });
}
/**
 * Update a user.
 *
 * @param user
 * @returns
 */
function update(user) {
    return __awaiter(this, void 0, void 0, function () {
        var db, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mock_orm_1.default.openDb()];
                case 1:
                    db = _a.sent();
                    for (i = 0; i < db.users.length; i++) {
                        if (db.users[i].id === user.id) {
                            db.users[i] = user;
                            return [2 /*return*/, mock_orm_1.default.saveDb(db)];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Delete one user.
 *
 * @param id
 * @returns
 */
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mock_orm_1.default.openDb()];
                case 1:
                    db = _a.sent();
                    for (i = 0; i < db.users.length; i++) {
                        if (db.users[i].id === id) {
                            db.users.splice(i, 1);
                            return [2 /*return*/, mock_orm_1.default.saveDb(db)];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Export default
exports.default = {
    getOne: getOne,
    persists: persists,
    getAll: getAll,
    add: add,
    update: update,
    delete: deleteOne,
};