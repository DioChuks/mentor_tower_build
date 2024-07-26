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
exports.commentOnCommunityPost = exports.likeCommunityPost = exports.deleteCommunity = exports.updateCommunity = exports.getCommunityById = exports.getCommunities = exports.createCommunityPost = void 0;
const _catchAsync_1 = __importDefault(require("../utils/_catchAsync"));
const community_service_1 = require("../services/community.service");
const http_status_codes_1 = require("http-status-codes");
const communityService = new community_service_1.CommunityService();
const createCommunityPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request Body:', req.body); // Log the request body
    try {
        const newCommunity = yield communityService.createCommunity(req.body);
        console.log('Created Community:', newCommunity); // Log the created community
        res.status(http_status_codes_1.StatusCodes.CREATED).json(newCommunity);
    }
    catch (error) {
        next(error);
    }
});
exports.createCommunityPost = createCommunityPost;
exports.getCommunities = (0, _catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communities = yield communityService.getCommunities();
        res.status(http_status_codes_1.StatusCodes.CREATED).json(communities);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    }
}));
exports.getCommunityById = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield communityService.getCommunityById(req.params.id);
        if (!community) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(community);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    }
}));
exports.updateCommunity = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield communityService.updateCommunity(req.params.id, req.body);
        if (!community) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(community);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    }
}));
exports.deleteCommunity = (0, _catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield communityService.deleteCommunity(req.params.id);
        if (!community) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(community);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    }
}));
const likeCommunityPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const community = yield communityService.likeCommPost(id);
        if (!community) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Community post not found' });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(community);
    }
    catch (error) {
        next(error);
    }
});
exports.likeCommunityPost = likeCommunityPost;
const commentOnCommunityPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user, comment } = req.body;
        const community = yield communityService.commentCommPost(id, user, comment);
        if (!community) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Community post not found' });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(community);
    }
    catch (error) {
        next(error);
    }
});
exports.commentOnCommunityPost = commentOnCommunityPost;
