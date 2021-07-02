"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRouter = express_1.Router();
authRouter.post('/signup', authController_1.signup_post).post('/login', authController_1.login_post).get('/logout', authController_1.logout_get);
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map