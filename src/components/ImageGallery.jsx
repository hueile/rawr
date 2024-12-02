import React, { useEffect, useState } from "react";
import { getImages, deleteImage, getUploadUrl } from "./api";
import ImageCard from "./ImageCard";
import UploadCard from "./UploadCard";
import "./style.css";

function ImageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            const fetchedImages = await getImages();
            setImages(fetchedImages);
        }
        fetchImages();
    }, []);

    const handleUpload = async (file) => {
        try {
            const uploadUrl = await getUploadUrl(file.name, file.type);
            await fetch(uploadUrl, {
                method: "PUT",
                body: file,
            });
            // Refetch images after upload
            const updatedImages = await getImages();
            setImages(updatedImages);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleDelete = async (imageKey) => {
        try {
            await deleteImage(imageKey);
            setImages((prevImages) => prevImages.filter((image) => image.key !== imageKey));
        } catch (error) {
            console.error("Error deleting the image:", error);
        }
    };

    return (
        <div className="image-gallery">
            {/* Render Image Cards */}
            {images.map((image) => (
                <ImageCard key={image.key} image={image} onDelete={handleDelete} />
            ))}

            {/* Upload Card at the end */}
            <UploadCard onUpload={handleUpload} />
        </div>
    );
}

export default ImageGallery;
