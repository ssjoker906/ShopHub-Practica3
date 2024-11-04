import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">ShopHub</a>
        <ShoppingCart size={24} color="white" />
      </div>
    </header>
  );
};