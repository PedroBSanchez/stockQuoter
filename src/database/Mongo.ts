import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<any> => {
  await mongoose.connect(`stringConexao`, (error) => {
    if (error) {
      return console.log("Error to connect to database (MongoDB)\n" + error);
    }
    console.log("Connect to database (MongoDB)");
  });
};
