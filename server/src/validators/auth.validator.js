import Joi from "joi";

export const registerValidator = Joi.object({
  fullName: Joi.string()

    .min(3)

    .required(),

  username: Joi.string()

    .min(3)

    .required(),

  email: Joi.string()

    .email()

    .required(),

  password: Joi.string()

    .min(6)

    .required(),

  phone: Joi.string()

    .allow("", null),

  role: Joi.string()

    .valid(
      "user",

      "owner",
    ),
});
