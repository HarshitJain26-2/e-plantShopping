import React from 'react';
import { useSelector } from 'react-redux';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { selectTotalItems } from './CartSlice';

const Navbar = ({ onNavigateHome, onNavigatePlants, onNavigateCart, currentPage = 'plants' }) => {
  const totalItems = useSelector(selectTotalItems);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = '#/';
    }
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    if (onNavigatePlants) {
      onNavigatePlants();
    } else {
      window.location.hash = '#/plants';
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (onNavigateCart) {
      onNavigateCart();
    } else {
      window.location.hash = '#/cart';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#/" onClick={handleHomeClick} className="brand-logo">
          <span className="brand-icon">🌿</span>
          <div className="brand-text">
            <span className="brand-title">Paradise Nursery</span>
            <span className="brand-tagline">Where Greenery Meets Serenity</span>
          </div>
        </a>

        <nav className="nav-links">
          <a
            href="#/"
            onClick={handleHomeClick}
            className={`nav-link ${currentPage === 'home' ? 'nav-highlight' : ''}`}
          >
            Home
          </a>
          <a
            href="#/plants"
            onClick={handlePlantsClick}
            className={`nav-link ${currentPage === 'plants' ? 'nav-highlight' : ''}`}
          >
            <Sparkles size={16} /> Plants
          </a>
          <a
            href="#/cart"
            onClick={handleCartClick}
            className="nav-cart-btn"
          >
            <ShoppingBag size={20} />
            <span className="cart-text">Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
