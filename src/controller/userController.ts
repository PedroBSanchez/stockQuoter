import { Router } from "express";
import { InterfaceLogin } from "../interface/InterfaceUser";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";
import { Request, Response } from "express";

const router = Router();

class userController {
  private router: Router;
  private userService: UserService;
  private authMiddleware: any;
  constructor(router: Router) {
    this.router = router;
    this.userService = new UserService();
    this.authMiddleware = require("../middlewares/auth");
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

    this.router.post(
      "/login",
      async (req: Request, res: Response): Promise<Response> => {
        const loginParam: InterfaceLogin = req.body;
        const login = await this.userService.login(loginParam);

        if (login.error) {
          return res.status(400).json(login.error);
        }

        login.user.password = undefined;

        return res.status(200).json(login);
      }
    );
  }
}

const routes = new userController(router);

routes.useRoutes();

const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
