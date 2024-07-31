import React from "react";
import Slider from "react-slick";

const ImageGallery = ({ images }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Slider for Mobile Screens */}
      <div className="lg:hidden w-80 md:w-5/6 mx-auto">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                className="h-60 md:h-96 w-full object-cover object-center rounded-lg"
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Static Gallery for Larger Screens */}
      <div className="hidden lg:block">
        <div className="flex my-2 md:px-2">
          <div className="w-1/2">
            <div className="m-2">
              <img
                src={images[0]}
                className="w-full h-[33rem] object-cover object-center rounded-lg mx-1"
                alt={`Image 0`}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="m-2 flex">
              <img
                src={images[1]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1"
                alt={`Image 1`}
              />
              <img
                src={images[2]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1"
                alt={`Image 2`}
              />
            </div>
            <div className="m-2 flex">
              <img
                src={images[3]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1"
                alt={`Image 3`}
              />
              <img
                src={images[4]}
                className="w-1/2 h-64 object-cover object-center rounded-lg mx-1"
                alt={`Image 4`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
