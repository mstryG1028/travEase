import Joi from "joi";

export const listingValidator = Joi.object({
  title: Joi.string()

    .required(),

  description: Joi.string()

    .required(),

  propertyType: Joi.string()

    .required(),

  city: Joi.string()

    .required(),

  state: Joi.string()

    .required(),

  country: Joi.string()

    .required(),

  address: Joi.string()

    .required(),

  guests: Joi.number()

    .required(),

  bedrooms: Joi.number(),

  bathrooms: Joi.number(),

  beds: Joi.number(),

  basePrice: Joi.number()

    .required(),

  currentPrice: Joi.number()

    .required(),
});
