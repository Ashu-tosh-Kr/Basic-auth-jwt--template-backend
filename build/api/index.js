"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
exports.default = () => {
    const app = express_1.Router();
    //routes
    app.use(authRoutes_1.default);
    //cookies
    app.get('/set-cookies', (req, res) => { });
    app.get('/read-cookies', (req, res) => { });
    return app;
};
//# sourceMappingURL=index.js.map