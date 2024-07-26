"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const CommunitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [CommentSchema],
    no_of_tagged: {
        type: Number,
        required: false
    }
}, { timestamps: true });
const Community = (0, mongoose_1.model)('Community', CommunitySchema);
exports.default = Community;
