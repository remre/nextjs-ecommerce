import { PrismaAdapter } from "@auth/prisma-adapter";

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/db/prisma";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env";
import CredentialsProvider from "next-auth/providers/credentials";
import { mergeAnanymousCartIntoUserCart } from "@/lib/db/cart";
import { PrismaClient } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: {  label: "Password", type: "password" }
    //   },
    //   authorize: async (credentials) => {
    //     // Add logic here to find user from your database
    //     // Example with prisma
    //     const user = await prisma.user.findUnique({where: {name: credentials.username}});
    //     if (user && user.password === credentials.password) {
    //       return Promise.resolve(user)
    //     } else {
    //       return Promise.resolve(null)
    //     }
    //   }
    // })
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
