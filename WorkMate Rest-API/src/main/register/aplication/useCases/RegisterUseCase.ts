import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { RegisterRequestBody } from "../models/RegisterRequestBody";
import { RegisterRepository } from "../../domain/repositories/RegisterRepository";
import { UserExistsError } from "../models/UserExistsError";
import { encryptPassword } from "../../../../shared/middlewares/Auth";

@injectable()
export default class RegisterUseCase {
  repository: RegisterRepository;

  constructor(@inject("RegisterRepository") repository: RegisterRepository) {
    this.repository = repository;
  }

  public async execute(registerRequest: RegisterRequestBody): Promise<any> {
    if (
      !(await this.repository.checkUserExists(registerRequest.email)) as boolean
    ) {
      return await this.repository.createUser(
        registerRequest.email,
        await encryptPassword(registerRequest.password)
      );
    } else {
      throw new UserExistsError();
    }
  }
}
