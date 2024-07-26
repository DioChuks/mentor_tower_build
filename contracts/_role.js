"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRights = exports.roles = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Mentee"] = "MENTEE";
    UserRole["Mentor"] = "MENTOR";
    UserRole["Admin"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
const allRoles = {
    user: [],
    mentor: ['getMentees', 'manageMentees'],
    admin: ['getMentees', 'manageMentees', 'getMentors', 'manageMentors'],
};
exports.roles = Object.keys(allRoles);
exports.roleRights = new Map(Object.entries(allRoles));
