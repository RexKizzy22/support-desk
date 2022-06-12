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
exports.addNote = exports.getNotes = void 0;
const ticketModel_1 = __importDefault(require("../dbModels/ticketModel"));
const notesModel_1 = __importDefault(require("../dbModels/notesModel"));
const http_status_codes_1 = __importStar(require("http-status-codes"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const { OK, BAD_REQUEST, UNAUTHORIZED } = http_status_codes_1.default;
/**
 *
 * @desc   Get all notes for a ticket
 * @access Private
 * @route  GET /api/tickets/:ticketId/notes
 */
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ticket = yield ticketModel_1.default.findById(req.params.ticketId);
        if (ticket.user.toString() !== ((_a = req.user.id) === null || _a === void 0 ? void 0 : _a.toString())) {
            return res.status(UNAUTHORIZED).json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        const notes = yield notesModel_1.default.find({ ticket: req.params.ticketId });
        return res.status(OK).json(notes);
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json(error.message);
    }
});
exports.getNotes = getNotes;
/**
 *
 * @desc   Create ticket note
 * @access Private
 * @route  POST /api/tickets/:ticketId/notes
 */
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const ticket = yield ticketModel_1.default.findById(req.params.ticketId);
        if (ticket.user.toString() !== ((_b = req.user.id) === null || _b === void 0 ? void 0 : _b.toString())) {
            return res.status(UNAUTHORIZED).json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        const note = yield notesModel_1.default.create({
            ticket: req.params.ticketId,
            user: req.user.id,
            isStaff: false,
            text: req.body.text,
        });
        return res.status(OK).json(note);
    }
    catch (error) {
        jet_logger_1.default.err(error.message);
        return res.status(BAD_REQUEST).json(error.message);
    }
});
exports.addNote = addNote;
