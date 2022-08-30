import { HandledError } from "../../../../shared/models/HandledError";

export class WrongEmailFormatError extends HandledError{
    constructor() {
        super();
        super.message = "Incorrect email format";
        super.resolution = "Send a correct email address";
        super.responseStatus = 403;
      }
}