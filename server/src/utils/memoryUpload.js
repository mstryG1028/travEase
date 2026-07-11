import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// ===========================================
// Upload Memory Media
// ===========================================

export const uploadMemoryMedia = async (files = []) => {
  const uploaded = [];

  try {
    for (const file of files) {
      const resourceType = file.mimetype.startsWith("video")
        ? "video"
        : "image";

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "travEase/memories",
        resource_type: resourceType,
      });

      uploaded.push({
        url: result.secure_url,
        public_id: result.public_id,
        type: resourceType,
        width: result.width || null,
        height: result.height || null,
        duration: result.duration || 0,
        uploadedAt: new Date(),
      });

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    return uploaded;
  } catch (error) {
    for (const file of files) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    // Rollback uploaded files
    for (const media of uploaded) {
      try {
        await cloudinary.uploader.destroy(media.public_id, {
          resource_type: media.type,
        });
      } catch (_) {}
    }

    throw error;
  }
};

// ===========================================
// Delete Memory Media
// ===========================================

export const deleteMemoryMedia = async (media = []) => {
  if (!media.length) return;

  await Promise.all(
    media.map(async (item) => {
      if (!item.public_id) return;

      try {
        await cloudinary.uploader.destroy(item.public_id, {
          resource_type: item.type || "image",
        });
      } catch (err) {
        console.error("Failed to delete media:", item.public_id);
      }
    }),
  );
};

// ===========================================
// Upload Additional Media
// ===========================================

export const uploadAdditionalMedia = async (files = []) => {
  return uploadMemoryMedia(files);
};
