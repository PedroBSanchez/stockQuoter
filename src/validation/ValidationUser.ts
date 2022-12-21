import Joi from "joi";
import { User } from "../models/User";

class ValidationUser {
  public validation(res: User) {
    const objectValidation = Joi.object({
      email: Joi.string().required().messages({
        "string.base": "Email should be string",
        "string.empty": "Email should not be null",
        "any.required": "Email is required",
      }),
      password: Joi.string().required().messages({
        "string.base": "Password should be string",
        "string.empty": "Password should not be null",
        "any.required": "Password is required",
      }),
      stocks: Joi.optional(),
    });
    return objectValidation.validate(res);
  }
}

export { ValidationUser };
