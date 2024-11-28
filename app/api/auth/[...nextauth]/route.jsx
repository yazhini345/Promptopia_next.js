
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

const readDatabase = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
      }},
      httpOptions: {
        timeout: 10000,  // Increase timeout to 10 seconds
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const db = readDatabase();

      // Find the user in the database
      const sessionUser = db.users.find((user) => user.email === session.user.email);

      if (sessionUser) {
        // Attach the user ID to the session
        session.user.id = sessionUser.id;
      }

      return session;
    },
    async signIn({ account,profile }) {
      try {
        const db = readDatabase();

        // Check if the user already exists
        const userExists = db.users.find((user) => user.email === profile.email);

        // If the user doesn't exist, create a new entry
        if (!userExists) {
          const newUser = {
            id: db.users.length + 1, // Simple incremental ID
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          };

          db.users.push(newUser);
          writeDatabase(db);
        }

        return true;
      } catch (error) {
        console.log('Error during sign-in:', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
