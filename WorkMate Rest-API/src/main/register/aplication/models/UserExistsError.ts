import { HandledError } from "../../../../shared/models/HandledError";

export class UserExistsError extends HandledError{
    constructor() {
        super();
        super.message = "Registration error";
        super.resolution = "user already exists";
        super.responseStatus = 409;
      }
}