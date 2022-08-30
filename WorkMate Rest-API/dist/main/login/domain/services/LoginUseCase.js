"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const Auth_1 = require("../../../../shared/middlewares/Auth");
const IncorrectCredentialsError_1 = require("../models/IncorrectCredentialsError");
let LoginUseCase = class LoginUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = this.toUser((yield this.repository.getLogin(loginRequest.email)));
            let resultComparationPassword = yield (0, Auth_1.comparePassword)(loginRequest.password, user.password);
            if (resultComparationPassword) {
                yield this.repository.setLastLogin(loginRequest.email);
                return { token: (0, Auth_1.createToken)(user.uuid) };
            }
            else {
                throw new IncorrectCredentialsError_1.IncorrectCredentialsError();
            }
        });
    }
    toUser(userDTO) {
        return {
            uuid: userDTO.uuid,
            password: userDTO.password,
        };
    }
};
LoginUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("LoginRepository")),
    __metadata("design:paramtypes", [Object])
], LoginUseCase);
exports.default = LoginUseCase;
