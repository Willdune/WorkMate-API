import { HandledError } from "../../../../shared/models/HandledError";

export class IncorrectCredentialsError extends HandledError{
    constructor() {
        super();
        super.message = "Credentials are incorrect";
        super.resolution = "Send correct username and password";
        super.responseStatus = 403;
      }
}