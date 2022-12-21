import { Model } from "mongoose";
import { UsersModelo } from "../database/schemas/UserSchema";
import { User } from "../models/User";

class UserRepository {
  private model: Model<User>;

  public constructor() {
    this.model = UsersModelo;
  }

  public async adicionarUserTeste() {
    return this.model.create({
      email: "teste",
      password: "teste",
      stocks: ["teste1", "teste2", "teste3"],
    });
  }
}

export { UserRepository };
