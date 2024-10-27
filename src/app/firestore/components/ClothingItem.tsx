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
    dateAdded: string;
  };
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{item.name}</h2>
      <p><strong>Brand:</strong> {item.brand}</p>
      <p><strong>Color:</strong> {item.color}</p>
      <p><strong>Size:</strong> {item.size}</p>
      <p><strong>Price:</strong> ¥{item.price}</p>
      <p><strong>Date Added:</strong> {item.dateAdded}</p>
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
    backgroundColor: '#f9f9f9',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '1.5em',
  },
};

export default ClothingItem;
