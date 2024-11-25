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
