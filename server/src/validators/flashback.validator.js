import Joi from "joi";

export const flashbackValidator = Joi.object({
  booking: Joi.string().required(),

  caption: Joi.string().allow(""),

  visibility: Joi.string()

    .valid(
      "Public",

      "Private",
    ),
});
