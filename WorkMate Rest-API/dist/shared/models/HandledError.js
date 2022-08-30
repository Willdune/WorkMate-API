"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandledError = void 0;
class HandledError {
    constructor() {
        this.message = "Internal server error";
        this.resolution = "Unknown server error";
        this.responseStatus = 404;
    }
}
exports.HandledError = HandledError;
