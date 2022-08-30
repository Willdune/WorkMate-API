import { injectable } from "tsyringe";
import { RegisterUser } from "../../domain/models/RegisterUser";
import RegisterUseCase from "../useCases/RegisterUseCase";
import { RegisterRequestBody } from "../models/RegisterRequestBody";

@injectable()
export default class RegisterAdapter {
  useCase: RegisterUseCase;

  constructor(useCase: RegisterUseCase) {
    this.useCase = useCase;
  }

  public async adapt(registerRequest: RegisterRequestBody): Promise<any> {
    return await this.useCase.execute(registerRequest);
  }
}
