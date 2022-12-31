import { InterfaceLogin } from "../interface/InterfaceUser";
import { UserRepository } from "../repository/UserRepository";
import Bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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

  private generateToken(params = {}) {
    return Jwt.sign({ id: params }, authConfig.secret, {
      expiresIn: 86400,
    });
  }
}

export { UserService };
