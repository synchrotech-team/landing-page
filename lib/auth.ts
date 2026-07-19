import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';

// ponytail: keep NextAuth configurations in a helper file to satisfy Next.js route file restrictions
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day session
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
};
