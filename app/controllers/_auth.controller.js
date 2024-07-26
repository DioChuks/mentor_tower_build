"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyEmail = exports.sendVerificationEmail = exports.resetPassword = exports.forgotPassword = exports.refreshTokens = exports.logout = exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const _catchAsync_1 = __importDefault(require("../utils/_catchAsync"));
const services_1 = require("../services");
const authService = __importStar(require("../services/_auth.service"));
exports.register = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield services_1.userService.registerUser(req.body);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    res.status(http_status_codes_1.StatusCodes.CREATED).send({ user, tokens });
}));
exports.login = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield authService.loginUserWithEmailAndPassword(email, password);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
}));
exports.logout = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.logout(req.body.refreshToken);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
}));
exports.refreshTokens = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithTokens = yield authService.refreshAuth(req.body.refreshToken);
    res.send(Object.assign({}, userWithTokens));
}));
exports.forgotPassword = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resetPasswordToken = yield services_1.tokenService.generateResetPasswordToken(req.body.email);
    yield services_1.emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
}));
exports.resetPassword = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.resetPassword(req.query['token'], req.body.password);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
}));
exports.sendVerificationEmail = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyEmailToken = yield services_1.tokenService.generateVerifyEmailToken(req.body);
    yield services_1.emailService.sendVerificationEmail(req.body.email, verifyEmailToken, req.body.name);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
}));
exports.verifyEmail = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.verifyEmail(req.query['token']);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
}));
