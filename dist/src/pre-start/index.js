"use strict";
/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var command_line_args_1 = __importDefault(require("command-line-args"));
(function () {
    // Setup command line options
    var options = (0, command_line_args_1.default)([
        {
            name: "env",
            alias: "e",
            defaultValue: "development",
            type: String,
        },
    ]);
    // Set the env file
    var result2 = dotenv_1.default.config({
        path: path_1.default.join(__dirname, "env/".concat(options.env, ".env")),
    });
    if (result2.error) {
        throw result2.error;
    }
})();
