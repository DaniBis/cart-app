import React, { useState, useEffect } from 'react';
import { db } from './../../config/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
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

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
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
      )}
    </div>
  );
};
