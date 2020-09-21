import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { AuthProvider } from './context/auth-context';
import { CartProvider } from './context/cart/cart-context';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
