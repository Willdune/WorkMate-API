import { Router } from "express";
import { autoInjectable } from "tsyringe";
import { HandledError } from "../../../../shared/models/HandledError";
import RegisterAdapter from "../adapters/RegisterAdapter";
import { RegisterRequestBody } from "../models/RegisterRequestBody";

@autoInjectable()
export default class RegisterController {
  adapter: RegisterAdapter;
  router: Router;

  constructor(adapter: RegisterAdapter) {
    this.adapter = adapter;
    this.router = Router();
  }

  routes() {
    this.router.post("/", async (req, res) => {
      try {
        let registerRequest = await new RegisterRequestBody (req.body.email, req.body.password);
        return res.status(200).send(await this.adapter.adapt(registerRequest));
      } catch (e) {
        res.status((e as HandledError).responseStatus).send({
          error:
              (e as Error).message,
          resolution:
          (e as HandledError).resolution
        });
      }
    });
    return this.router;
  }
}
