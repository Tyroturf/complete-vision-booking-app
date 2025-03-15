import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const showNextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowRight") showNextImage();
        if (event.key === "ArrowLeft") showPrevImage();
        if (event.key === "Escape") closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div>
      {/* Image Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>

          <button
            className="absolute left-4 text-white text-3xl font-bold px-4 py-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-80"
            onClick={showPrevImage}
          >
            ◀
          </button>

          <img
            src={images[selectedIndex]}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            alt={`Image ${selectedIndex}`}
          />

          <button
            className="absolute right-4 text-white text-3xl font-bold px-4 py-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-80"
            onClick={showNextImage}
          >
            ▶
          </button>
        </div>
      )}

      <div className="lg:hidden w-80 md:w-5/6 mx-auto">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} onClick={() => setSelectedIndex(index)}>
              <img
                src={image}
                className="h-60 md:h-96 w-full object-cover object-center rounded-lg cursor-pointer"
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="hidden lg:block">
        <div className="flex my-2 md:px-2">
          <div className="w-1/2">
            <div className="m-2">
              <img
                src={images[0]}
                className="w-full h-[33rem] object-cover object-center rounded-lg mx-1 cursor-pointer"
                alt="Image 0"
                onClick={() => setSelectedIndex(0)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="m-2 flex">
              <img
                src={images[1]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1 cursor-pointer"
                alt="Image 1"
                onClick={() => setSelectedIndex(1)}
              />
              <img
                src={images[2]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1 cursor-pointer"
                alt="Image 2"
                onClick={() => setSelectedIndex(2)}
              />
            </div>
            <div className="m-2 flex">
              <img
                src={images[3]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1 cursor-pointer"
                alt="Image 3"
                onClick={() => setSelectedIndex(3)}
              />
              <img
                src={images[4]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1 cursor-pointer"
                alt="Image 4"
                onClick={() => setSelectedIndex(4)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
