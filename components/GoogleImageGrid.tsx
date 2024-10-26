// components/GoogleImageGrid.tsx
import { useState, useEffect } from 'react';
import { fetchGoogleImages } from '../utils/fetchGoogleImages';

type ImageType = {
  link: string;
  title: string;
};

const GoogleImageGrid = ({ searchTerm }: { searchTerm: string }) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm) {
      fetchGoogleImages(searchTerm)
        .then((results) => setImages(results))
        .catch((err) => setError(err.message));
    }
  }, [searchTerm]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.link} className="shadow-lg rounded">
          <img src={image.link} alt={image.title} className="w-full h-auto rounded" />
        </div>
      ))}
    </div>
  );
};

export default GoogleImageGrid;
