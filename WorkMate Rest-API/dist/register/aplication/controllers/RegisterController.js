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
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const Auth_1 = require("../../../shared/middlewares/Auth");
const RegisterAdapter_1 = __importDefault(require("../adapters/RegisterAdapter"));
let RegisterController = class RegisterController {
    constructor(adapter) {
        this.adapter = adapter;
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                let registerRequest = {
                    email: req.body.email,
                    password: yield (0, Auth_1.encryptPassword)(req.body.password),
                };
                if (yield this.adapter.adaptCheck(registerRequest.email)) {
                    res.status(200).send("user already exists");
                }
                else {
                    res.status(200).send(yield this.adapter.createUser(registerRequest.email, registerRequest.password));
                }
            }
            catch (error) { }
        }));
        return this.router;
    }
};
RegisterController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [RegisterAdapter_1.default])
], RegisterController);
exports.default = RegisterController;
