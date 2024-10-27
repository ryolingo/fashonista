// components/ClothingItem.tsx
import React from 'react';

interface ClothingItemProps {
  item: {
    id: string; // Firestore のドキュメント ID
    word: string;
    data: string;
  };
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{item.id}</h2>
      <p><strong>日時</strong> {item.data}</p>
      <p><strong>検索ワード</strong> {item.word}</p>
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
