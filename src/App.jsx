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

  const handleCheckout = async (itemId) => {
    try {
      await axios.post('http://localhost:5000/api/checkout', {
        itemId: itemId,
        borrowerName: 'Team Member' 
      });
      fetchItems(); 
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const handleReturn = async (itemId) => {
    try {
      await axios.post('http://localhost:5000/api/return', { itemId: itemId });
      fetchItems(); 
    } catch (error) {
      console.error('Return failed:', error);
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
            
            <div className="button-group">
              <button 
                className="checkout-btn"
                disabled={item.availableQuantity <= 0}
                onClick={() => handleCheckout(item._id)}
              >
                {item.availableQuantity > 0 ? 'Checkout' : 'Empty'}
              </button>
              
              <button 
                className="return-btn"
                disabled={item.availableQuantity >= item.totalQuantity}
                onClick={() => handleReturn(item._id)}
              >
                Return
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;