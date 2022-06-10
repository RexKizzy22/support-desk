"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("src/middlewares/auth");
var noteController_1 = require("../controllers/noteController");
var router = express_1.default.Router({ mergeParams: true });
router.route("/").get(auth_1.secure, noteController_1.getNotes).post(auth_1.secure, noteController_1.addNote);
exports.default = router;
