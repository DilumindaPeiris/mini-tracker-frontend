import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // NEW: Function to handle the checkout POST request
  const handleCheckout = async (itemId) => {
    try {
      // Sending the item ID and a generic test name to the backend
      await axios.post('http://localhost:5000/api/checkout', {
        itemId: itemId,
        borrowerName: 'Team Member' 
      });
      
      // Re-fetch the items to instantly update the UI quantities
      fetchItems(); 
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Equipment Tracker</h1>
      <div className="bento-grid">
        {items.map((item) => (
          <div key={item._id} className="glass-panel">
            <h3 className="item-name">{item.name}</h3>
            <div className="stock-info">
              Available: {item.availableQuantity} / {item.totalQuantity}
            </div>
            {/* NEW: Added onClick handler to the button */}
            <button 
              className="checkout-btn"
              disabled={item.availableQuantity <= 0}
              onClick={() => handleCheckout(item._id)}
            >
              {item.availableQuantity > 0 ? 'Checkout Item' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;