import fs from 'fs';
import path from 'path';

const filePath = path.resolve('db.json'); // Path to your JSON file

// Handle GET requests to fetch prompts
export const GET = async () => {
    try {
        // Read the data from db.json
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Return the data in the response
        return new Response(JSON.stringify(data.prompts), { status: 200 });
    } catch (error) {
        // Handle errors if reading or parsing the file fails
        return new Response('Failed to fetch prompts', { status: 500 });
    }
};

// Handle POST requests to create new prompts
export const POST = async (request) => {
    try {
        // Parse the incoming request body
        const { userId, prompt, tag } = await request.json();

        // Read the current data from db.json
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Find the user by userId
        const user = data.users.find(user => user.id === userId);

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Create a new prompt with user information
        const newPrompt = {
            id: data.prompts.length + 1, // Auto-increment the ID or generate based on some criteria
            prompt,
            creator: userId,
            username: user.name,  // Add the user's name
            email: user.email,    // Add the user's email
            tag,
            createdAt: new Date().toISOString(),
        };

        // Add the new prompt to the prompts array
        data.prompts.push(newPrompt);

        // Write the updated data back to db.json
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        // Return the new prompt in the response
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        // Handle errors during creation
        return new Response('Failed to create a new prompt', { status: 500 });
    }
};
