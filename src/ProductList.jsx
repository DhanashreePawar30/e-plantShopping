
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Plus, Leaf, ShoppingCart } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import {
  addItem,
  selectCartItems,
  selectCartCount,
} from './CartSlice.jsx';

const plants = [
  {
    id: 'pothos',
    name: 'Golden Pothos',
    category: 'Easy-care favourites',
    cost: 18,
    description: 'Trailing heart-shaped leaves that thrive with little fuss.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'snake',
    name: 'Snake Plant',
    category: 'Easy-care favourites',
    cost: 24,
    description: 'Upright leaves for a modern corner.',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'zz',
    name: 'ZZ Plant',
    category: 'Easy-care favourites',
    cost: 22,
    description: 'Glossy foliage and a relaxed care routine.',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a5c9b3b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'rubber',
    name: 'Rubber Plant',
    category: 'Easy-care favourites',
    cost: 29,
    description: 'Bold leaves bring height and character.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jade',
    name: 'Jade Plant',
    category: 'Easy-care favourites',
    cost: 16,
    description: 'A compact succulent with rounded leaves.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    category: 'Easy-care favourites',
    cost: 35,
    description: 'A statement plant with iconic split leaves.',
    image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    category: 'Aromatic plants',
    cost: 20,
    description: 'Fragrant foliage and soft purple blooms.',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    category: 'Aromatic plants',
    cost: 14,
    description: 'A fragrant herb with needle-like leaves.',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'mint',
    name: 'Mint',
    category: 'Aromatic plants',
    cost: 12,
    description: 'Fresh green leaves for a kitchen windowsill.',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'basil',
    name: 'Sweet Basil',
    category: 'Aromatic plants',
    cost: 13,
    description: 'A kitchen favourite with aromatic leaves.',
    image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'thyme',
    name: 'Garden Thyme',
    category: 'Aromatic plants',
    cost: 15,
    description: 'Small leaves and a lovely herbal scent.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'lemonbalm',
    name: 'Lemon Balm',
    category: 'Aromatic plants',
    cost: 17,
    description: 'Soft green leaves with a lemon fragrance.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'aloe',
    name: 'Aloe Vera',
    category: 'Wellness greens',
    cost: 19,
    description: 'A sculptural succulent for bright spaces.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'peace',
    name: 'Peace Lily',
    category: 'Wellness greens',
    cost: 27,
    description: 'Elegant foliage with graceful white blooms.',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'spider',
    name: 'Spider Plant',
    category: 'Wellness greens',
    cost: 17,
    description: 'Arching leaves add playful texture.',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'fern',
    name: 'Boston Fern',
    category: 'Wellness greens',
    cost: 23,
    description: 'Feathery foliage softens shelves and rooms.',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a917d8f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'calathea',
    name: 'Calathea',
    category: 'Wellness greens',
    cost: 31,
    description: 'Decorative patterned leaves with a tropical feel.',
    image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'parlor',
    name: 'Parlor Palm',
    category: 'Wellness greens',
    cost: 26,
    description: 'A graceful palm with a soft silhouette.',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a917d8f?auto=format&fit=crop&w=900&q=85',
  },
];

const categories = [
  'Easy-care favourites',
  'Aromatic plants',
  'Wellness greens',
];

// Included here for the product-listing navigation requirement.
// The main App also displays its shared navigation.
export function Navbar() {
  const count = useSelector(selectCartCount);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-mark"><Leaf /></span>
        paradise<span className="brand-light">nursery</span>
      </Link>
      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart" className="cart-nav">
          <ShoppingCart size={20} /> Cart
          <span className="cart-badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const addedToCart = {};
  cart.forEach((item) => {
    addedToCart[item.name] = true;
  });

  function handleAddToCart(plant) {
    dispatch(addItem(plant));
  }

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">THE GREENHOUSE COLLECTION</p>
        <h1>Find your kind of <em>green.</em></h1>
        <p>
          From easy-care companions to fragrant favourites,
          meet the plant that belongs in your space.
        </p>
        <p>
          <Link to="/cart" className="text-link">
            <ShoppingCart size={18} /> View Cart ({cartCount})
          </Link>
        </p>
      </section>

      {categories.map((category) => {
        const categoryPlants = plants.filter(
          (plant) => plant.category === category
        );

        return (
          <section className="plant-category" key={category}>
            <div className="category-heading">
              <h2>{category}</h2>
              <span>{categoryPlants.length} plants</span>
            </div>

            <div className="plant-grid">
              {categoryPlants.map((plant) => {
                const isAdded = Boolean(addedToCart[plant.name]);

                return (
                  <article className="plant-card" key={plant.id}>
                    <div className="plant-image-wrap">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                      />
                      <span className="plant-category-label">
                        {category}
                      </span>
                    </div>

                    <div className="plant-card-body">
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>

                      <div className="plant-card-bottom">
                        <span className="price">
                          ${plant.cost.toFixed(2)}
                        </span>

                        <button
                          type="button"
                          className={`add-button ${isAdded ? 'added' : ''}`}
                          disabled={addedToCart[plant.name]}
                          onClick={() => handleAddToCart(plant)}
                        >
                          {isAdded ? (
                            <>
                              <Check size={16} /> Added to Cart
                            </>
                          ) : (
                            <>
                              <Plus size={16} /> Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
