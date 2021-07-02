"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout_get = exports.login_post = exports.signup_post = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleErrors = (err) => {
    let error = { email: "", password: "" };
    //incorrect email
    if (err.message === "incorrect email") {
        error.email = err.message;
    }
    if (err.message === "incorrect password") {
        error.password = err.message;
    }
    //validation error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }
    //duplication error
    if (err.code === 11000) {
        error.email = "Email already exists";
    }
    return error;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, config_1.default.jwtSecret, { expiresIn: maxAge });
};
const signup_post = async (req, res) => {
    try {
        const user = await userModel_1.default.create({
            email: req.body.email,
            password: req.body.password,
        });
        //token & cookie creation
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
        res.status(201).json({ msg: "signed up", error: false, user: user._id });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(404).json({ msg: error, error: true });
    }
};
exports.signup_post = signup_post;
const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        // const user = await userModel.login(req.body.email,req.body.password);
        const user = await userModel_1.default.findOne({ email: email });
        if (user) {
            const auth = await bcrypt_1.default.compare(password, user.password);
            if (auth) {
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
                res.status(200).json({ msg: "logged in", error: false, user: user._id });
            }
            else
                throw Error("incorrect password");
        }
        else
            throw Error("incorrect email");
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(404).json({ msg: error, error: true });
    }
};
exports.login_post = login_post;
const logout_get = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({ msg: 'logged out', error: false });
};
exports.logout_get = logout_get;
//# sourceMappingURL=authController.js.map