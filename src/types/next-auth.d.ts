import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      createdAt?: Date | string;
    } & DefaultSession["user"];
  }

  interface User {
    createdAt?: Date | string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    createdAt?: Date | string;
  }
}