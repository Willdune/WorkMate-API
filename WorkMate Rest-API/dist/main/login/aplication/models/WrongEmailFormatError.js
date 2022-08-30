"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongEmailFormatError = void 0;
const HandledError_1 = require("../../../../shared/models/HandledError");
class WrongEmailFormatError extends HandledError_1.HandledError {
    constructor() {
        super();
        super.message = "Incorrect email format";
        super.resolution = "Send a correct email address";
        super.responseStatus = 403;
    }
}
exports.WrongEmailFormatError = WrongEmailFormatError;
