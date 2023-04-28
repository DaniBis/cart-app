import React, { useState, useEffect } from 'react'
import { db } from './../../config/config';
import { getDocs, collection } from 'firebase/firestore';
import { ItemsList } from './shopStyle';

export const Shop = () => {
  const [items, setItems] = useState([]);
  const itemsRef = collection(db,"items");

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getDocs(itemsRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ItemsList>
      {items.map((item) => (
        <div key={item.id}>
          <img src={item.Image} alt={item.Name} />
          <h1>{item.Name}</h1>
          <h4>{item.Price}</h4>
        </div>
      ))} 
    </ItemsList>
  );
};
