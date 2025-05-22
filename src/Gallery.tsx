import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllPaginated } from './fetchAllPaginated';
import { API_BASE } from './config';

interface Image {
  id: number;
  image: string; // URL
  title?: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await fetchAllPaginated<Image>(`/api/images/`);
      setImages(data);
    } catch (err) {
      setError('Failed to load images.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file); // Assuming your backend expects 'image' field

    try {
      await axios.post(`${API_BASE}/upload/image/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      await loadImages(); // refresh gallery
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Gallery</h2>

      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Upload New Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="rounded overflow-hidden shadow">
              <img
                src={img.image}
                alt={img.title || 'Uploaded image'}
                className="w-full h-48 object-cover"
              />
              {img.title && <div className="p-2 text-sm text-center">{img.title}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
