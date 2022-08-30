"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectCredentialsError = void 0;
const HandledError_1 = require("../../../../shared/models/HandledError");
class IncorrectCredentialsError extends HandledError_1.HandledError {
    constructor() {
        super();
        super.message = "Credentials are incorrect";
        super.resolution = "Send correct username and password";
        super.responseStatus = 403;
    }
}
exports.IncorrectCredentialsError = IncorrectCredentialsError;
