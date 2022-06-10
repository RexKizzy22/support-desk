"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
var ticketSchema = new mongoose_2.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Please add a user ID"],
        ref: "User"
    },
    product: {
        type: String,
        required: [true, "Please add a product"],
        enum: ["iPhone", "Macbook Pro", "iMac", "iPad"]
    },
    description: {
        type: String,
        required: [true, "Please add a description of the issue"],
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new",
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_2.model)("Ticket", ticketSchema);
