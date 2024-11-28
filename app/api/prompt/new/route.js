import fs from 'fs'
import path from 'path'

const filePath = path.resolve('db.json') // Make sure your db.json path is correct

export async function POST(req) {
  const { prompt, userId, tag } = await req.json() // Parse the incoming JSON body

  // Read current data in db.json
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // Find the user by userId
  const user = data.users.find(user => user.id === userId)

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })
  }

  // Generate new prompt object with user information
  const newPrompt = {
    id: data.prompts.length + 1, // Auto increment the ID or generate based on some criteria
    prompt,
    
    username: user.name,  // Add the user's name
    email: user.email,    // Add the user's email
    tag,
    createdAt: new Date().toISOString(),
  }

  // Save new prompt to the db.json
  data.prompts.push(newPrompt)

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return new Response(JSON.stringify(newPrompt), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error saving prompt', error }), { status: 500 })
  }
}

