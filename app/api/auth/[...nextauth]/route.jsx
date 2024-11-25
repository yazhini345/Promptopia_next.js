/*import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

console.log({
    clientId:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,


})
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({session}){

    },
    async signIn({profile}){
        try{
            //serverless lamda dynamodb

        }catch(error){

        }
    }
})
export{ handler as GET, handler as POST} 

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db.json');

export default function handler(req, res) {
  // Read the data from db.json
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (req.method === 'GET') {
    // Return all users
    res.status(200).json(data.users);
  } else if (req.method === 'POST') {
    // Add a new user
    const newUser = req.body;
    newUser.id = data.users.length + 1; // Auto-increment ID
    data.users.push(newUser);

    // Write updated data back to db.json
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(201).json(newUser);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
*/

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
/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
    debug:true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Session callback: Modify the session object sent to the client
    async session({ session, token }) {
      // Attach the user ID from the token to the session
      session.user.id = token.id;
      return session;
    },
    // Sign-in callback: Validate or create user on sign-in
    async signIn({ user, account, profile }) {
      try {
        console.log("Sign-in attempt:", { user, account, profile });

        // Example logic: Check if the user email is verified
        if (profile?.email_verified === false) {
          console.error("Email not verified.");
          return false; // Reject sign-in if email is not verified
        }

        // Placeholder for future integration (e.g., database operations)
        // For example, check or create the user in your database:
        // const userExists = await findUserInDatabase(profile.email);
        // if (!userExists) {
        //   await createUserInDatabase({ email: profile.email, name: profile.name });
        // }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Reject sign-in in case of errors
      }
    },
  },
  debug: true, // Enable debugging for detailed logs
});

export { handler as GET, handler as POST };
*/