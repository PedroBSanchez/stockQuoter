import { NextFunction, Request, Response } from "express";
import Jwt, { decode } from "jsonwebtoken";

module.exports = (req: any, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  // Formato token JWT Bearer asdkfgaseçkf123123

  const parts = authHeader.split(" ");
  const amountParts = parts.length;

  if (amountParts != 2) return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!(scheme === "Bearer"))
    return res.status(401).send({ error: "Token malformatted" });

  Jwt.verify(
    token,
    "c6cb80d67cb540d698c2a3e7c54246ca",
    (err: any, decoded: any) => {
      if (err) return res.status(401).send({ error: "Token invalid" });

      req.userId = decoded.id;
      console.log(decoded.id);

      return next();
    }
  );
};
