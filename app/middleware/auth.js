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
exports.GateRoute = exports.IsAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = require("http-status-codes");
const _ApiError_1 = __importDefault(require("../../errors/_ApiError"));
const _role_1 = require("../../contracts/_role");
const _jwt_1 = require("../utils/_jwt");
const _headers_1 = require("../utils/_headers");
const IsAuth = (...requiredRights) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new Promise((resolve, reject) => {
            passport_1.default.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
        });
        next();
    }
    catch (err) {
        if (err instanceof _jwt_1.jwtError) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                message: http_status_codes_1.ReasonPhrases.FORBIDDEN,
                status: http_status_codes_1.StatusCodes.FORBIDDEN
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR
        });
    }
    return next();
});
exports.IsAuth = IsAuth;
const verifyCallback = (req, resolve, reject, requiredRights) => (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (err || info || !user) {
        return reject(new _ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    if (requiredRights.length) {
        const userRights = _role_1.roleRights.get(user.role);
        if (!userRights || !requiredRights.every((requiredRight) => userRights.includes(requiredRight)) && req.params['userId'] !== user.id) {
            return reject(new _ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden'));
        }
    }
    resolve();
});
const GateRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = (0, _headers_1.getAccessTokenFromHeaders)(req.headers);
    if (!accessToken) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            message: http_status_codes_1.ReasonPhrases.UNAUTHORIZED,
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED
        });
    }
    return next();
});
exports.GateRoute = GateRoute;
