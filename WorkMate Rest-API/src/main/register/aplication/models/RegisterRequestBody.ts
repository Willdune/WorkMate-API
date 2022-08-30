import { WrongEmailFormatError } from "../../../login/aplication/models/WrongEmailFormatError";
import { RegisterRequestBodyError } from "./RegisterRequestBodyError";

export class RegisterRequestBody {
  email: string;
  password: any;

  constructor(email : string, password : string){
    if(email == null || email == undefined || password == null || password == undefined || password == ""){
      throw new RegisterRequestBodyError();
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
  