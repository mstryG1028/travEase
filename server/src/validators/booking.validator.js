import Joi from "joi";

export const bookingValidator = Joi.object({
  listing: Joi.string().required(),

  checkIn: Joi.date().required(),

  checkOut: Joi.date().greater(Joi.ref("checkIn")).required(),

  guests: Joi.number().min(1).required(),

  totalNights: Joi.number().min(1).required(),

  taxes: Joi.number().default(0),

  serviceFee: Joi.number().default(0),

  discount: Joi.number().default(0),

  totalAmount: Joi.number().required(),
});
