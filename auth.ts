import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {
  createUser,
  getUserById,
} from "./lib/database/actions/users.action";

export const { handlers, signIn, signOut, auth } = NextAuth(
  {
    providers: [GitHub],
    callbacks: {
      async signIn({
        user: { name, email, image },
        profile,
      }) {
        if (profile) {
          const { id, login, bio } = profile;
          const existingUser = await getUserById(
            id as string
          );

          if (!existingUser) {
            await createUser({
              id,
              name,
              username: login,
              email,
              image,
              bio: bio || "",
            });
          }
        }

        return true;
      },
      async jwt({ token, account, profile }) {
        if (account && profile) {
          const user = await getUserById(
            profile?.id as string
          );
          token.id = user?._id;
        }
        return token;
      },
      async session({ session, token }) {
        Object.assign(session, { id: token.id });
        return session;
      },
    },
  }
);
