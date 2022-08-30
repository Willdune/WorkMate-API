"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRequestBody = void 0;
const WrongEmailFormatError_1 = require("../../../login/aplication/models/WrongEmailFormatError");
const RegisterRequestBodyError_1 = require("./RegisterRequestBodyError");
class RegisterRequestBody {
    constructor(email, password) {
        if (email == null || email == undefined || password == null || password == undefined || password == "") {
            throw new RegisterRequestBodyError_1.RegisterRequestBodyError();
        }
        this.email = this.validateEmail(email);
        this.password = password;
    }
    validateEmail(email) {
        if (email.match((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
            return email;
        }
        else {
            throw new WrongEmailFormatError_1.WrongEmailFormatError();
        }
    }
}
exports.RegisterRequestBody = RegisterRequestBody;
;
