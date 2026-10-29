import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart
} from './redux/CartSlice';
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

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const grandTotal = useSelector(selectTotalPrice);

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
  };

  return (
    <div className="cart-page">
      <Navbar />

      <main className="cart-container">
        <div className="cart-header">
          <div>
            <h1>Your Shopping Cart</h1>
            <p className="cart-subtitle">Review your selected botanical companions before checkout</p>
          </div>
          <Link to="/plants" className="continue-shopping-top-link">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
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
            <Link to="/plants" className="primary-btn">
              <Sparkles size={18} /> Explore Our Plants
            </Link>
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
                  const itemSubtotal = item.price * item.quantity;

                  return (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-item-image-wrapper">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                      </div>

                      <div className="cart-item-details">
                        <div className="cart-item-title-row">
                          <h3 className="cart-item-name">{item.name}</h3>
                          <button
                            type="button"
                            className="item-delete-btn"
                            title="Remove plant"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <span className="cart-item-category">{item.category}</span>
                        <div className="cart-item-unit-price">
                          Unit Price: <strong>₹{item.price.toLocaleString('en-IN')}</strong>
                        </div>

                        <div className="cart-item-actions">
                          {/* Quantity Controls */}
                          <div className="quantity-controls">
                            <button
                              type="button"
                              className="qty-btn"
                              aria-label="Decrease quantity"
                              onClick={() => dispatch(decreaseQuantity(item.id))}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              aria-label="Increase quantity"
                              onClick={() => dispatch(increaseQuantity(item.id))}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="cart-item-subtotal">
                            <span className="subtotal-label">Subtotal:</span>
                            <span className="subtotal-amount">₹{itemSubtotal.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cart-back-actions">
                <Link to="/plants" className="outline-btn">
                  <ArrowLeft size={18} /> Continue Shopping
                </Link>
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
                  <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
                </div>

                <div className="summary-row">
                  <span>Eco-Packaging & Shipping:</span>
                  <span className="free-shipping-tag">FREE</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row grand-total-row">
                  <span>Grand Total:</span>
                  <span className="grand-total-amount">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
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

        {/* Checkout Modal / Feedback banner */}
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
                <p>Order Total: <strong>₹{grandTotal.toLocaleString('en-IN')}</strong></p>
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
