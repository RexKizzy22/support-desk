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
exports.createTicket = exports.updateTicket = exports.deleteTicket = exports.getTicket = exports.getTickets = void 0;
var ticketModel_1 = __importDefault(require("src/dbModels/ticketModel"));
var http_status_codes_1 = __importStar(require("http-status-codes"));
var jet_logger_1 = __importDefault(require("jet-logger"));
var OK = http_status_codes_1.default.OK, NOT_FOUND = http_status_codes_1.default.NOT_FOUND, BAD_REQUEST = http_status_codes_1.default.BAD_REQUEST, CREATED = http_status_codes_1.default.CREATED, UNAUTHORIZED = http_status_codes_1.default.UNAUTHORIZED;
/**
 *
 * @desc   Get all tickets
 * @access "private"
 * @route  GET /api/tickets
 */
var getTickets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ticketModel_1.default.find({ user: req.user.id })];
            case 1:
                tickets = _a.sent();
                return [2 /*return*/, res.status(OK).json(tickets)];
            case 2:
                error_1 = _a.sent();
                jet_logger_1.default.err(error_1.message);
                return [2 /*return*/, res.status(BAD_REQUEST).json({ payload: error_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTickets = getTickets;
/**
 *
 * @desc   Get a ticket
 * @access "private"
 * @route  GET /api/tickets/ticketId
 */
var getTicket = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ticketModel_1.default.findById({ _id: req.params.id })];
            case 1:
                ticket = _b.sent();
                if (!ticket) {
                    return [2 /*return*/, res.status(NOT_FOUND).json({ payload: http_status_codes_1.ReasonPhrases.NOT_FOUND })];
                }
                if (ticket.user.toString() !== ((_a = req.user.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                    return [2 /*return*/, res
                            .status(UNAUTHORIZED)
                            .json({ payload: http_status_codes_1.ReasonPhrases.UNAUTHORIZED })];
                }
                return [2 /*return*/, res.status(OK).json(ticket)];
            case 2:
                error_2 = _b.sent();
                jet_logger_1.default.err(error_2.message);
                return [2 /*return*/, res.status(BAD_REQUEST).json({ payload: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTicket = getTicket;
/**
 *
 * @desc   Delete a ticket
 * @access "private"
 * @route  DELETE /api/ticket/ticketId
 */
var deleteTicket = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.default.findById({ _id: req.params.id })];
            case 1:
                ticket = _b.sent();
                if (!ticket) {
                    return [2 /*return*/, res.status(NOT_FOUND).json({ payload: http_status_codes_1.ReasonPhrases.NOT_FOUND })];
                }
                if (ticket.user.toString() != ((_a = req.user.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                    return [2 /*return*/, res
                            .status(UNAUTHORIZED)
                            .json({ payload: http_status_codes_1.ReasonPhrases.UNAUTHORIZED })];
                }
                return [4 /*yield*/, ticketModel_1.default.deleteOne({ _id: ticket._id })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(OK).json({ payload: ticket._id })];
            case 3:
                error_3 = _b.sent();
                jet_logger_1.default.err(error_3.message);
                return [2 /*return*/, res.status(BAD_REQUEST).json({ payload: error_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteTicket = deleteTicket;
/**
 *
 * @desc   Update a ticket
 * @access "private"
 * @route  PUT /api/ticket/ticketId
 */
var updateTicket = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, updated, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.default.findById(req.params.id)];
            case 1:
                ticket = _b.sent();
                if (!ticket) {
                    return [2 /*return*/, res.status(NOT_FOUND).json({ payload: http_status_codes_1.ReasonPhrases.NOT_FOUND })];
                }
                if (ticket.user.toString() != ((_a = req.user.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                    return [2 /*return*/, res
                            .status(UNAUTHORIZED)
                            .json({ payload: http_status_codes_1.ReasonPhrases.UNAUTHORIZED })];
                }
                return [4 /*yield*/, ticketModel_1.default.findByIdAndUpdate({ _id: ticket._id }, req.body, { new: true })];
            case 2:
                updated = _b.sent();
                return [2 /*return*/, res.status(OK).json({ payload: updated })];
            case 3:
                error_4 = _b.sent();
                jet_logger_1.default.err(error_4.message);
                return [2 /*return*/, res.status(BAD_REQUEST).json({ payload: error_4.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTicket = updateTicket;
/**
 *
 * @desc   Create a ticket
 * @access "private"
 * @route  POST /api/tickets
 */
var createTicket = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, product, description, newTicket, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, product = _a.product, description = _a.description;
                if (!product || !description) {
                    return [2 /*return*/, res
                            .status(BAD_REQUEST)
                            .json({ payload: http_status_codes_1.ReasonPhrases.BAD_REQUEST })];
                }
                return [4 /*yield*/, ticketModel_1.default.create({
                        product: product,
                        description: description,
                        user: req.user.id,
                        status: "new",
                    })];
            case 1:
                newTicket = _b.sent();
                return [2 /*return*/, res.status(CREATED).json({ payload: newTicket.id })];
            case 2:
                error_5 = _b.sent();
                jet_logger_1.default.err(error_5.message);
                return [2 /*return*/, res.status(BAD_REQUEST).json({ payload: error_5.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTicket = createTicket;
