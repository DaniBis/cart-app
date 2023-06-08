import React, { useState, useEffect } from 'react';
import { db } from './../../config/config';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ItemsList, PerItem } from './../shop/shopStyle';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsQuery = query(collection(db, 'items'), where('inCart', '==', true));
        const querySnapshot = await getDocs(cartItemsQuery);
        const cartItemsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCartItems(cartItemsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      // Update the 'inCart' field to false for all items in the cart
      const cartItemRefs = cartItems.map(item => updateDoc(doc(db, 'items', item.id), { inCart: false }));
      await Promise.all(cartItemRefs);

      // Clear the cart items state
      setCartItems([]);

      // Display a success message or navigate to a success page
      console.log('Checkout successful');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ItemsList>
            {cartItems.map(item => (
              <PerItem key={item.id}>
                <img src={item.Image} alt={item.Name} />
                <div>
                  <h3>{item.Name}</h3>
                  <p>Price: ${item.Price}</p>
                </div>
              </PerItem>
            ))}
          </ItemsList>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};
