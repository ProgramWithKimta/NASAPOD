import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import '../App.css'

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, getUsername } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Check if current path is login page (adjust if your login path is different)
  const isLoginPage = location.pathname === '/';

  return (
    <header className="header-name"> The NASAPOD

      {/* Only show menu if NOT on login page */}
      {!isLoginPage && (
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleMenu}>
            ☰ Menu ▼
          </button>

          {menuOpen && (
            <div className="dropdown-content">
              <span>{ getUsername() }</span>
              <Link to="/Home" onClick={toggleMenu}>Home</Link>
              <Link to="/Apod7day" onClick={toggleMenu}>7-Day Gallery</Link>
              <Link to="/Calendar" onClick={toggleMenu}>Calendar</Link>
              <Link to="/ApodRandom" onClick={toggleMenu}>Random Photo</Link>
              <Link to="/FavGallery" onClick={toggleMenu}>Favorites</Link>
              <Link to="/" onClick={() => { 
                logout();
                toggleMenu();
              }}>Logout</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;