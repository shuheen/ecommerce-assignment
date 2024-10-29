import React, {useState} from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({images}: ProductGalleryProps) => {
  // State to hold the currently selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Handler to update the selected image
  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="min-h-[200px] lg:col-span-2 bg-gradient-to-tr from-[#daf8fd] via-[#acd6de] to-[#84c9d5] rounded-lg w-full top-0 text-center p-6">
      <img src={selectedImage} alt="Product" className="w-3/5 rounded object-cover mx-auto py-6" />
      {images.length > 1 && <hr className="border-white border my-6" />}
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center mx-auto">
        {images.slice(1).map((image, index) => (
          <div
            key={index}
            className="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-[#ffffff] p-3 rounded-lg cursor-pointer"
            onClick={() => handleThumbnailClick(image)} // Set the selected image on click
          >
            <img src={image} alt={`Product thumbnail ${index + 1}`} className="w-full h-full rounded-lg object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
