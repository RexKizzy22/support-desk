"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get a new User object.
 *
 * @returns
 */
function getNew(name, email, password) {
    return {
        id: -1,
        email: email,
        name: name,
        password: password,
    };
}
/**
 * Copy a user object.
 *
 * @param user
 * @returns
 */
function copy(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password
    };
}
// Export default
exports.default = {
    new: getNew,
    copy: copy,
};
