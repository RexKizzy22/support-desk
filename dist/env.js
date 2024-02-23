"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.JET_LOGGER_MODE = exports.JET_LOGGER_FORMAT = exports.JET_LOGGER_TIMESTAMP = exports.JET_LOGGER_FILEPATH = exports.JWT_SECRET = exports.MONGO_URI = void 0;
require("dotenv/config");
exports.MONGO_URI = process.env.MONGO_URI, exports.JWT_SECRET = process.env.JWT_SECRET, exports.JET_LOGGER_FILEPATH = process.env.JET_LOGGER_FILEPATH, exports.JET_LOGGER_TIMESTAMP = process.env.JET_LOGGER_TIMESTAMP, exports.JET_LOGGER_FORMAT = process.env.JET_LOGGER_FORMAT, exports.JET_LOGGER_MODE = process.env.NODE_ENV === "production"
    ? process.env.JET_LOGGER_MODE_PROD
    : process.env.JET_LOGGER_MODE_LOCAL, exports.NODE_ENV = process.env.NODE_ENV || "development";
