import { useState } from "react";

interface Track {
  file: File;
  name: string;
}

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTracks((prev) => [...prev, { file, name: file.name }]);
    }
  };

  const renameTrack = (index: number, newName: string) => {
    const updated = [...tracks];
    updated[index].name = newName;
    setTracks(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Music Upload</h2>
      <input type="file" accept="audio/mp3" onChange={handleUpload} />
      <div className="mt-4 space-y-4">
        {tracks.map((track, idx) => (
          <div key={idx}>
            <audio controls src={URL.createObjectURL(track.file)} />
            <input
              type="text"
              value={track.name}
              onChange={(e) => renameTrack(idx, e.target.value)}
              className="ml-2 p-1 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;