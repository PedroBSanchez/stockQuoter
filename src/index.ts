import { config } from "dotenv";
import express from "express";
import { connectToDatabase } from "./database/Mongo";

const main = async () => {
  console.log("Hello world!");

  const app = express();

  app.use(express.json());

  //await connectToDatabase();

  app.get("/", async (req, res) => {
    res.status(200).json("ok");
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
