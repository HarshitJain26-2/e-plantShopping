import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice';
import { plantsArray as importedPlantsArray } from './data/plants';
import Navbar from './Navbar';
import CartItem from './CartItem';
import { Check, Plus, Sparkles, Filter } from 'lucide-react';

export const plantsArray = importedPlantsArray;

const ProductList = ({ onNavigateHome }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // addedToCart state object keyed by plant name as requested in rubric Step 8B
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sync addedToCart with cartItems from Redux state
  const isPlantInCart = (plantName) => {
    return Boolean(addedToCart[plantName] || cartItems.some((item) => item.name === plantName));
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  // If showCart is toggled, render CartItem view
  if (showCart) {
    return (
      <CartItem
        onContinueShopping={() => setShowCart(false)}
        onNavigateHome={onNavigateHome}
        onNavigatePlants={() => setShowCart(false)}
      />
    );
  }

  const categoryNames = ['All', ...plantsArray.map((group) => group.category)];

  const displayedGroups = selectedCategory === 'All'
    ? plantsArray
    : plantsArray.filter((group) => group.category === selectedCategory);

  return (
    <div className="product-list-page">
      <Navbar
        currentPage="plants"
        onNavigateHome={onNavigateHome}
        onNavigatePlants={() => setShowCart(false)}
        onNavigateCart={() => setShowCart(true)}
      />

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
          {categoryNames.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="catalog-container">
        {displayedGroups.map((group) => (
          <section key={group.category} className="category-section">
            <div className="category-header">
              <h2>{group.category}</h2>
              <span className="category-count">{group.plants.length} Plants Available</span>
            </div>

            <div className="plants-grid">
              {group.plants.map((plant) => {
                const isAdded = isPlantInCart(plant.name);

                return (
                  <div key={plant.id || plant.name} className="plant-card">
                    <div className="plant-image-wrapper">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="plant-image"
                        loading="lazy"
                      />
                      <span className="plant-category-badge">{group.category.split(' ')[0]}</span>
                    </div>

                    <div className="plant-info">
                      <div className="plant-title-row">
                        <h3 className="plant-name">{plant.name}</h3>
                        <span className="plant-price">₹{plant.cost || plant.price}</span>
                      </div>
                      <p className="plant-desc">{plant.description}</p>

                      <button
                        type="button"
                        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddToCart({ ...plant, category: group.category })}
                        disabled={addedToCart[plant.name] || isAdded}
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
        ))}
      </main>
    </div>
  );
};

export default ProductList;
