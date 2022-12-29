import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";

export const connectToDatabase = async (): Promise<any> => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mydatabase.ebbwo63.mongodb.net/?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        return console.log("Error to connect to database (MongoDB)\n" + error);
      }
      return console.log(" ## Connect to database (MongoDB) ##");
    }
  );
};
