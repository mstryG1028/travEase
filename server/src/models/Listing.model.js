import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    // Owner of the property
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    propertyType: {
      type: String,
      enum: [
        "Hotel",
        "Villa",
        "Resort",
        "Apartment",
        "Hostel",
        "Homestay",
        "Cottage",
      ],
      required: true,
    },

    // Location
    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    zipCode: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    // Images
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    // Capacity
    guests: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 1,
    },

    beds: {
      type: Number,
      default: 1,
    },

    bathrooms: {
      type: Number,
      default: 1,
    },

    // Amenities
    amenities: [
      {
        type: String,
      },
    ],

    // Pricing
    basePrice: {
      type: Number,
      required: true,
    },

    currentPrice: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // Availability
    isAvailable: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Maintenance"],
      default: "Active",
    },

    // Contact Person
    contactPerson: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    // Analytics
    totalViews: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // Weather Cache
    weather: {
      temperature: Number,
      humidity: Number,
      condition: String,
      updatedAt: Date,
    },

    // AI Suggestions
    aiSuggestions: [
      {
        type: String,
      },
    ],
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Number,
      default: 0,
    },

    trendingScore: {
      type: Number,
      default: 0,
    },

    // Tags
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

listingSchema.index({
  title: "text",

  description: "text",

  city: "text",

  country: "text",
});


listingSchema.index({
  city: 1,

  propertyType: 1,

  currentPrice: 1,
});

listingSchema.virtual("reviewCount", {
  ref: "Review",

  localField: "_id",

  foreignField: "listing",

  count: true,
});

listingSchema.set("toObject", {
  virtuals: true,
});

listingSchema.set("toJSON", {
  virtuals: true,
});

// GeoSpatial Index
listingSchema.index({
  location: "2dsphere",
});

export const Listing = mongoose.model("Listing", listingSchema);
