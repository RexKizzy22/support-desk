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
exports.createTicket = exports.updateTicket = exports.deleteTicket = exports.getTicket = exports.getTickets = void 0;
const ticketModel_1 = __importDefault(require("../dbModels/ticketModel"));
const http_status_codes_1 = __importStar(require("http-status-codes"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const { OK, NOT_FOUND, BAD_REQUEST, CREATED, UNAUTHORIZED } = http_status_codes_1.default;
/**
 *
 * @desc   Get all tickets
 * @access "private"
 * @route  GET /api/tickets
 */
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticketModel_1.default.find({ user: req.user.id });
        return res.status(OK).json(tickets);
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json({ payload: error.message });
    }
});
exports.getTickets = getTickets;
/**
 *
 * @desc   Get a ticket
 * @access "private"
 * @route  GET /api/tickets/ticketId
 */
const getTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ticket = yield ticketModel_1.default.findById({ _id: req.params.id });
        if (!ticket) {
            return res.status(NOT_FOUND).json({ payload: http_status_codes_1.ReasonPhrases.NOT_FOUND });
        }
        if (ticket.user.toString() !== ((_a = req.user.id) === null || _a === void 0 ? void 0 : _a.toString())) {
            return res
                .status(UNAUTHORIZED)
                .json({ payload: http_status_codes_1.ReasonPhrases.UNAUTHORIZED });
        }
        return res.status(OK).json(ticket);
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json({ payload: error.message });
    }
});
exports.getTicket = getTicket;
/**
 *
 * @desc   Delete a ticket
 * @access "private"
 * @route  DELETE /api/ticket/ticketId
 */
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const ticket = yield ticketModel_1.default.findById({ _id: req.params.id });
        if (!ticket) {
            return res.status(NOT_FOUND).json({ payload: http_status_codes_1.ReasonPhrases.NOT_FOUND });
        }
        if (ticket.user.toString() != ((_b = req.user.id) === null || _b === void 0 ? void 0 : _b.toString())) {
            return res
                .status(UNAUTHORIZED)
                .json({ payload: http_status_codes_1.ReasonPhrases.UNAUTHORIZED });
        }
        yield ticketModel_1.default.deleteOne({ _id: ticket._id });
        return res.status(OK).json({ payload: ticket._id });
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json({ payload: error.message });
    }
});
exports.deleteTicket = deleteTicket;
/**
 *
 * @desc   Update a ticket
 * @access "private"
 * @route  PUT /api/ticket/ticketId
 */
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const ticket = yield ticketModel_1.default.findById(req.params.id);
        if (!ticket) {
            return res.status(NOT_FOUND).json({ payload: http_status_codes_1.ReasonPhrases.NOT_FOUND });
        }
        if (ticket.user.toString() != ((_c = req.user.id) === null || _c === void 0 ? void 0 : _c.toString())) {
            return res
                .status(UNAUTHORIZED)
                .json({ payload: http_status_codes_1.ReasonPhrases.UNAUTHORIZED });
        }
        const updated = yield ticketModel_1.default.findByIdAndUpdate({ _id: ticket._id }, req.body, { new: true });
        return res.status(OK).json({ payload: updated });
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json({ payload: error.message });
    }
});
exports.updateTicket = updateTicket;
/**
 *
 * @desc   Create a ticket
 * @access "private"
 * @route  POST /api/tickets
 */
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, description } = req.body;
        if (!product || !description) {
            return res
                .status(BAD_REQUEST)
                .json({ payload: http_status_codes_1.ReasonPhrases.BAD_REQUEST });
        }
        const newTicket = yield ticketModel_1.default.create({
            product,
            description,
            user: req.user.id,
            status: "new",
        });
        return res.status(CREATED).json({ payload: newTicket.id });
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json({ payload: error.message });
    }
});
exports.createTicket = createTicket;
