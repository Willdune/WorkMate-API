import { Router } from "express";

export default class testToken {
    router: Router = Router();

    routes() {
      this.router.get("/", async (req, res) => {
        return res.status(200).send("El token está ok");
      });
      return this.router;
    }
  }
  