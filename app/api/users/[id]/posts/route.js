
import { readFileSync } from "fs";
import path from "path";

export const GET = async (request, { params }) => {
  try {
    // Path to the db.json file
    const dataPath = path.join(process.cwd(), "db.json");
    const db = JSON.parse(readFileSync(dataPath, "utf8"));

    // Extract user ID from params and find the user
    const userId = parseInt(params.id, 10); // Convert ID from string to number
    const user = db.users.find((user) => user.id === userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Filter prompts by the user's email or username
    const userPosts = db.prompts.filter((post) => post.email === user.email);

    return new Response(JSON.stringify(userPosts), { status: 200 });
  } catch (error) {
    console.error("Error reading posts:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
