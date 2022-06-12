"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const ticketRouter_1 = __importDefault(require("./ticketRouter"));
// import noteRouter from "./noteRouter";
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use("/users", userRouter_1.default);
baseRouter.use("/tickets", ticketRouter_1.default);
exports.default = baseRouter;
