'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { prefectures } from '@/lib/prefecture';

interface InputPrefectureProps {
   handleSearch: (location: string) => void;
}

export default function InputPrefecture({ handleSearch }: InputPrefectureProps) {
   const [selectedPrefecture, setselectedPrefecture] = React.useState('');
   const [open, setOpen] = React.useState(false);

   function submitHandler(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      // 選択された現在地をapiに渡して、天気情報を取得する
      handleSearch(selectedPrefecture);
   }

   return (
      <form onSubmit={submitHandler} className='flex gap-4'>
         <div className='flex flex-col'>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     id='prefecture-select'
                     variant='outline'
                     role='combobox'
                     aria-expanded={open}
                     className={cn(
                        'w-[200px] justify-between',
                        !selectedPrefecture && 'text-muted-foreground'
                     )}
                  >
                     {selectedPrefecture
                        ? prefectures.find((prefecture) => prefecture.label === selectedPrefecture)
                             ?.label
                        : '現在地を選択'}
                     <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className='w-[200px] p-0'>
                  <Command>
                     <CommandInput placeholder='Search Prefecture...' />
                     <CommandList>
                        <CommandEmpty>No Prefecture found.</CommandEmpty>
                        <CommandGroup>
                           {prefectures.map((prefecture) => (
                              <CommandItem
                                 key={prefecture.label}
                                 value={prefecture.key}
                                 onSelect={() => {
                                    setselectedPrefecture(prefecture.label);
                                    setOpen(false);
                                 }}
                              >
                                 <Check
                                    className={cn(
                                       'mr-2 h-4 w-4',
                                       prefecture.label === selectedPrefecture
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                    )}
                                 />
                                 {prefecture.label}
                              </CommandItem>
                           ))}
                        </CommandGroup>
                     </CommandList>
                  </Command>
               </PopoverContent>
            </Popover>
            <p className='text-sm text-gray-500 mt-1'></p>
         </div>
         <Button type='submit'>Submit</Button>
      </form>
   );
}
