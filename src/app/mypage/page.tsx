import LogoutButton from '@/components/Logoutbutton';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import MainDisplay from '@/components/Main-display';
import Header from '@/components/header';
import DisplayAvator from '@/components/display-avator';

export default async function mypage() {
   const currentUser = await getCurrentUser();
   if (!currentUser) {
      redirect('/login');
   }
   return (
      <>
         <Header>
            <DisplayAvator
               name={currentUser.name!}
               email={currentUser.email!}
               avatarUrl={currentUser.image!}
            />
         </Header>
         <MainDisplay />
      </>
   );
}
