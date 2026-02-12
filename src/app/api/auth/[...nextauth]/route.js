// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/DB/cunnectDb";
import User from "@/app/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // 🔥 Google Login: yahi se user create hoga
    async signIn({ user, account }) {
      await connectDB();

      if (account.provider === "google") {
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            password: null, // ❗ Required fix
          });
        }
      }

      return true;
    },

    // 🔥 JWT me sirf user ka data attach karna hai
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    // 🔥 Session me token pass kar do
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
};

// ✅ YAHAN ADD KIYA ISADMIN FUNCTION
export async function isAdmin() {
  try {
    const { getServerSession } = await import("next-auth");
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return false;
    }
    
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    
    // Check if user has admin role
    return user?.role === 'admin';
  } catch (error) {
    console.error("Error in isAdmin:", error);
    return false;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };