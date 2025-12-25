import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ accent }) => {
  return (
    <header className="app-header" style={{ borderColor: accent }}>
      <div className="logo">Seasonal Gallery</div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/themes" className={({ isActive }) => (isActive ? 'active' : '')}>
          Themes
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>
          Gallery
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
