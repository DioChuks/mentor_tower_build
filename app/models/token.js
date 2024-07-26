"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _token_types_1 = __importDefault(require("../../contracts/_token.types"));
const _toJson_1 = __importDefault(require("../config/_toJson"));
const tokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [_token_types_1.default.REFRESH, _token_types_1.default.RESET_PASSWORD, _token_types_1.default.VERIFY_EMAIL],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
tokenSchema.plugin(_toJson_1.default);
const Token = mongoose_1.default.model('Token', tokenSchema);
exports.default = Token;
