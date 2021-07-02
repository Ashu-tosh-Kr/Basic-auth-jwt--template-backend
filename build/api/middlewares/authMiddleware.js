"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.reqAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const userModel_1 = __importDefault(require("../models/userModel"));
const reqAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(522).json({ msg: 'invalid token', error: true });
            }
            else {
                next();
            }
        });
    }
    else {
        res.status(522).json({ msg: 'not logged in', error: true });
    }
};
exports.reqAuth = reqAuth;
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, async (error, decodedToken) => {
            if (error) {
                res.status(404).json({ msg: 'not logged in', data: null, error: true });
                next();
            }
            else {
                const user = await userModel_1.default.findById(decodedToken.id);
                res.status(200).json({ msg: "logged in", data: user, error: false });
                next();
            }
        });
    }
    else {
        res.status(404).json({ msg: 'not logged in', data: null, error: true });
    }
};
exports.checkUser = checkUser;
//# sourceMappingURL=authMiddleware.js.map