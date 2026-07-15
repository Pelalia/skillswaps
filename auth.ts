import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username =
          typeof credentials?.username === "string"
            ? credentials.username
            : undefined;
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : undefined;

        if (!username || !password) return null;

        const client = await clientPromise;
        const user = await client
          .db("skillswaps")
          .collection("users")
          .findOne({ username });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          name: user.username,
          image: user.avatarUrl,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const client = await clientPromise;
        const users = client.db("skillswaps").collection("users");
        const existing = await users.findOne({ email: user.email });
        if (!existing) {
          await users.insertOne({
            oauthId: user.id,
            username: user.name?.replace(/\s/g, "").toLowerCase(),
            email: user.email,
            avatarUrl: user.image,
            bio: "",
            location: "",
            teaches: [],
            learns: [],
            createdAt: new Date(),
          });
        } else {
          await users.updateOne(
            { email: user.email },
            { $set: { avatarUrl: user.image } },
          );
        }
      }
      return true;
    },
    async jwt({ token, user, account, }) {
      if (user) {
        token.id = user.id;
      }
      // Pour OAuth, fetch le username depuis MongoDB
      if (account?.provider === "google" || account?.provider === "github") {
        const client = await clientPromise;
        const dbUser = await client
          .db("skillswaps")
          .collection("users")
          .findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.username = dbUser.username;
        }
      } else {
        // Pour credentials, name EST le username
        token.username = token.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
