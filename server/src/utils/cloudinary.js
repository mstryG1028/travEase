import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadOnCloudinary = async (localFilePath) => {

    try {

        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "image"
            }
        );

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {

        if (localFilePath && fs.existsSync(localFilePath)) {

            fs.unlinkSync(localFilePath);

        }

        return null;

    }

};

export const deleteFromCloudinary = async (public_id) => {

    if (!public_id) return;

    await cloudinary.uploader.destroy(public_id);

};