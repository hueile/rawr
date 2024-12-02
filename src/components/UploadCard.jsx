import React, { useState } from "react";
import { getUploadUrl } from "./api"; // Adjust the path to your API file

function UploadCard({ onUpload }) {
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    const resetProgress = () => {
        // Reset the progress bar after a short delay
        setTimeout(() => {
            document.documentElement.style.setProperty("--upload-progress", `0%`);
        }, 500);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.name.toLowerCase().endsWith(".cr2")) {
                setError("Only .cr2 files are allowed.");
                return;
            }

            setError("");
            setUploading(true);

            try {
                const uploadUrl = await getUploadUrl(file.name, file.type);

                // Create a request to monitor progress
                const xhr = new XMLHttpRequest();
                xhr.open("PUT", uploadUrl, true);
                xhr.setRequestHeader("Content-Type", file.type);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = (event.loaded / event.total) * 100;
                        // Update CSS variable for upload progress
                        document.documentElement.style.setProperty("--upload-progress", `${progress}%`);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        onUpload(file); // Notify the parent component
                        document.documentElement.style.setProperty("--upload-progress", `100%`);
                        resetProgress(); // Reset progress bar
                    } else {
                        setError(`Upload failed: ${xhr.statusText}`);
                    }
                    setUploading(false);
                };

                xhr.onerror = () => {
                    setError("An error occurred during the upload.");
                    setUploading(false);
                    resetProgress(); // Ensure progress is reset on error
                };

                xhr.send(file);
            } catch (error) {
                setError(`Upload failed: ${error.message}`);
                setUploading(false);
                resetProgress(); // Ensure progress is reset on error
            }
        }
    };

    return (
        <div className="upload-card-container">
            <label htmlFor="upload-input" className="upload-card">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="upload-icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                <input
                    id="upload-input"
                    type="file"
                    accept=".cr2"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default UploadCard;
