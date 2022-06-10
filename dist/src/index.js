"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start"); // Must be the first import
var jet_logger_1 = __importDefault(require("jet-logger"));
var server_1 = __importDefault(require("./server"));
var db_1 = __importDefault(require("./config/db"));
// Constants
var serverStartMsg = "Express server started on port: ", port = process.env.PORT || 4000;
// Database Connection
(0, db_1.default)()
    .then(function () {
    // Start server
    server_1.default.listen(port, function () {
        jet_logger_1.default.info(serverStartMsg + port);
    });
})
    .catch(function () { return jet_logger_1.default.err("Unable to connect to database"); });
