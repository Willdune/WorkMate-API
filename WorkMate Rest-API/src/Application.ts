import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { container } from "./Configuration";
import LoginController from "./main/login/aplication/controllers/LoginController";
import {
  createPool,
  PostgreSqlConnectionPool,
} from "./shared/services/PostgreSqlConnectionPool";
import { Pool } from "pg";
import RegisterController from "./main/register/aplication/controllers/RegisterController";
import { verifyToken } from "./shared/middlewares/Auth";
const app = express();

//enviroment setting
dotenv.config({ path: `enviroments/${process.env.ENV}.env` });

//pool setting
createPool(
  new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  })
);

//database connection test
PostgreSqlConnectionPool.query("SELECT NOW()", (err, res) => {
  if (err == undefined) console.log("Database: Succesfull");
  else {
    console.log("Database: Failure");
    console.log("Message:", err.message);
    return process.exit(1);
  }
});

// settings
app.set("port", process.env.APPLICATION_PORT);

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// controllers
app.use("/login", container.resolve(LoginController).routes());
app.use("/register", container.resolve(RegisterController).routes());
app.use("/testToken", verifyToken);

//start listening
app.listen(app.get("port"));

//execution console information
console.log("------------------");
console.log("Enviroment:", process.env.ENV);
console.log(`Listening on http://localhost:${app.get("port")}`);
console.log("------------------");

export default app;
