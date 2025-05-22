import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from './config';
import { fetchAllPaginated } from './fetchAllPaginated';

interface Image {
  id: number;
  image: string; // URL
  title?: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchAllPaginated<Image>(`${API_BASE}/api/images/`);
        setImages(data);
      } catch (err) {
        setError('Failed to load images.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Gallery</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="rounded overflow-hidden shadow">
              <img src={img.image} alt={img.title || 'Uploaded image'} className="w-full h-48 object-cover" />
              {img.title && <div className="p-2 text-sm text-center">{img.title}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
