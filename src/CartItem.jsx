
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';

import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from './CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const [message, setMessage] = useState('');

  function handleIncrement(item) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  }

  function handleDecrement(item) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  }

  function handleRemove(item) {
    dispatch(removeItem(item.id));
  }

  function handleContinueShopping() {
    navigate('/plants');
  }

  function handleCheckout() {
    setMessage('Coming Soon — checkout is not available in this demo.');
  }

  return (
    <main className="page-container cart-page">
      <section className="page-intro cart-intro">
        <p className="eyebrow">YOUR LITTLE GREEN CORNER</p>
        <h1>Your shopping <em>cart.</em></h1>
        <p>
          {count} {count === 1 ? 'plant' : 'plants'} ready to find a home.
        </p>
      </section>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBag size={34} />
          </div>

          <h2>Your cart is taking a little breather.</h2>
          <p>Explore the collection and find a plant to bring home.</p>

          <button
            type="button"
            className="primary-button"
            onClick={handleContinueShopping}
          >
            <ArrowLeft size={17} /> Continue Shopping
          </button>
        </section>
      ) : (
        <div className="cart-container">
          <section className="cart-items-panel">
            <div className="cart-panel-heading">
              <h2>Selected plants ({count})</h2>

              <button
                type="button"
                className="text-link"
                onClick={handleContinueShopping}
              >
                <ArrowLeft size={16} /> Continue Shopping
              </button>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>

                  <p className="unit-price">
                    ${Number(item.cost ?? item.price ?? 0).toFixed(2)}
                    <span> / plant</span>
                  </p>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleRemove(item)}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>

                <div className="quantity-control">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name}`}
                    onClick={() => handleDecrement(item)}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.name}`}
                    onClick={() => handleIncrement(item)}
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <div className="item-subtotal">
                  <span>Subtotal</span>
                  <strong>
                    $
                    {(
                      Number(item.cost ?? item.price ?? 0) * item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <p className="eyebrow">ORDER SUMMARY</p>
            <h2>Almost yours.</h2>

            <div className="summary-line">
              <span>Plants ({count} items)</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <strong>Complimentary</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            {message && (
              <p className="checkout-message" role="status">
                {message}
              </p>
            )}

            <p className="secure-note">
              A little more green is on its way.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
