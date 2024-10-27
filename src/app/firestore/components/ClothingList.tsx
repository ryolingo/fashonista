// components/ClothingList.tsx
import React from 'react';
import ClothingItem from './ClothingItem';

interface ClothingListProps {
  items: {
    id: string; // Firestore のドキュメント ID
    word: string;
    data: string;
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
