import LoginAdapter from "../adapters/LoginAdapter";
import { Router } from "express";
import { autoInjectable } from "tsyringe";
import { LoginRequestBody} from "../models/LoginRequestBody";
import { HandledError } from "../../../../shared/models/HandledError";

@autoInjectable()
export default class LoginController {
  adapter: LoginAdapter;
  router: Router;

  constructor(adapter: LoginAdapter) {
    this.adapter = adapter;
    this.router = Router();
  }

  routes() {
    this.router.get("/", async (req, res) => {
      try {
        let loginRequest = new LoginRequestBody(req.body.email, req.body.password);
        return res.status(200).send(await this.adapter.adapt(loginRequest));
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
