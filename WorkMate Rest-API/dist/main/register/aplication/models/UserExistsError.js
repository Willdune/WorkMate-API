"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistsError = void 0;
const HandledError_1 = require("../../../../shared/models/HandledError");
class UserExistsError extends HandledError_1.HandledError {
    constructor() {
        super();
        super.message = "Registration error";
        super.resolution = "user already exists";
        super.responseStatus = 409;
    }
}
exports.UserExistsError = UserExistsError;
