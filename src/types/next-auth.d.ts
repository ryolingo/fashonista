import { DefaultSession } from 'next-auth';

type UserId = string;

declare module 'next-auth' {
   interface Session {
      user: {
         userId: UserId;
      } & DefaultSession['user'];
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      userId: UserId;
   }
}
