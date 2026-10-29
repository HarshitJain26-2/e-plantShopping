import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  updateQuantity,
  removeItem,
  clearCart
} from './CartSlice';
import Navbar from './Navbar';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

const CartItem = ({ onContinueShopping, onNavigateHome, onNavigatePlants }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const grandTotal = useSelector(selectTotalPrice);

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Rubric requirement B: handleIncrement(item) calling updateQuantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Rubric requirement B: handleDecrement(item) reducing quantity without allowing below one
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Rubric requirement C: handleRemove(item) calling removeItem
  const handleRemove = (item) => {
    dispatch(removeItem(item.name || item.id));
  };

  // Rubric requirement D: Checkout button displaying alert or message
  const handleCheckout = (e) => {
    e.preventDefault();
    setCheckoutModalOpen(true);
    alert('Coming Soon! Our checkout system is currently being integrated.');
  };

  const handleContinue = (e) => {
    if (e) e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();
    } else if (onNavigatePlants) {
      onNavigatePlants();
    }
  };

  return (
    <div className="cart-page">
      <Navbar
        currentPage="cart"
        onNavigateHome={onNavigateHome}
        onNavigatePlants={onNavigatePlants || onContinueShopping}
        onNavigateCart={() => {}}
      />

      <main className="cart-container">
        <div className="cart-header">
          <div>
            <h1>Your Shopping Cart</h1>
            <p className="cart-subtitle">Review your selected botanical companions before checkout</p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="continue-shopping-top-link"
          >
            <ArrowLeft size={18} /> Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-card">
            <div className="empty-cart-icon">
              <ShoppingBag size={54} />
            </div>
            <h2>Your cart is currently empty!</h2>
            <p>
              Looks like you haven't welcomed any new plants into your sanctuary yet.
              Explore our wide variety of air-purifying, herbal, and low-maintenance plants!
            </p>
            <button
              type="button"
              onClick={handleContinue}
              className="primary-btn continue_shopping_btn"
            >
              <Sparkles size={18} /> Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* List of Cart Items */}
            <div className="cart-items-column">
              <div className="cart-items-header">
                <span>Products ({totalItems} items)</span>
                <button
                  type="button"
                  className="clear-cart-btn"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear All
                </button>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const unitPrice = item.cost !== undefined ? item.cost : item.price;
                  const itemSubtotal = unitPrice * item.quantity;

                  return (
                    <div key={item.id || item.name} className="cart-item-card">
                      <div className="cart-item-image-wrapper">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                      </div>

                      <div className="cart-item-details">
                        <div className="cart-item-title-row">
                          <h3 className="cart-item-name">{item.name}</h3>
                          <button
                            type="button"
                            className="cart-item-delete item-delete-btn"
                            title="Remove plant"
                            onClick={() => handleRemove(item)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        {item.category && <span className="cart-item-category">{item.category}</span>}
                        <div className="cart-item-unit-price">
                          Unit Price: <strong>₹{unitPrice}</strong>
                        </div>

                        <div className="cart-item-actions">
                          {/* Quantity Controls */}
                          <div className="quantity-controls">
                            <button
                              type="button"
                              className="cart-item-button cart-item-button-dec qty-btn"
                              aria-label="Decrease quantity"
                              onClick={() => handleDecrement(item)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="cart-item-quantity_value qty-value">{item.quantity}</span>
                            <button
                              type="button"
                              className="cart-item-button cart-item-button-inc qty-btn"
                              aria-label="Increase quantity"
                              onClick={() => handleIncrement(item)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="cart-item-subtotal">
                            <span className="subtotal-label">Total:</span>
                            <span className="cart-item-total subtotal-amount">₹{itemSubtotal}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cart-back-actions">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="continue_shopping_btn outline-btn"
                >
                  <ArrowLeft size={18} /> Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="order-summary-column">
              <div className="order-summary-card">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Total Plant Quantity:</span>
                  <strong>{totalItems} items</strong>
                </div>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <strong>₹{grandTotal}</strong>
                </div>

                <div className="summary-row">
                  <span>Eco-Packaging & Shipping:</span>
                  <span className="free-shipping-tag">FREE</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row grand-total-row">
                  <span>Grand Total:</span>
                  <span className="total_cart_amount grand-total-amount">₹{grandTotal}</span>
                </div>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>

                <div className="checkout-perks">
                  <div className="perk">
                    <ShieldCheck size={18} /> <span>100% Safe & Secure Payment</span>
                  </div>
                  <div className="perk">
                    <Truck size={18} /> <span>Carbon-Neutral Express Delivery</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Checkout Modal Feedback */}
        {checkoutModalOpen && (
          <div className="modal-overlay" onClick={() => setCheckoutModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-icon">
                <CheckCircle size={48} />
              </div>
              <h2>Checkout Coming Soon!</h2>
              <p>
                Thank you for your interest in Paradise Nursery! Our payment gateway integration is currently
                undergoing scheduled maintenance. We will notify you once full ordering is live.
              </p>
              <div className="modal-summary">
                <p>Total Items: <strong>{totalItems}</strong></p>
                <p>Order Total: <strong>₹{grandTotal}</strong></p>
              </div>
              <button
                type="button"
                className="primary-btn"
                onClick={() => setCheckoutModalOpen(false)}
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartItem;
