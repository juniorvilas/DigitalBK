import "./gallery.sass";
import React from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Gallery = ({ close, imagesApi }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImageHandler = () => {
    if (currentImage === 0) {
      setCurrentImage(imagesApi.length - 1);
    } else {
      setCurrentImage((prevState) => prevState - 1);
    }
  };
  const nextImageHandler = () => {
    if (currentImage === imagesApi.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prevState) => prevState + 1);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery">
        <div className="gallery__thumbnail">
          <img src={imagesApi ? imagesApi[currentImage].url : ""} />
          <button className="gallery__btn gallery__close" onClick={close}>
            X
          </button>
          <button
            className="gallery__btn gallery__previous"
            onClick={previousImageHandler}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="gallery__btn gallery__next"
            onClick={nextImageHandler}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="gallery__position">
          {currentImage + 1}/{imagesApi ? imagesApi.length : ""}
        </div>
        <div className="gallery__scroll">
          {imagesApi.map((img, index) => {
            return (
              <img
                src={img.url}
                onClick={() => {
                  setCurrentImage(index);
                }}
                className={`${currentImage === index ? "selected" : ""}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// export default Gallery;
