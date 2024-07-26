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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const _role_1 = require("../../contracts/_role");
const _toJson_1 = __importDefault(require("../config/_toJson"));
const bcrypt_1 = require("bcrypt");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(_role_1.UserRole),
        default: _role_1.UserRole.Mentee
    },
    dob: {
        type: Date,
        required: false,
    },
    bio: {
        type: String,
        required: false
    },
    tier: {
        type: String,
        required: false
    },
    areaOfInterest: {
        type: String,
        required: false
    }
}, { timestamps: true });
UserSchema.plugin(_toJson_1.default);
UserSchema.static('isEmailTaken', function (email, excludeUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
    });
});
UserSchema.method('isPasswordMatch', function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return (0, bcrypt_1.compare)(password, user.password);
    });
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield (0, bcrypt_1.hash)(user.password, 8);
        }
        next();
    });
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
