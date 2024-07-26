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
exports.verifyEmail = exports.resetPassword = exports.refreshAuth = exports.logout = exports.loginUserWithEmailAndPassword = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const token_1 = __importDefault(require("../models/token"));
const _ApiError_1 = __importDefault(require("../../errors/_ApiError"));
const _token_types_1 = __importDefault(require("../../contracts/_token.types"));
const _user_service_1 = require("./_user.service");
const _token_service_1 = require("./_token.service");
const loginUserWithEmailAndPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, _user_service_1.getUserByEmail)(email);
    if (!user || !(yield user.isPasswordMatch(password))) {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
});
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenDoc = yield token_1.default.findOne({ token: refreshToken, type: _token_types_1.default.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not found');
    }
    yield refreshTokenDoc.deleteOne();
});
exports.logout = logout;
const refreshAuth = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenDoc = yield (0, _token_service_1.verifyToken)(refreshToken, _token_types_1.default.REFRESH);
        const user = yield (0, _user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(refreshTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        yield refreshTokenDoc.deleteOne();
        const tokens = yield (0, _token_service_1.generateAuthTokens)(user);
        return { user, tokens };
    }
    catch (error) {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Please authenticate');
    }
});
exports.refreshAuth = refreshAuth;
const resetPassword = (resetPasswordToken, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetPasswordTokenDoc = yield (0, _token_service_1.verifyToken)(resetPasswordToken, _token_types_1.default.RESET_PASSWORD);
        const user = yield (0, _user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(resetPasswordTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        yield (0, _user_service_1.updateUserById)(user.id, { password: newPassword });
        yield token_1.default.deleteMany({ user: user.id, type: _token_types_1.default.RESET_PASSWORD });
    }
    catch (error) {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Password reset failed');
    }
});
exports.resetPassword = resetPassword;
const verifyEmail = (verifyEmailToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyEmailTokenDoc = yield (0, _token_service_1.verifyToken)(verifyEmailToken, _token_types_1.default.VERIFY_EMAIL);
        const user = yield (0, _user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(verifyEmailTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        yield token_1.default.deleteMany({ user: user.id, type: _token_types_1.default.VERIFY_EMAIL });
        const updatedUser = yield (0, _user_service_1.updateUserById)(user.id, { isEmailVerified: true });
        return updatedUser;
    }
    catch (error) {
        throw new _ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Email verification failed');
    }
});
exports.verifyEmail = verifyEmail;
