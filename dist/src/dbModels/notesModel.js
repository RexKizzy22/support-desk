"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
var noteSchema = new mongoose_2.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Please add a user ID"],
        ref: "User",
    },
    ticket: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Please add a ticket ID"],
        ref: "Ticket",
    },
    text: {
        type: String,
        required: [true, "Please add a text"],
    },
    isStaff: {
        type: Boolean,
        default: false,
    },
    staffId: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_2.model)("Note", noteSchema);
