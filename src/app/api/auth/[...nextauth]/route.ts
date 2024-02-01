// set api endpoints

import { authOptions } from "@/lib/Authoptions";

import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
