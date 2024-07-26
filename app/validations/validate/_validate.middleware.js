"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = require("http-status-codes");
const _pick_1 = __importDefault(require("../../utils/_pick"));
const _ApiError_1 = __importDefault(require("../../../errors/_ApiError"));
const validate = (schema) => (req, _res, next) => {
    const validSchema = (0, _pick_1.default)(schema, ['params', 'query', 'body']);
    const object = (0, _pick_1.default)(req, Object.keys(validSchema));
    console.log('Object to be validated:', object); // Log the object to be validated
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new _ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    console.log('Validated value:', value); // Log the validated value
    return next();
};
exports.default = validate;
