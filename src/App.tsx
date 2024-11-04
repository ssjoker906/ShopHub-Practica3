import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Product } from './types/product';
import { fetchProducts } from './services/supabase';
import './styles/main.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Starting to load products...');
        const data = await fetchProducts();
        console.log('Products loaded:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <main className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </main>
    </div>
  );
};

export default App;