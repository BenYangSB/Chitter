import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Chitter</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Recipies</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create new Recipe</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user/discover" className="nav-link">Discover Other Chefs</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user/trending" className="nav-link">Trending</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}