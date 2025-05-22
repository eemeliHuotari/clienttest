iimport React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllPaginated } from './fetchAllPaginated';
import { API_BASE } from './config';

interface Track {
  id: number;
  title: string;
  artist: string;
  audio_file: string;
}

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setLoading(true);
    try {
      const data = await fetchAllPaginated<Track>(`/api/audios/`);
      setTracks(data);
    } catch (err) {
      setError('Failed to load music.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('audio', file); // assuming 'audio' is the field expected by your Django view

    try {
      await axios.post(`${API_BASE}/upload/audio/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      await loadTracks(); // refresh list
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Audio upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Music Player</h2>

      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Upload New Track</h3>
        <input
          type="file"
          accept="audio/*"
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
        <>
          <ul className="mb-4 space-y-2">
            {tracks.map((track) => (
              <li key={track.id} className="flex justify-between items-center border p-2 rounded shadow">
                <span>
                  {track.artist} - <strong>{track.title}</strong>
                </span>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setCurrentTrack(track)}
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
          {currentTrack && (
            <div className="mt-6">
              <p className="text-center font-semibold mb-2">
                Now Playing: {currentTrack.artist} - {currentTrack.title}
              </p>
              <audio controls autoPlay className="w-full">
                <source src={currentTrack.audio_file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
