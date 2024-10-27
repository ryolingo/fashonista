// pages/index.tsx
import ClothingList from './components/ClothingList';
import { getClothingItems } from '../../lib/getClothingItems';

export default function Home() {
  const clothingItems = getClothingItems();
  console.log(clothingItems); // データを確認

  return <ClothingList items={clothingItems} />;
}


