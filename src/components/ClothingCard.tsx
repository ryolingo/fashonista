// components/ClothingCard.tsx
import React from 'react';

interface ClothingCardProps {
   item: {
      term: string;
      timestamp: string;
      user: string;
   };
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item }) => {
   return (
      <div style={cardStyles}>
         <p>{item.timestamp}</p>
         <h2>{item.term}</h2>
         {/* 画像やその他の情報をここに追加 */}
      </div>
   );
};
console.log('ClothingCard.tsx');

const cardStyles: React.CSSProperties = {
   border: '1px solid #ccc',
   borderRadius: '8px',
   padding: '10px',
   width: 'calc(25% - 20px)', // 各カードの幅を25%に設定
   marginBottom: '20px', // カードの下にマージン
   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   textAlign: 'center',
};

export default ClothingCard;
