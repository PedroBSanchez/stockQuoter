import { Model } from "mongoose";
import { UsersModelo } from "../database/schemas/UserSchema";
import {
  InterfaceAddStock,
  InterfaceCreateUser,
  InterfaceRemoveStock,
} from "../interface/InterfaceUser";
import { User } from "../models/User";

class UserRepository {
  private model: Model<User>;

  public constructor() {
    this.model = UsersModelo;
  }

  public async create(user: InterfaceCreateUser) {
    return await this.model.create(user);
  }

  public async findUserByEmail(email: string) {
    return await this.model.findOne({ email: email }).select("+password");
  }

  public async addStock(
    newStock: InterfaceAddStock,
    userId: object
  ): Promise<any> {
    const addStock = await this.model.updateOne(
      { id: userId },
      {
        $addToSet: {
          stocks: newStock.stock.toUpperCase(),
        },
      }
    );

    return addStock;
  }

  public async removeStock(
    removeStock: InterfaceRemoveStock,
    userId: object
  ): Promise<any> {
    return await this.model.updateOne(
      { id: userId },
      {
        $pull: {
          stocks: removeStock.stock.toUpperCase(),
        },
      }
    );
  }

  public async getAllStocks(userId: object): Promise<any> {
    return await this.model.findOne({ id: userId }).select("stocks");
  }

  public async getUser(userId: object): Promise<any> {
    return await this.model.findOne({ id: userId });
  }
}

export { UserRepository };
