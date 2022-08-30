"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTOBuilder = void 0;
const UserBuilder_1 = require("../../domain/models/UserBuilder");
class UserDTOBuilder {
    constructor() {
        this.userDTO = {
            id: -1,
            uuid: "",
            token: "",
            email: "",
            username: "",
            password: "",
            registrationTimestamp: 0,
            lastAccesTimestamp: 0,
            banned: false,
            role: ""
        };
    }
    id(id) {
        this.userDTO.id = id;
        return this;
    }
    uuid(uuid) {
        this.userDTO.uuid = uuid;
        return this;
    }
    token(token) {
        this.userDTO.token = token;
        return this;
    }
    email(email) {
        this.userDTO.email = email;
        return this;
    }
    username(username) {
        this.userDTO.username = username;
        return this;
    }
    password(password) {
        this.userDTO.password = password;
        return this;
    }
    registrationTimestamp(registrationTimestamp) {
        this.userDTO.registrationTimestamp = registrationTimestamp;
        return this;
    }
    lastAccesTimestamp(lastAccesTimestamp) {
        this.userDTO.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }
    banned(banned) {
        this.userDTO.banned = banned;
        return this;
    }
    role(role) {
        this.userDTO.role = role;
        return this;
    }
    build() {
        return this.userDTO;
    }
    toUser(userDTO) {
        return new UserBuilder_1.UserBuilder()
            .uuid(userDTO.uuid)
            .token(userDTO.token)
            .email(userDTO.email)
            .username(userDTO.username)
            .password(userDTO.password)
            .registrationTimestamp(userDTO.registrationTimestamp)
            .lastAccesTimestamp(userDTO.lastAccesTimestamp)
            .banned(userDTO.banned)
            .role(userDTO.role)
            .build();
    }
    ;
}
exports.UserDTOBuilder = UserDTOBuilder;
