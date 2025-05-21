import { Routes, Route } from 'react-router-dom';
// Importing page components
import Home from "./Home";
import Gallery from './Gallery';
import Ring from './Ring';
import MusicPlayer from './MusicPlayer';
import NavBar from './NavBar';

const App: React.FC = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/gallery" element={<Gallery />} />
      <Route path="/music" element={<MusicPlayer />} />
      <Route path="/ring" element={<Ring />} />
    </Routes>
    </>
  );
};
export default App;