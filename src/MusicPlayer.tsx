import React, { useEffect, useState } from 'react';
import { fetchAllPaginated } from './fetchAllPaginated';

interface Track {
  id: number;
  title: string;
  artist: string;
  audio_file: string; // URL
}

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    const loadTracks = async () => {
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

    loadTracks();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Music Player</h2>
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
              <p className="text-center font-semibold mb-2">Now Playing: {currentTrack.artist} - {currentTrack.title}</p>
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
