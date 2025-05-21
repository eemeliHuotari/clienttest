import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="p-4 bg-pink-200 flex gap-4 justify-center">
      <Link to="/" className="text-lg font-semibold">Home</Link>
      <Link to="/gallery" className="text-lg font-semibold">Gallery</Link>
      <Link to="/music" className="text-lg font-semibold">Music</Link>
      <Link to="/ring" className="text-lg font-semibold">💍</Link>
    </nav>
  );
};

export default NavBar;