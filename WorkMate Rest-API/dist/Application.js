"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Configuration_1 = require("./Configuration");
const LoginController_1 = __importDefault(require("./main/login/aplication/controllers/LoginController"));
const PostgreSqlConnectionPool_1 = require("./shared/services/PostgreSqlConnectionPool");
const pg_1 = require("pg");
const RegisterController_1 = __importDefault(require("./main/register/aplication/controllers/RegisterController"));
const Auth_1 = require("./shared/middlewares/Auth");
const app = (0, express_1.default)();
//enviroment setting
dotenv_1.default.config({ path: `enviroments/${process.env.ENV}.env` });
//pool setting
(0, PostgreSqlConnectionPool_1.createPool)(new pg_1.Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
}));
//database connection test
PostgreSqlConnectionPool_1.PostgreSqlConnectionPool.query("SELECT NOW()", (err, res) => {
    if (err == undefined)
        console.log("Database: Succesfull");
    else {
        console.log("Database: Failure");
        console.log("Message:", err.message);
        return process.exit(1);
    }
});
// settings
app.set("port", process.env.APPLICATION_PORT);
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// controllers
app.use("/login", Configuration_1.container.resolve(LoginController_1.default).routes());
app.use("/register", Configuration_1.container.resolve(RegisterController_1.default).routes());
app.use("/testToken", Auth_1.verifyToken);
//start listening
app.listen(app.get("port"));
//execution console information
console.log("------------------");
console.log("Enviroment:", process.env.ENV);
console.log(`Listening on http://localhost:${app.get("port")}`);
console.log("------------------");
exports.default = app;
