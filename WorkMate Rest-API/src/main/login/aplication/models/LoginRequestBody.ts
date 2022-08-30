import { LoginRequestBodyError } from "./LoginRequestBodyError";
import { WrongEmailFormatError } from "./WrongEmailFormatError";

export class LoginRequestBody {
  email: string;
  password: string;

  constructor(email : string, password : string){
    if(email == null || email == undefined || password == null || password == undefined || password == ""){
      throw new LoginRequestBodyError();
    }
    this.email = this.validateEmail(email);
    this.password = password;
  }

  validateEmail(email : string) : string{
    if(email.match((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))){
      return email;
    }else{
      throw new WrongEmailFormatError();
    }
  }
};
