import { Router } from "express";
import { UserRepository } from "../repository/UserRepository";

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
      const repository = new UserRepository();

      const salvar = repository.adicionarUserTeste();
      return res.status(200).json(salvar);
    });
  }
}

const routes = new userController(router);

routes.useRoutes();

const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
