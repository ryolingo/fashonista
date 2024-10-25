// components/ImageGrid.tsx
import { useState, useEffect } from 'react';
import { fetchImages } from '../utils/fetchImages';

type ImageType = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
};

const ImageGrid = ({ searchTerm }: { searchTerm: string }) => {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    if (searchTerm) {
      fetchImages(searchTerm).then((results) => setImages(results));
    }
  }, [searchTerm]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="shadow-lg rounded">
          <img src={image.urls.small} alt={image.alt_description} className="w-full h-auto rounded" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
