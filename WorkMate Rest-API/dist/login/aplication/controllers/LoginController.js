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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginAdapter_1 = __importDefault(require("../adapters/LoginAdapter"));
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const Auth_1 = require("../../../shared/middlewares/Auth");
let LoginController = class LoginController {
    constructor(adapter) {
        this.adapter = adapter;
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, Auth_1.validateAuthRequest)(req);
            }
            catch (e) {
                res.status(e.responseStatus).send({
                    error: e.message,
                    resolution: e.resolution,
                });
                return;
            }
            try {
                let loginRequest = {
                    email: req.body.email,
                    requestPassword: req.body.password,
                };
                yield this.adapter.adapt(loginRequest.email).then((val) => __awaiter(this, void 0, void 0, function* () {
                    let a = yield (0, Auth_1.comparePassword)(loginRequest.requestPassword, val.password);
                    if (a) {
                        this.adapter.setLastLogin(loginRequest.email);
                        res.status(200).send({ token: (0, Auth_1.createToken)(val.uuid) });
                    }
                    else {
                        res.status(200).send("Invalid credentials");
                    }
                }));
            }
            catch (e) {
                res
                    .status(e.responseStatus == undefined
                    ? 500
                    : e.responseStatus)
                    .send({
                    error: e.responseStatus == undefined
                        ? "internal server error."
                        : e.message,
                    resolution: e.responseStatus == undefined
                        ? e.message
                        : e.resolution,
                });
            }
        }));
        return this.router;
    }
};
LoginController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [LoginAdapter_1.default])
], LoginController);
exports.default = LoginController;
