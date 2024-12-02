const DELETE_URL = "https://6kc147sjqa.execute-api.us-east-2.amazonaws.com";
const GET_URL = "https://9dem25e21h.execute-api.us-east-2.amazonaws.com";
const UPLOAD_API_URL = "https://7oycugxpui.execute-api.us-east-2.amazonaws.com";
// Fetch images from the backend
export async function getImages() {
    try {
        const response = await fetch(`${GET_URL}/get-images`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Images:", data); // Debugging log
        return data;
    } catch (error) {
        console.error("Error fetching images:", error.message);
        throw error;
    }
}


// Delete image via the backend
export async function deleteImage(imageKey) {
    const response = await fetch(`${DELETE_URL}/delete-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageKey }),
    });

    // Check response type and handle plain text
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
        throw new Error("Failed to delete image");
    }

    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data.message; // Return the message from the JSON
    } else {
        const text = await response.text();
        return text; // Return plain text as fallback
    }
}

 
export async function getUploadUrl(fileName, fileType) {
    try {
        const response = await fetch(UPLOAD_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName, fileType }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch upload URL: ${response.status}`);
        }

        const data = await response.json();
        return data.uploadUrl; // Ensure this matches your Lambda response
    } catch (error) {
        console.error("Error fetching upload URL:", error);
        throw error;
    }
}


