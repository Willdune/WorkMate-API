import { HandledError } from "../../../../shared/models/HandledError";

export class DatabaseError extends HandledError{
    constructor(message : string) {
        super();
        super.message = message;
        super.resolution = "Check query or parameters";
        super.responseStatus = 500;
      }
}