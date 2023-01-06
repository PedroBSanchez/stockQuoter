import { config } from "dotenv";
import express from "express";
import { connectToDatabase } from "./database/Mongo";
import { userControllerRoutes } from "./controller/userController";
import { testControllerRoutes } from "./controller/testController";
const cors = require("cors");

const main = async () => {
  config();
  console.log("Hello world!");

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/api/users", userControllerRoutes);
  app.use("/api/test", testControllerRoutes);

  app.get("/", async (req, res) => {
    res.status(200).json("ok");
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
  await connectToDatabase();
};

main();
