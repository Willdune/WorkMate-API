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
Object.defineProperty(exports, "__esModule", { value: true });
const PostgreSqlConnectionPool_1 = require("../../../shared/services/PostgreSqlConnectionPool");
const DatabaseError_1 = require("../../login/infraestructure/models/DatabaseError");
class RegisterRepositoryPostgreSQL {
    checkUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.toBool(yield PostgreSqlConnectionPool_1.PostgreSqlConnectionPool.query("SELECT uuid FROM users WHERE email = $1 AND withdrawn = FALSE", [email]));
            }
            catch (e) {
                throw new DatabaseError_1.DatabaseError(e.message);
            }
        });
    }
    createUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.toBool(yield PostgreSqlConnectionPool_1.PostgreSqlConnectionPool.query("INSERT INTO public.users (uuid, email, password, withdrawn, creation_date) VALUES(uuid_generate_v4(), $1, $2, false, current_timestamp);", [email, password]));
            }
            catch (e) {
                throw new DatabaseError_1.DatabaseError(e.message);
            }
        });
    }
    toBool(rs) {
        if (rs.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = RegisterRepositoryPostgreSQL;
