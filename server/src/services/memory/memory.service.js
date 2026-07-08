import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const uploadMemoryMedia = async (files = []) => {
  const uploadedMedia = [];

  try {
    for (const file of files) {
      const resourceType = file.mimetype.startsWith("video")
        ? "video"
        : "image";

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "travEase/memories",
        resource_type: resourceType,
      });

      uploadedMedia.push({
        url: result.secure_url,
        public_id: result.public_id,
        type: resourceType,
        width: result.width || 0,
        height: result.height || 0,
        duration: result.duration || 0,
        size: result.bytes || 0,
        format: result.format || "",
      });

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    return uploadedMedia;
  } catch (error) {
    files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    throw error;
  }
};

export const deleteMemoryMedia = async (media = []) => {
  for (const item of media) {
    await cloudinary.uploader.destroy(item.public_id, {
      resource_type: item.type,
    });
  }
};

export const uploadAdditionalMedia = async (files = []) => {
  return uploadMemoryMedia(files);
};
