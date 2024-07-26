"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerifyEmailToken = exports.generateResetPasswordToken = exports.generateAuthTokens = exports.verifyToken = exports.saveToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config/config"));
const token_1 = __importDefault(require("../models/token"));
const _ApiError_1 = __importDefault(require("../../errors/_ApiError"));
const _token_types_1 = __importDefault(require("../../contracts/_token.types"));
const _1 = require(".");
const generateToken = (userId, expires, type, secret = config_1.default.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.generateToken = generateToken;
const saveToken = (token_2, userId_1, expires_1, type_1, ...args_1) => __awaiter(void 0, [token_2, userId_1, expires_1, type_1, ...args_1], void 0, function* (token, userId, expires, type, blacklisted = false) {
    const tokenDoc = yield token_1.default.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
});
exports.saveToken = saveToken;
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    if (typeof payload.sub !== 'string') {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'bad user');
    }
    const tokenDoc = yield token_1.default.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
});
exports.verifyToken = verifyToken;
const generateAuthTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = (0, exports.generateToken)(user.id, accessTokenExpires, _token_types_1.default.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, 'days');
    const refreshToken = (0, exports.generateToken)(user.id, refreshTokenExpires, _token_types_1.default.REFRESH);
    yield (0, exports.saveToken)(refreshToken, user.id, refreshTokenExpires, _token_types_1.default.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
});
exports.generateAuthTokens = generateAuthTokens;
const generateResetPasswordToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _1.userService.getUserByEmail(email);
    if (!user) {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, '');
    }
    const expires = (0, moment_1.default)().add(config_1.default.jwt.resetPasswordExpirationMinutes, 'minutes');
    const resetPasswordToken = (0, exports.generateToken)(user.id, expires, _token_types_1.default.RESET_PASSWORD);
    yield (0, exports.saveToken)(resetPasswordToken, user.id, expires, _token_types_1.default.RESET_PASSWORD);
    return resetPasswordToken;
});
exports.generateResetPasswordToken = generateResetPasswordToken;
const generateVerifyEmailToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const expires = (0, moment_1.default)().add(config_1.default.jwt.verifyEmailExpirationMinutes, 'minutes');
    const verifyEmailToken = (0, exports.generateToken)(user.id, expires, _token_types_1.default.VERIFY_EMAIL);
    yield (0, exports.saveToken)(verifyEmailToken, user.id, expires, _token_types_1.default.VERIFY_EMAIL);
    return verifyEmailToken;
});
exports.generateVerifyEmailToken = generateVerifyEmailToken;
