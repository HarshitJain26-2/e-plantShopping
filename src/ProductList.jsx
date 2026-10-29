import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './redux/CartSlice';
import { plantsData } from './data/plants';
import Navbar from './Navbar';
import { Check, Plus, Sparkles, Filter } from 'lucide-react';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Set of plant IDs already in cart
  const cartItemIds = new Set(cartItems.map((item) => item.id));

  const categories = ['All', ...new Set(plantsData.map((p) => p.category))];

  const filteredPlants = selectedCategory === 'All'
    ? plantsData
    : plantsData.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Group plants by category for organized display when "All" is selected
  const displayedCategories = selectedCategory === 'All'
    ? [...new Set(plantsData.map((p) => p.category))]
    : [selectedCategory];

  return (
    <div className="product-list-page">
      <Navbar />

      <section className="catalog-hero">
        <div className="catalog-hero-content">
          <span className="hero-pill">
            <Sparkles size={16} /> Premium Botanical Collection
          </span>
          <h1>Explore Handcrafted Houseplants</h1>
          <p>
            Breathe cleaner air, cultivate serenity, and bring the soothing rhythm of nature into your home.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filters">
          <div className="filter-label">
            <Filter size={16} /> Filter by:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="catalog-container">
        {displayedCategories.map((category) => {
          const plantsInCategory = filteredPlants.filter((p) => p.category === category);
          if (plantsInCategory.length === 0) return null;

          return (
            <section key={category} className="category-section">
              <div className="category-header">
                <h2>{category}</h2>
                <span className="category-count">{plantsInCategory.length} Plants Available</span>
              </div>

              <div className="plants-grid">
                {plantsInCategory.map((plant) => {
                  const isAdded = cartItemIds.has(plant.id);

                  return (
                    <div key={plant.id} className="plant-card">
                      <div className="plant-image-wrapper">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="plant-image"
                          loading="lazy"
                        />
                        <span className="plant-category-badge">{plant.category.split(' ')[0]}</span>
                      </div>

                      <div className="plant-info">
                        <div className="plant-title-row">
                          <h3 className="plant-name">{plant.name}</h3>
                          <span className="plant-price">₹{plant.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="plant-desc">{plant.description}</p>

                        <button
                          type="button"
                          className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={isAdded}
                        >
                          {isAdded ? (
                            <>
                              <Check size={18} /> Added to Cart
                            </>
                          ) : (
                            <>
                              <Plus size={18} /> Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default ProductList;
