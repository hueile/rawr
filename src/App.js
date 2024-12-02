import React from "react";
import ImageGallery from "./components/ImageGallery";
import Banner from "./components/Banner";

const App = () => {
    return (
        <div className="min-h-screen">
            <Banner />
            <main>
                <ImageGallery />
            </main>
        </div>
    );
};

export default App;
