"use strict";
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
exports.verifyToken = exports.encryptPassword = exports.comparePassword = exports.createToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(uuid) {
    return jsonwebtoken_1.default.sign({ id: uuid }, "Oppenheimer", {
        expiresIn: 43200, //12 horas
    }); //TODO cambiar esto a un dotenv¿
}
exports.createToken = createToken;
function comparePassword(requestPassword, dbPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(requestPassword, dbPassword);
    });
}
exports.comparePassword = comparePassword;
function encryptPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, 5);
    });
}
exports.encryptPassword = encryptPassword;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["access-token"];
    console.log(token);
    if (!token)
        return res.status(403).json({ message: "No token provided" });
    const decoded = jsonwebtoken_1.default.verify(token, "Oppenheimer");
    console.log(decoded);
});
exports.verifyToken = verifyToken;
