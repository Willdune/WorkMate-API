"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const HandledError_1 = require("../../../../shared/models/HandledError");
class DatabaseError extends HandledError_1.HandledError {
    constructor(message) {
        super();
        super.message = message;
        super.resolution = "Check query or parameters";
        super.responseStatus = 500;
    }
}
exports.DatabaseError = DatabaseError;
