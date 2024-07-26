"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedMethods = {
    '/auth/register': ['POST'],
    '/auth/login': ['POST'],
    '/auth/user': ['GET'],
};
exports.default = allowedMethods;
