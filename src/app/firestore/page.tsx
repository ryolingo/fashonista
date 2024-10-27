// pages/index.tsx
import React from 'react';
// import ClothingList from './components/ClothingList';
import ClothingCardList from './components/ClothingCardList'
import { getClothingItems } from '../../lib/firestore';

const Home: React.FC = async () => {
  const clothingItems = await getClothingItems();

  return <ClothingCardList items={clothingItems} />;
};

export default Home;
