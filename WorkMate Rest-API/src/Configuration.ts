import "reflect-metadata";
import LoginRepositoryPostgreSQL from "./main/login/infraestructure/repositories/LoginRepositoryPostgreSQL";
import { container } from "tsyringe";
import RegisterRepositoryPostgreSQL from "./main/register/infraestructure/RegisterRepositoryPostgreSQL";

container.register("LoginRepository", {
    useClass: LoginRepositoryPostgreSQL
});

container.register("RegisterRepository", {
    useClass: RegisterRepositoryPostgreSQL
});

export { container };