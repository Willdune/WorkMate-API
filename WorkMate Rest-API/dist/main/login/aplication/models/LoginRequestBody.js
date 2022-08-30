"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestBody = void 0;
const LoginRequestBodyError_1 = require("./LoginRequestBodyError");
const WrongEmailFormatError_1 = require("./WrongEmailFormatError");
class LoginRequestBody {
    constructor(email, password) {
        if (email == null || email == undefined || password == null || password == undefined || password == "") {
            throw new LoginRequestBodyError_1.LoginRequestBodyError();
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
exports.LoginRequestBody = LoginRequestBody;
;
