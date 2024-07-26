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
exports.CommunityService = void 0;
const community_1 = __importDefault(require("../models/community"));
class CommunityService {
    createCommunity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Data to be saved:', data); // Log the data to be saved
            const community = new community_1.default(data);
            return community.save();
        });
    }
    getCommunities() {
        return __awaiter(this, void 0, void 0, function* () {
            return community_1.default.find().exec();
        });
    }
    getCommunityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return community_1.default.findById(id).exec();
        });
    }
    updateCommunity(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return community_1.default.findByIdAndUpdate(id, data, { new: true }).exec();
        });
    }
    deleteCommunity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return community_1.default.findByIdAndDelete(id).exec();
        });
    }
    likeCommPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return community_1.default.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).exec();
        });
    }
    commentCommPost(id, user, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return community_1.default.findByIdAndUpdate(id, { $push: { comments: { user, comment } } }, { new: true }).exec();
        });
    }
}
exports.CommunityService = CommunityService;
