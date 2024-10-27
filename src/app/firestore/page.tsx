// pages/index.tsx
import React from 'react';
import ClothingList from './components/ClothingList';
import { getClothingItems } from '../../lib/firestore';

const Home: React.FC = async () => {
  const clothingItems = await getClothingItems();
  console.log(clothingItems);

  return <ClothingList items={clothingItems} />;
};

export default Home;
