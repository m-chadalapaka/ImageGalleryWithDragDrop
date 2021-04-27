import React from "react";

// Utility function to display the images fetched from giphy api in a gallery

function ImageGallery(gifs) {
  const images = gifs.images;

  return (
    <div style={{position:"relative"}}>
      {images.length > 0 &&
        images.map((img) => (
          <span key={img.id}>
            <img
              src={img.images.original.url}
              alt={img.id}
              style={{ width: 200, height:100, margin:5 }}
            />
          </span>
        ))}
    </div>

  );
}

export default ImageGallery;
