import { FirestoreAdapter } from '@auth/firebase-adapter';
import Google from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { firestore } from './firestore';

export const authOptions: NextAuthOptions = {
   providers: [
      Google({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
   ],
   adapter: FirestoreAdapter(firestore),
   pages: {
      signIn: '/login',
   },
   callbacks: {
      async session({ session, token }) {
         if (token) {
            session.user.userId = token.userId;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.picture;
         }
         return session;
      },
      async jwt({ token, user }) {
         if (user) {
            return { ...token, userId: user.id };
         }
         return token;
      },
   },
   session: {
      strategy: 'jwt',
   },
};
