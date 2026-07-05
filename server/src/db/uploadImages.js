import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

import mongoose from "mongoose";
import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

import { Listing } from "../models/Listing.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await mongoose.connect(`${process.env.MONGODB_URI}`);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const mapping = [
  {
    slug: "golden-beach-resort",
    file: "Beach.jpg",
  },
  {
    slug: "skyline-executive-suites",
    file: "city-Skyline.jpg",
  },
  {
    slug: "metropolitan-grand-hotel",
    file: "cityHotel.jpg",
  },
  {
    slug: "cliffside-ocean-retreat",
    file: "cliff-ocean-resort.jpg",
  },
  {
    slug: "royal-desert-glamping-camp",
    file: "desertGlamping.jpg",
  },
  {
    slug: "whispering-forest-tree-house",
    file: "forestTreeHouse.jpg",
  },
  {
    slug: "royal-heritage-homestay",
    file: "heritageHomeStay.jpg",
  },
  {
    slug: "peaceful-lakeside-cottage",
    file: "lakeSideCottage.jpg",
  },
  {
    slug: "modern-skyline-penthouse",
    file: "modern-penthose.jpg",
  },
  {
    slug: "snow-peak-mountain-cabin",
    file: "mountain-cabin.jpg",
  },
  {
    slug: "private-island-paradise-villa",
    file: "privateIslandVilla.jpg",
  },
  {
    slug: "rainforest-resort-lodge",
    file: "resort-lodge.jpg",
  },
  {
    slug: "riverside-nature-lodge",
    file: "riverSlide-lodge.jpg",
  },
  {
    slug: "sunset-hill-retreat",
    file: "sunSetHill.jpg",
  },
  {
    slug: "tropical-infinity-pool-resort",
    file: "tropocal-pool-resort.jpg",
  },
];

for (const item of mapping) {
  const imagePath = path.join(__dirname, "../images", item.file);

  console.log("Uploading", item.file);

  const result = await cloudinary.v2.uploader.upload(imagePath, {
    folder: "travEase",
  });

  await Listing.findOneAndUpdate(
    {
      slug: item.slug,
    },
    {
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    },
  );

  console.log("Updated", item.slug);
}

console.log("Done ");

process.exit();
