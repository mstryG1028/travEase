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

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    // Future AI Features
    aiTags: [
      {
        type: String,
        trim: true,
      },
    ],

    aiDescription: {
      type: String,
      default: "",
      trim: true,
    },

    // Useful for AI collage generation
    width: {
      type: Number,
      default: null,
    },

    height: {
      type: Number,
      default: null,
    },

    // Video duration in seconds
    duration: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true,
  },
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
          return value.length > 0 && value.length <= 50;
        },

        message: "A memory must contain between 1 and 50 media files.",
      },
    },

    // Stores the _id of the media selected as cover
    coverMedia: {
      type: Schema.Types.ObjectId,
      default: null,
    },

    // Future AI Story
    aiRecap: {
      text: {
        type: String,
        default: "",
      },
      size: {
        type: Number,
        default: 0,
      },

      format: {
        type: String,
        default: "",
      },

      generatedAt: {
        type: Date,
        default: null,
      },
    },

    // Future AI Collage
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

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

memorySchema.index({
  user: 1,
  booking: 1,
});

memorySchema.index({
  user: 1,
  listing: 1,
});

memorySchema.index({
  user: 1,
  createdAt: -1,
});

/*
|--------------------------------------------------------------------------
| Virtual Cover Image
|--------------------------------------------------------------------------
*/

memorySchema.virtual("cover").get(function () {
  if (!this.media.length) return null;

  if (!this.coverMedia) {
    return this.media[0];
  }

  return (
    this.media.find(
      (item) => item._id.toString() === this.coverMedia.toString(),
    ) || this.media[0]
  );
});

memorySchema.set("toJSON", {
  virtuals: true,
});

memorySchema.set("toObject", {
  virtuals: true,
});

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/
memorySchema.pre("save", async function () {
  if (!this.media.length) {
    throw new Error("At least one media file is required.");
  }

  if (
    this.coverMedia &&
    !this.media.some(
      (item) => item._id.toString() === this.coverMedia.toString(),
    )
  ) {
    this.coverMedia = this.media[0]._id;
  }

  if (!this.coverMedia && this.media.length) {
    this.coverMedia = this.media[0]._id;
  }
});

export const Memory = mongoose.model("Memory", memorySchema);
