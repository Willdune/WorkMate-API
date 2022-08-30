import { HandledError } from "../../../../shared/models/HandledError";

export class RegisterRequestBodyError extends HandledError{
    constructor() {
        super();
        super.message = "Expected parameters where not found";
        super.resolution = "Send email and password parameters";
        super.responseStatus = 400;
      }
}