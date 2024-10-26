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
    <div className="flex justify-between bg-black p-4">
      {images.map((image) => (
        <div key={image.link} className="w-1/3 bg-gray-200 rounded-lg overflow-hidden mx-2">
          <img src={image.link} alt={image.title} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default GoogleImageGrid;
