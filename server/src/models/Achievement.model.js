import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    badge: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "🏆",
    },

    points: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  },
);

achievementSchema.index(
  {
    user: 1,
    badge: 1,
  },
  {
    unique: true,
  },
);

export const Achievement = mongoose.model(
  "Achievement",

  achievementSchema,
);
