import React, { useEffect } from "react";
import "./style.css";
import particleImage from "../assets/rawr_particle.png"; // Import the particle image

const FallingParticles = () => {
    useEffect(() => {
        console.log("FallingParticles component mounted!");
        const particleContainer = document.querySelector(".falling-particles");
        const animationDuration = 10; // Duration of animation in seconds

        function createParticle() {
            const particle = document.createElement("div");
            const randomRotation = Math.random() * 360; // Random angle between 0 and 360 degrees
            console.log(`Particle starts with rotation: ${randomRotation} degrees`);

            particle.classList.add("particle");

            // Randomize properties
            particle.style.left = `${Math.random() * 100}vw`; // Random horizontal position
            particle.style.animationDuration = `${Math.random() * animationDuration + 5}s`; // 5-15 seconds
            particle.style.width = `${Math.random() * 20 + 30}px`; // Random size between 30px and 50px
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.8 + 0.2; // Random opacity

            // Apply rotation as a CSS variable
            particle.style.setProperty("--rotation", `${randomRotation}deg`);

            // Add the background image
            particle.style.backgroundImage = `url(${particleImage})`;
            particle.style.backgroundSize = "cover"; // Ensure the image covers the box
            particle.style.backgroundRepeat = "no-repeat"; // Prevent image repetition

            particleContainer.appendChild(particle);

            // Remove particle after animation
            particle.addEventListener("animationend", () => {
                particleContainer.removeChild(particle);
            });
        }

        // Create particles at intervals
        const interval = setInterval(createParticle, 2000); // Create a particle every 100ms

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, []);

    return <div className="falling-particles"></div>;
};

export default FallingParticles;
