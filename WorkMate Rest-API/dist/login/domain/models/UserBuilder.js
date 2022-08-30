"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = void 0;
const User_1 = require("./User");
class UserBuilder {
    constructor() {
        this.user = new User_1.User();
    }
    id(id) {
        this.user.id = id;
        return this;
    }
    uuid(uuid) {
        this.user.uuid = uuid;
        return this;
    }
    token(token) {
        this.user.token = token;
        return this;
    }
    email(email) {
        this.user.email = email;
        return this;
    }
    username(username) {
        this.user.username = username;
        return this;
    }
    password(password) {
        this.user.password = password;
        return this;
    }
    registrationTimestamp(registrationTimestamp) {
        this.user.registrationTimestamp = registrationTimestamp;
        return this;
    }
    lastAccesTimestamp(lastAccesTimestamp) {
        this.user.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }
    banned(banned) {
        this.user.banned = banned;
        return this;
    }
    role(role) {
        this.user.role = role;
        return this;
    }
    build() {
        return this.user;
    }
}
exports.UserBuilder = UserBuilder;
