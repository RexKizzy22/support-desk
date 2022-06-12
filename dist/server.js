"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const api_1 = __importDefault(require("./routes/api"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const errors_1 = require("./shared/errors"); // "@shared/errors";
// Constants
const app = (0, express_1.default)();
/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
// Common middlewares
// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
    app.use((0, helmet_1.default)());
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/
// Add api router
app.use("/api", api_1.default);
// Error handling
app.use((err, _, res, __) => {
    jet_logger_1.default.err(err, true);
    const status = err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST;
    return res.status(status).json({
        error: err.message,
    });
});
/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/
// Set views dir
const viewsDir = path_1.default.join(__dirname, "views");
app.set("views", viewsDir);
// Set static dir
let staticDir;
// let dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    // Set build folder as static
    staticDir = path_1.default.join(__dirname, "../client/dist");
    app.use(express_1.default.static(staticDir));
    // Serve index.html file
    app.get("*", (_, res) => {
        res.sendFile(__dirname, "../client/index.html");
    });
}
else {
    staticDir = path_1.default.join(__dirname, "public");
    app.use(express_1.default.static(staticDir));
    // Serve index.html file
    app.get("*", (_, res) => {
        res.send("<h1>Welcome to Support Desk API</h1>");
    });
}
// Export here and start in a diff file (for testing).
exports.default = app;
