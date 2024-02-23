"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const noteController_1 = require("../controllers/noteController");
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(auth_1.secure, noteController_1.getNotes).post(auth_1.secure, noteController_1.addNote);
exports.default = router;
