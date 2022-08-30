export class HandledError {
  public message: string;
  public resolution: string;
  public responseStatus: number;

  constructor() {
    this.message = "Internal server error";
    this.resolution = "Unknown server error";
    this.responseStatus = 404;
  }
}
