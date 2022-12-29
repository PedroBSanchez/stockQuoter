import { Model } from "mongoose";
import { UsersModelo } from "../database/schemas/UserSchema";
import { User } from "../models/User";

class UserRepository {
  private model: Model<User>;

  public constructor() {
    this.model = UsersModelo;
  }

  public async adicionarUserTeste() {
    return await this.model.create({
      email: "teste",
      password: "teste123",
      stocks: ["teste1", "teste2", "teste3"],
    });
  }

  public async findUserByEmail(email: string) {
    return await this.model.findOne({ email: email }).select("+password");
  }
}

export { UserRepository };
