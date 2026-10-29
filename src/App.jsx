
import React, { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Leaf, ShoppingCart, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount } from './CartSlice.jsx';

function Navbar() {
  const count = useSelector(selectCartCount);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-mark">
          <Leaf />
        </span>
        paradise<span className="brand-light">nursery</span>
      </Link>

      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart" className="cart-nav">
          <ShoppingCart size={20} />
          Cart
          <span className="cart-badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}

function Landing() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList />;
  }

  return (
    <main className="landing">
      <div className="background-image" aria-hidden="true" />

      <section className="hero-content">
        <div className="hero-kicker">✿ GROW A LITTLE HAPPINESS</div>

        <h1>Welcome To Paradise Nursery</h1>

        <p>
          Discover thoughtfully chosen houseplants for brighter rooms,
          calmer routines, and homes that feel alive.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={() => setShowProductList(true)}
        >
          Get Started <ArrowRight size={18} />
        </button>

        <div className="hero-note">
          Find your next favourite leaf
        </div>
      </section>

      <section className="landing-about">
        <AboutUs />
      </section>
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="*" element={<Landing />} />
      </Routes>

      <footer className="site-footer">
        ✿ Paradise Nursery
        <span>Bring nature home, one leaf at a time.</span>
      </footer>
    </div>
  );
}
