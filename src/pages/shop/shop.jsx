import React, { useState, useEffect } from 'react';
import { db, storage } from './../../config/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { ItemsList, AddForm, PerItem } from './shopStyle';
import { v4 } from 'uuid';

export const Shop = () => {
  const [items, setItems] = useState([]);
  const itemsRef = collection(db, "items");

  // New item states
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemImage, setNewItemImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(itemsRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  function handleImage(e) {
    e.preventDefault();
    let pickedFile;
    if (e.target.files && e.target.files.length > 0) {
      pickedFile = e.target.files[0];
      setNewItemImage(pickedFile);
      console.log(pickedFile);
    }
  }

  const addItems = async (e) => {
  e.preventDefault(); 
  if (newItemImage == null) return;
  const imageRef = ref(storage, `items/${newItemImage.name + v4()}`);
  try {
    await uploadBytes(imageRef, newItemImage);
    alert("Image uploaded");
    const downloadURL = await getDownloadURL(imageRef);
    const newItem = {
      Image: downloadURL,
      Name: newItemName,
      Price: newItemPrice,
    };
    await addDoc(itemsRef, newItem);
    setNewItemImage("");
    setNewItemName("");
    setNewItemPrice(0);
  } catch (err) {
    console.log(err);
  }
}; 

  return (
    <div>
      <AddForm onSubmit={addItems}>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleImage}
        />
        <input
          type="text"
          placeholder="name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
        />
        <button onClick={addItems}>Add</button>
      </AddForm>
      <ItemsList>
        {items.map((item) => (
          <PerItem key={item.id}>
            <img src={item.Image} alt={item.Name} />
            <h1>{item.Name}</h1>
            <h4>{item.Price}</h4>
          </PerItem>
        ))}
      </ItemsList>
    </div>
  );
};