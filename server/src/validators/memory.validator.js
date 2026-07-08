import Joi from "joi";

export const createMemoryValidator = Joi.object({
  title: Joi.string().trim().max(80).allow("").optional(),

  caption: Joi.string().trim().max(500).allow("").optional(),
});

export const updateMemoryValidator = Joi.object({
  title: Joi.string().trim().max(80).allow("").optional(),

  caption: Joi.string().trim().max(500).allow("").optional(),
});

export const updateCoverValidator = Joi.object({
  mediaId: Joi.string().required().messages({
    "any.required": "Media ID is required.",
    "string.empty": "Media ID is required.",
  }),
});
