// set api endpoints

import { PrismaAdapter } from "@auth/prisma-adapter";

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/db/prisma";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env";
import { mergeAnanymousCartIntoUserCart } from "@/lib/db/cart";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnanymousCartIntoUserCart(user.id);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
