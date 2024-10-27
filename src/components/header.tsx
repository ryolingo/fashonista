export default function Header({ children }: { children?: React.ReactNode }) {
   return (
      <header>
         <div className='bg-black flex justify-between items-center'>
            <h1 className='text-white font-extrabold text-3xl py-6 pl-10'>Fashionista</h1>
            {children}
         </div>
      </header>
   );
}
