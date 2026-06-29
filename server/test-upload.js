import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Time:", Math.floor(Date.now() / 1000));

try {
  console.log(await cloudinary.api.ping());

  const result = await cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  );

  console.log(result);
} catch (e) {
  console.dir(e, { depth: null });
}