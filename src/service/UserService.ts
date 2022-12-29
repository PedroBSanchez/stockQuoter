import { InterfaceLogin } from "../interface/InterfaceUser";
import { UserRepository } from "../repository/UserRepository";
import Bcrypt from "bcrypt";

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

    return user;
  }
}

export { UserService };
