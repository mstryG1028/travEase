import { body } from "express-validator";

export const createFlashbackValidator = [
  body("caption")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Caption cannot exceed 500 characters."),
];

export const updateFlashbackValidator = [
  body("caption")
    .trim()
    .notEmpty()
    .withMessage("Caption is required.")
    .isLength({ max: 500 })
    .withMessage("Caption cannot exceed 500 characters."),
];
