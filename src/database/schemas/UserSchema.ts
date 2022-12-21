import { model, Schema } from "mongoose";
import { User } from "../../models/User";

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    stocks: { type: [String], required: true },
  },
  {
    collection: "Users",
  }
);

const UsersModelo = model<User>("Users", UserSchema);

export { UsersModelo, UserSchema };
