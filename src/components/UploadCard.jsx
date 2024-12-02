import React from "react";

function UploadCard({ onUpload }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onUpload(file);
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
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" // Hide the input field
                />
            </label>
        </div>
    );
}

export default UploadCard;
