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
const PostgreSqlConnectionPool_1 = require("../../../../shared/services/PostgreSqlConnectionPool");
const IncorrectCredentialsError_1 = require("../../domain/models/IncorrectCredentialsError");
const DatabaseError_1 = require("../models/DatabaseError");
class LoginRepositoryPostgreSQL {
    getLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield PostgreSqlConnectionPool_1.PostgreSqlConnectionPool.query("SELECT uuid, password FROM users WHERE email = $1 AND withdrawn = FALSE", [email]);
            }
            catch (e) {
                throw new DatabaseError_1.DatabaseError(e.message);
            }
            return this.toDao(result);
        });
    }
    setLastLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.toBool(yield PostgreSqlConnectionPool_1.PostgreSqlConnectionPool.query("UPDATE public.users SET last_access=current_timestamp WHERE email=$1", [email]));
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
    toDao(rs) {
        if (rs.rowCount == 0)
            throw new IncorrectCredentialsError_1.IncorrectCredentialsError();
        return {
            uuid: rs.rows[0]["uuid"],
            password: rs.rows[0]["password"],
        };
    }
}
exports.default = LoginRepositoryPostgreSQL;
