import React, { useState } from "react";
import "./style.css"; // Import the CSS file

function ImageCard({ image, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false); // Separate hover state for the trash can

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleTrashEnter = () => setIsTrashHovered(true);
    const handleTrashLeave = () => setIsTrashHovered(false);

    return (
        <>
            {/* Main Grid Image */}
            <div
                className="image-card-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={image.url}
                    alt={image.key}
                    className="w-full h-full object-cover"
                />
                {/* Trash Can Icon */}
                <button
                    onClick={() => onDelete(image.key)}
                    className="trash-button"
                    onMouseEnter={handleTrashEnter} // Prevent pop-out when hovering trash can
                    onMouseLeave={handleTrashLeave}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13h6m2 0h1m-5-9V4m5 4v12a2 2 0 01-2 2H8a2 2 0 01-2-2V8m12-4H8m0 4H4"
                        />
                    </svg>
                </button>
            </div>

            {/* Pop-Out Full Image */}
            {isHovered && !isTrashHovered && ( // Show pop-out only if not hovering trash can
                <div className="pop-out-image-container">
                    <div className="pop-out-content">
                        <img
                            src={image.url}
                            alt={image.key}
                            className="object-contain"
                        />
                        {/* Tags Section */}
                        {image.tags && (
                            <div className="tags-container">
                                <h3 className="tags-title">Tags:</h3>
                                <ul className="tags-list">
                                    {Object.keys(image.tags).map((tag, index) => (
                                        <li key={index} className="tag-item">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageCard;
