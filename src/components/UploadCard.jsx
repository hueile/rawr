import React, { useState } from "react";

function UploadCard({ onUpload }) {
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file extension
            if (!file.name.toLowerCase().endsWith(".cr2")) {
                setError("Only .cr2 files are allowed.");
                return;
            }
            setError(""); // Clear any previous errors
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
                    accept=".cr2"
                    onChange={handleFileChange}
                    className="hidden" // Hide the input field
                />
            </label>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default UploadCard;
