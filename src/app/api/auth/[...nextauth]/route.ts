// set api endpoints

import { authOptions } from "@/lib/autOptions";

import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
