// components/ClothingList.tsx
import React from 'react';
import ClothingItem from './ClothingItem';

interface ClothingListProps {
  items: {
    id: string;
    name: string;
    brand: string;
    color: string;
    size: string;
    price: number;
    dateAdded: string; // または Date 型
  }[];
}

const ClothingList: React.FC<ClothingListProps> = ({ items }) => {
  return (
    <div>
      <h1>Clothing Items</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id}>
            <ClothingItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClothingList;
