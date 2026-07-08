import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    public_id: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    width: {
      type: Number,
      default: 0,
    },

    height: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 0,
    },

    size: {
      type: Number,
      default: 0,
    },

    format: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const memorySchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      index: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Snapshot of trip details
    trip: {
      listingTitle: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "",
      },

      checkIn: {
        type: Date,
        required: true,
      },

      checkOut: {
        type: Date,
        required: true,
      },
    },

    title: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    media: {
      type: [mediaSchema],
      validate: {
        validator(value) {
          return value.length > 0;
        },
        message: "Please upload at least one image or video.",
      },
    },

    coverMedia: {
      type: Number,
      default: 0,
      min: 0,
    },

    aiRecap: {
      text: {
        type: String,
        default: "",
      },

      generatedAt: {
        type: Date,
        default: null,
      },
    },

    aiCollage: {
      url: {
        type: String,
        default: "",
      },

      public_id: {
        type: String,
        default: "",
      },

      generatedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

memorySchema.index({
  booking: 1,
  createdAt: -1,
});

memorySchema.index({
  user: 1,
  createdAt: -1,
});

export const Memory = mongoose.model("Memory", memorySchema);
