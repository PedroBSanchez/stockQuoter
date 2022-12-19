import { Router } from "express";

const router = Router();

class userController {
  private router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.get("/userTeste", (req, res) => {
      return res.status(200).json("Teste de rota de usuários");
    });
  }
}

const routes = new userController(router);

routes.useRoutes();

const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
