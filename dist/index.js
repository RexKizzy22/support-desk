"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import "./pre-start"; // Must be the first import
const jet_logger_1 = __importDefault(require("jet-logger"));
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./config/db"));
// Constants
const serverStartMsg = "Express server started on port: ", port = process.env.PORT || 4000;
// Database Connection
(0, db_1.default)()
    .then(() => {
    // Start server
    server_1.default.listen(port, () => {
        jet_logger_1.default.info(serverStartMsg + port);
    });
})
    .catch(() => jet_logger_1.default.err("Unable to connect to database"));
