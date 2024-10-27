// components/ClothingItem.tsx
import React from 'react';

interface ClothingItemProps {
  item: {
    id: string;
    name: string;
    brand: string;
    color: string;
    size: string;
    price: number;
    dateAdded: string; // または Date 型
  };
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{item.name}</h2>
      <p>Brand: {item.brand}</p>
      <p>Color: {item.color}</p>
      <p>Size: {item.size}</p>
      <p>Price: ¥{item.price}</p>
      <p>Date Added: {item.dateAdded}</p>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '1.5em',
  },
};

export default ClothingItem;
