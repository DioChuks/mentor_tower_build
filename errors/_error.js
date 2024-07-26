"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../app/config/config"));
const _logger_1 = __importDefault(require("../logger/_logger"));
const _ApiError_1 = __importDefault(require("./_ApiError"));
const errorConverter = (err, _req, _res, next) => {
    let error = err;
    if (!(error instanceof _ApiError_1.default)) {
        const statusCode = error.statusCode || error instanceof mongoose_1.default.Error ? http_status_codes_1.StatusCodes.BAD_REQUEST : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || `${http_status_codes_1.StatusCodes[statusCode]}`;
        error = new _ApiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, _req, res, _next) => {
    let { statusCode, message } = err;
    if (config_1.default.env === 'production' && !err.isOperational) {
        statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
    }
    res.locals['errorMessage'] = err.message;
    const response = Object.assign({ code: statusCode, message }, (config_1.default.env === 'development' && { stack: err.stack }));
    if (config_1.default.env === 'development') {
        _logger_1.default.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
