"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
//import database from './database';
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = require("mongoose");
exports.default = async ({ expressApp }) => {
    await mongoose_1.connect(config_1.default.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true, ignoreUndefined: true });
    //await database();
    logger_1.default.info(`✌️ Connection to database successful`);
    await express_1.default({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
    logger_1.default.info('✅ All modules loaded!');
};
//# sourceMappingURL=index.js.map