import { Router } from "express";
import {
  InterfaceAddStock,
  InterfaceCreateUser,
  InterfaceLogin,
  InterfaceRemoveStock,
} from "../interface/InterfaceUser";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";
import { Request, Response } from "express";
import { any } from "joi";

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
    this.router.post("/create", async (req, res) => {
      const newUser: InterfaceCreateUser = req.body;

      const createNewUser = await this.userService.create(newUser);

      if (createNewUser.error) return res.status(400).send(createNewUser.error);
      createNewUser.user.password = undefined;

      return res.status(200).send(createNewUser);
    });

    this.router.put("/addstock", async (req: any, res) => {
      this.router.use(this.authMiddleware());
      const newStock: InterfaceAddStock = req.body;
      const userId = req.userId;

      const addStock = await this.userService.addStock(newStock, userId);

      if (addStock.error) {
        return res.status(400).send(addStock);
      }
      return res.status(200).send({ success: "Stock successfully added" });
    });

    this.router.delete("/removestock", async (req: any, res) => {
      const removeStock: InterfaceRemoveStock = req.body;
      const userId = req.userId;

      const pullStock = await this.userService.removeStock(removeStock, userId);

      if (pullStock.error) return res.status(400).send(pullStock);

      return res.status(200).send({ success: "Stock successfully removed" });
    });

    this.router.get("/getallstocks", async (req: any, res) => {
      const userId = req.userId;

      const allStocks = await this.userService.getAllStocks(userId);

      if (allStocks.error) {
        return res.status(400).send(allStocks);
      }

      return res.status(200).send(allStocks);
    });

    this.router.get("/getuser", async (req: any, res) => {
      const userId = req.userId;

      const user = await this.userService.getUser(userId);

      if (user.error) {
        return res.status(400).send(user);
      }

      return res.status(200).send(user);
    });
  }
}

const routes = new userController(router);

routes.useRoutes();

const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
