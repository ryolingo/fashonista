// components/ClothingList.tsx
import React from 'react';
import ClothingCard from './ClothingCard';

interface ClothingItem {
  id: string; // idは直接ここに書く
  data: string;
  word: string;
}

interface ClothingListProps {
  items: ClothingItem[];
}

const ClothingList: React.FC<ClothingListProps> = ({ items }) => {
  return (
    <div style={styles.container}>
      <h1>Clothing Items</h1>
      <div style={styles.grid}>
        {items.map(item => (
          <ClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
  },
};

export default ClothingList;
