"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestBodyError = void 0;
const HandledError_1 = require("../../../../shared/models/HandledError");
class LoginRequestBodyError extends HandledError_1.HandledError {
    constructor() {
        super();
        super.message = "Expected parameters where not found";
        super.resolution = "Send email and password parameters";
        super.responseStatus = 400;
    }
}
exports.LoginRequestBodyError = LoginRequestBodyError;
