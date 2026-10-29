import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { selectTotalItems } from './redux/CartSlice';

const Navbar = () => {
  const totalItems = useSelector(selectTotalItems);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <span className="brand-icon">🌿</span>
          <div className="brand-text">
            <span className="brand-title">Paradise Nursery</span>
            <span className="brand-tagline">Where Greenery Meets Serenity</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/plants" className="nav-link nav-highlight">
            <Sparkles size={16} /> Plants
          </Link>
          <Link to="/cart" className="nav-cart-btn">
            <ShoppingBag size={20} />
            <span className="cart-text">Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
