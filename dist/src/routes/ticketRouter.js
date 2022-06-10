"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("src/middlewares/auth");
var ticketController_1 = require("../controllers/ticketController");
var noteRouter_1 = __importDefault(require("./noteRouter"));
var router = express_1.default.Router();
// Re-route to noteRouter
router.use("/:ticketId/notes", noteRouter_1.default);
router.route("/").get(auth_1.secure, ticketController_1.getTickets).post(auth_1.secure, ticketController_1.createTicket);
router.route("/:id")
    .get(auth_1.secure, ticketController_1.getTicket)
    .put(auth_1.secure, ticketController_1.updateTicket)
    .delete(auth_1.secure, ticketController_1.deleteTicket);
exports.default = router;
