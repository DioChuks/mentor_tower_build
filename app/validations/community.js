"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = exports.updateCommPost = exports.newCommPost = void 0;
const joi_1 = __importDefault(require("joi"));
const _custom_validation_1 = require("./validate/_custom.validation");
const communityBody = {
    name: joi_1.default.string().required(),
    tier: joi_1.default.string().required(),
    content: joi_1.default.string().required().custom(_custom_validation_1.postSize)
};
exports.newCommPost = {
    body: joi_1.default.object().keys(communityBody),
};
exports.updateCommPost = {
    body: joi_1.default.object().keys({
        content: joi_1.default.string().required()
    }),
};
exports.commentSchema = {
    body: joi_1.default.object().keys({
        user: joi_1.default.string().required(),
        comment: joi_1.default.string().required()
    })
};
