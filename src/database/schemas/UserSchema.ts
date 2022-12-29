import { model, Schema } from "mongoose";
import { User } from "../../models/User";
import Bcrypt from "bcrypt";

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    stocks: { type: [String], required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: "Users",
  }
);

UserSchema.pre("save", async function (next) {
  const hash = await Bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

const UsersModelo = model<User>("Users", UserSchema);

export { UsersModelo, UserSchema };
