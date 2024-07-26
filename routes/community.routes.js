"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _validate_middleware_1 = __importDefault(require("../app/validations/validate/_validate.middleware"));
const auth_1 = require("../app/middleware/auth");
const validateMiddleware_1 = __importDefault(require("../app/validations/validate/validateMiddleware"));
const community_1 = require("../app/validations/community");
const community_controller_1 = require("../app/controllers/community.controller");
const commRouter = (0, express_1.Router)();
commRouter.use(auth_1.GateRoute);
commRouter.post('/', validateMiddleware_1.default, community_controller_1.createCommunityPost);
commRouter.get('/', community_controller_1.getCommunities);
commRouter.get('/post/:id', community_controller_1.getCommunityById);
commRouter.patch('/post/:id', (0, _validate_middleware_1.default)(community_1.updateCommPost), community_controller_1.updateCommunity);
commRouter.delete('/post/:id', community_controller_1.deleteCommunity);
commRouter.post('/:id/like', community_controller_1.likeCommunityPost);
commRouter.post('/:id/comment', (0, _validate_middleware_1.default)(community_1.commentSchema), community_controller_1.commentOnCommunityPost);
exports.default = commRouter;
