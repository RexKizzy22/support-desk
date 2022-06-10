"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
var api_1 = __importDefault(require("./routes/api"));
var jet_logger_1 = __importDefault(require("jet-logger"));
var errors_1 = require("@shared/errors");
// Constants
var app = (0, express_1.default)();
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
app.use(function (err, _, res, __) {
    jet_logger_1.default.err(err, true);
    var status = err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST;
    return res.status(status).json({
        error: err.message,
    });
});
/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/
// Set views dir
var viewsDir = path_1.default.join(__dirname, "views");
app.set("views", viewsDir);
// Set static dir
var staticDir;
if (process.env.NODE_ENV === "production") {
    // Set build folder as static
    staticDir = path_1.default.join(__dirname, "../client/build");
    app.use(express_1.default.static(staticDir));
    app.get("*", function (_, res) {
        res.sendFile(__dirname, "../client/build/src/index.html");
    });
}
else {
    staticDir = path_1.default.join(__dirname, "public");
    app.use(express_1.default.static(staticDir));
}
// Serve index.html file
app.get("/", function (_, res) {
    res.send("<h1>Welcome to Support Desk API</h1>");
});
// Export here and start in a diff file (for testing).
exports.default = app;