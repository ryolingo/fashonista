import Header from '@/components/header'; // Headerのインポート
import Link from 'next/link'; // Linkのインポート
import { cn } from '@/lib/utils'; // ユーティリティ関数のインポート
import { buttonVariants } from '@/components/ui/button'; // ボタンスタイルのインポート
import MainDisplay from '@/components/Main-display';

const Home = () => {
   return (
      <>
         <Header>
            <Link href={'/login'} className={cn(buttonVariants({ variant: 'secondary' }), 'mr-5')}>
               ログイン
            </Link>
         </Header>
         <MainDisplay />
      </>
   );
};

export default Home;
