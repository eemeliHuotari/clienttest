import { useState } from "react";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImages((prev) => [...prev, e.target.files![0]]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Gallery Upload</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(img)}
            alt={`img-${idx}`}
            className="w-32 h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
