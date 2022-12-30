import { InterfaceLogin } from "../interface/InterfaceUser";
import { UserRepository } from "../repository/UserRepository";
import Bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const authConfig = require("../config/auth");

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

    const token = Jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    return { user, token };
  }
}

export { UserService };
