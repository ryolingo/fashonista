import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestore } from './firebase';
import Google from 'next-auth/providers/google';

export const { handler, auth, signIn, signOut } = NextAuth({
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
});
