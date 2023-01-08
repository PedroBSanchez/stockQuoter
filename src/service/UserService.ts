import {
  InterfaceAddStock,
  InterfaceCreateUser,
  InterfaceLogin,
  InterfaceRemoveStock,
} from "../interface/InterfaceUser";
import { UserRepository } from "../repository/UserRepository";
import Bcrypt from "bcrypt";
import Jwt, { verify } from "jsonwebtoken";
import axios from "axios";

const authConfig = require("../config/auth");

// Ao criar o usuário também gerar um token e retornar esse

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async login(login: InterfaceLogin): Promise<any> {
    const user = await this.userRepository.findUserByEmail(login.email);
    if (!user) {
      return { error: "User not found" };
    }

    if (!(await Bcrypt.compare(login.password, user.password))) {
      return { error: "Invalid password" };
    }

    // Gerar token

    return { user, token: this.generateToken({ id: user.id }) };
  }

  public async create(createUser: InterfaceCreateUser): Promise<any> {
    const user = await this.userRepository.findUserByEmail(createUser.email);

    if (user) return { error: "User already exists" };

    createUser.stocks = [];

    const newUser = await this.userRepository.create(createUser);

    return { user: newUser, token: this.generateToken({ id: newUser.id }) };
  }

  public async addStock(
    newStock: InterfaceAddStock,
    userId: object
  ): Promise<any> {
    //Verificar se ação existe na api terceira
    const validStock = await this.stockValid(newStock);

    if (validStock.error) return validStock;

    const addStock = await this.userRepository.addStock(newStock, userId);

    if (addStock.modifiedCount === 0) {
      return { error: "Stock already added for this user" };
    }
    return addStock;
  }

  public async removeStock(
    removeStock: InterfaceRemoveStock,
    userId: object
  ): Promise<any> {
    const pullStock = await this.userRepository.removeStock(
      removeStock,
      userId
    );

    if (pullStock.modifiedCount === 0) {
      return { error: "Stock not found" };
    }

    return pullStock;
  }

  public async getAllStocks(userId: object): Promise<any> {
    const stocks = await this.userRepository.getAllStocks(userId);

    if (!stocks || stocks === undefined) return { error: "Not found" };

    return stocks;
  }

  public async getUser(userId: object): Promise<any> {
    const user = await this.userRepository.getUser(userId);

    if (!user || user == undefined) return { error: "Not found" };

    return user;
  }

  private generateToken(params = {}) {
    return Jwt.sign({ id: params }, authConfig.secret, {
      expiresIn: 86400,
    });
  }

  private async stockValid(newStock: InterfaceAddStock): Promise<any> {
    let stockExists: boolean = true;

    await axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${newStock.stock.toUpperCase()}&interval=15min&slice=year1month1&apikey=J8PZ950UIC8WF2R0`
      )
      .then((response) => {
        if (response.data["Error Message"]) {
          stockExists = false;
          return;
        }
      })
      .catch((error) => {
        stockExists = false;
        return;
      });

    if (!stockExists) {
      return { error: "Stock invalid" };
    }
    return { success: "Stock valid" };
  }
}

export { UserService };
