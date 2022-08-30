"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const LoginRepositoryPostgreSQL_1 = __importDefault(require("./main/login/infraestructure/repositories/LoginRepositoryPostgreSQL"));
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const RegisterRepositoryPostgreSQL_1 = __importDefault(require("./main/register/infraestructure/RegisterRepositoryPostgreSQL"));
tsyringe_1.container.register("LoginRepository", {
    useClass: LoginRepositoryPostgreSQL_1.default
});
tsyringe_1.container.register("RegisterRepository", {
    useClass: RegisterRepositoryPostgreSQL_1.default
});
