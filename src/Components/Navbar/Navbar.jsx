import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <ul className="menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
        </li>
        <li>
          <NavLink to="/play" className={({ isActive }) => (isActive ? 'active' : '')}>Play Game</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
