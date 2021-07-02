"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = require("validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator_1.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password is too short'],
    }
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt_1.default.genSalt();
    this.password = await bcrypt_1.default.hash(this.password, salt);
    next();
});
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt_1.default.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Inorrect password");
    }
    throw Error("Incorrrect Email");
};
exports.default = mongoose_1.model('user', userSchema);
//# sourceMappingURL=userModel.js.map