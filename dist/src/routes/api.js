"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRouter_1 = __importDefault(require("./userRouter"));
var ticketRouter_1 = __importDefault(require("./ticketRouter"));
// import noteRouter from "./noteRouter";
// Export the base-router
var baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use("/users", userRouter_1.default);
baseRouter.use("/tickets", ticketRouter_1.default);
exports.default = baseRouter;
