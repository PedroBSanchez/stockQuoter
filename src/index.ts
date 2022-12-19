import { config } from "dotenv";
import express from "express";
import { connectToDatabase } from "./database/Mongo";
import { userControllerRoutes } from "./controller/userController";

const main = async () => {
  config();
  console.log("Hello world!");

  const app = express();

  app.use(express.json());

  app.use("/users", userControllerRoutes);

  app.get("/", async (req, res) => {
    res.status(200).json("ok");
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
  await connectToDatabase();
};

main();
