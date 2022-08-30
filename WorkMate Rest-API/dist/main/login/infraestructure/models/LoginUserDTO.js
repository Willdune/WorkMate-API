"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUser = void 0;
function toUser(loginuserdto) {
    return {
        uuid: loginuserdto.uuid,
        password: loginuserdto.password
    };
}
exports.toUser = toUser;
