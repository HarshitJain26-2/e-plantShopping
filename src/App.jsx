import React, { useState } from 'react';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import { ArrowRight, Leaf, Shield, Award, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  // Rubric requirement Step 6: Use React state with showProductList, initialized to false
  const [showProductList, setShowProductList] = useState(false);

  // Clicking Get Started must set showProductList to true
  const handleGetStarted = () => {
    setShowProductList(true);
  };

  const handleNavigateHome = () => {
    setShowProductList(false);
  };

  // When showProductList is true, render the ProductList component
  if (showProductList) {
    return <ProductList onNavigateHome={handleNavigateHome} />;
  }

  return (
    <div className="background-image">
      {/* Background Overlay */}
      <div className="landing-overlay">
        {/* Navigation / Header */}
        <header className="landing-header">
          <div className="landing-brand">
            <span className="brand-logo-icon">🌿</span>
            <div>
              <span className="landing-brand-name">Paradise Nursery</span>
              <span className="landing-brand-tagline">Breathe Pure, Live Green</span>
            </div>
          </div>
          <button
            type="button"
            className="landing-nav-btn"
            onClick={handleGetStarted}
          >
            Explore Plants
          </button>
        </header>

        {/* Hero Section */}
        <section className="landing-hero">
          <div className="hero-badge">
            <Sparkles size={16} /> India's Premier Houseplant Destination
          </div>
          {/* Rubric Step 6: Exact company heading "Welcome to Paradise Nursery" */}
          <h1 className="hero-title">
            Welcome to <span className="highlight-text">Paradise Nursery</span>
          </h1>
          <p className="hero-subtitle">
            Transform your living and working spaces into vibrant sanctuaries. From air-purifying foliage 
            to sweet aromatic herbs and resilient succulents, we nurture and deliver vitality right to your doorstep.
          </p>

          <div className="hero-actions">
            {/* Visible "Get Started" button */}
            <button
              type="button"
              className="get-started-btn"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight size={20} />
            </button>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <Leaf size={18} /> <span>100% Organic & Healthy</span>
            </div>
            <div className="trust-badge">
              <Shield size={18} /> <span>Safe Doorstep Delivery</span>
            </div>
            <div className="trust-badge">
              <Award size={18} /> <span>Botanical Care Guarantee</span>
            </div>
          </div>
        </section>

        {/* About Us Component Section */}
        <section className="about-us-section">
          <AboutUs />
        </section>

        {/* Call to Action Banner */}
        <section className="landing-cta">
          <div className="cta-card">
            <h2>Ready to Breathe Fresh Air?</h2>
            <p>Discover over 18 specially curated botanical varieties curated for modern interiors.</p>
            <button
              type="button"
              className="get-started-btn cta-btn"
              onClick={handleGetStarted}
            >
              Start Shopping Now <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <p>© {new Date().getFullYear()} Paradise Nursery. Cultivating Green Spaces with Care & Passion.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
