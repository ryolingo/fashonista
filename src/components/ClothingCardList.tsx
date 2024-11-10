'use client';

import React, { useEffect, useState } from 'react';
import ClothingCard from './ClothingCard';
import { clothingItem } from '@/types/clothingItem';
import axios from 'axios';

const ClothingList = () => {
   const [clothingItems, setClothingItems] = useState<clothingItem[]>([]);
   useEffect(() => {
      const fetchClothingItems = async () => {
         try {
            const res = await axios.get('/api/clothingItem');
            const data = res.data;
            const formattedData = data.map((item: clothingItem) => {
               return {
                  userId: item.userId,
                  term: item.term,
                  timestamp: item.timestamp,
               };
            });
            setClothingItems([...formattedData]);
         } catch (error) {
            console.error(error);
         }
      };

      fetchClothingItems();
   }, []);
   return (
      <div style={styles.container}>
         <h1>Clothing Items</h1>
         <div style={styles.grid}>
            {clothingItems &&
               clothingItems.map((item, index) => <ClothingCard key={index} item={item} />)}
         </div>
      </div>
   );
};

// スタイルの定義
const styles: { [key: string]: React.CSSProperties } = {
   container: {
      padding: '20px',
   },
   grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'left',
      gap: '10px',
   },
};

export default ClothingList;
