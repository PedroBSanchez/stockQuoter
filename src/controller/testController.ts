import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

class testController {
  private router: Router;
  private authMiddleware: any;

  constructor(router: Router) {
    this.router = router;
    this.authMiddleware = require("../middlewares/auth");
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.get("/TESTE", (req: any, res) => {
      return res.status(200).send({ ok: "sesdfasdf" });
    });
    this.router.use(this.authMiddleware);
    this.router.get("/", (req: any, res) => {
      return res.status(200).send({ ok: true, user: req.userId });
    });
  }
}

const routes = new testController(router);

routes.useRoutes();

const testControllerRoutes = routes.getRouter();

export { testControllerRoutes };
