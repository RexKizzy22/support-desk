"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
// Constants
const router = (0, express_1.Router)();
// Paths
exports.p = {
    register: "/register",
    login: "/login",
    get: "/all"
};
router.post(exports.p.register, userController_1.register);
router.post(exports.p.login, userController_1.login);
router.get(exports.p.get, userController_1.getAll);
exports.default = router;
