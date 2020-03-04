import React from 'react';
import './NavBar.css'

const NavBar = ({handleSort}) => {

  return (
    <div className="navbar">
      <div className='content'>
        <div className="brand">
          <h2>AsciiFaces</h2>
        </div>
        <ul className="links">
          <li onClick={() => handleSort('id')}>id</li>
          <li onClick={() => handleSort('price')}>price</li>
          <li onClick={() => handleSort('size')}>size</li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar;
