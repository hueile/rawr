import React from "react";
import ImageGallery from "./components/ImageGallery";
import Banner from "./components/Banner";
import FallingParticles from "./components/FallingParticles";

const App = () => {
    return (
        <div className="min-h-screen relative">
            {/* Falling particles in the background */}
            <FallingParticles />
            {/* Main content */}
            <Banner />
            <main>
                <ImageGallery />
            </main>
        </div>
    );
};

export default App;
