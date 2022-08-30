import LoginUseCase from "../useCases/LoginUseCase";
import { injectable } from "tsyringe";
import { LoginUser } from "../../domain/models/LoginUser";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";
import { LoginRequestBody } from "../models/LoginRequestBody";

@injectable()
export default class LoginAdapter {
  useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    this.useCase = useCase;
  }

  public async adapt(loginRequest: LoginRequestBody): Promise<any> {
    try {
      return await this.useCase.execute(loginRequest); 
    } catch (error) {
      throw error;
    }
    
  }
}
