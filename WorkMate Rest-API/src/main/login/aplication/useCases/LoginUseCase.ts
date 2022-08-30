import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import {
  comparePassword,
  createToken,
} from "../../../../shared/middlewares/Auth";
import { LoginRequestBody } from "../models/LoginRequestBody";
import { LoginUserDTO } from "../../infraestructure/models/LoginUserDTO";
import { IncorrectCredentialsError } from "../../domain/models/IncorrectCredentialsError";
import { LoginUser } from "../../domain/models/LoginUser";
import { LoginRepository } from "../../domain/repositories/LoginRepository";

@injectable()
export default class LoginUseCase {
  repository: LoginRepository;

  constructor(@inject("LoginRepository") repository: LoginRepository) {
    this.repository = repository;
  }

  public async execute(loginRequest: LoginRequestBody): Promise<any> {
    let user = this.toUser(
      (await this.repository.getLogin(loginRequest.email)) as LoginUserDTO
    );
    let resultComparationPassword = await comparePassword(
      loginRequest.password,
      user.password
    );
    if (resultComparationPassword) {
      await this.repository.setLastLogin(loginRequest.email);
      return { token: createToken(user.uuid) };
    } else {
      throw new IncorrectCredentialsError();
    }
  }

  private toUser(userDTO: LoginUserDTO): LoginUser {
    return {
      uuid: userDTO.uuid,
      password: userDTO.password,
    };
  }
}
