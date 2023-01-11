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
    userId: any
  ): Promise<any> {
    console.log(userId);
    const addStock = await this.model.updateOne(
      { _id: userId.id },
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
    userId: any
  ): Promise<any> {
    return await this.model.updateOne(
      { _id: userId.id },
      {
        $pull: {
          stocks: removeStock.stock.toUpperCase(),
        },
      }
    );
  }

  public async getAllStocks(userId: any): Promise<any> {
    return await this.model.findOne({ _id: userId.id }).select("stocks");
  }

  public async getUser(userId: any): Promise<any> {
    return await this.model.findOne({ _id: userId.id });
  }
}

export { UserRepository };
