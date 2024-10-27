'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface UserDropdownProps {
   name: string;
   email: string;
   avatarUrl: string;
}

export default function UserDropdown({ name, email, avatarUrl }: UserDropdownProps) {
   const [isOpen, setIsOpen] = useState(false);

   const onLogout = () => {
      signOut({ callbackUrl: '/' });
   };

   return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
         <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full mr-4'>
               <Avatar className='h-8 w-8'>
                  <AvatarImage src={avatarUrl} alt={name ?? 'ユーザーアバター'} />
                  <AvatarFallback>{name?.[0] ?? 'G'}</AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
               <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>{name ?? 'ゲスト'}</p>
                  <p className='text-xs leading-none text-muted-foreground'>
                     {email ?? 'guest@example.com'}
                  </p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <User className='mr-2 h-4 w-4' />
                  <span>プロフィール</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
               <LogOut className='mr-2 h-4 w-4' />
               <span>ログアウト</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
