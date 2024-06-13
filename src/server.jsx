const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Import file system module
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const OpenAIApi = require('openai');
require('dotenv').config();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Initialize OpenAI API with API key
const openai = new OpenAIApi(process.env.OPENAI_API_KEY);

app.post('/find-complexity', async (req, res) => {
    try {
        // Your logic to interact with OpenAI API goes here
        
        // Example response for now
        return res.status(200).json({
            message: 'Success',
        });
    } catch (error){
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
// OpenAI route
app.post('/api/gemini', async (req, res) => {
    const prompt = req.body.prompt;
    console.log(`Received prompt: ${prompt}`);
  
    try {
      const response = await axios.post(
        'https://api.gemini.com/v1/mytrades', // Hypothetical URL
        {
          model: 'gemini-1', // Hypothetical model
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Gemini AI API response:', response.data);
      res.json(response.data);
    } catch (error) {
      console.error('Error during Gemini AI API request:', error.response?.data || error.message);
      res.status(500).send('Server error');
    }
  });
  
// Get all users route
app.get('/users', async (req, res) => {
  try {
    const usersData = await fs.readFile('users.json', 'utf-8');
    const users = JSON.parse(usersData);
    res.json(users);
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const usersData = await fs.readFile('users.json', 'utf-8');
      const users = JSON.parse(usersData);
  
      console.log('Users:', users); // Log users array for debugging
  
      const user = users.find(user => user.email === email && user.password === password);
  
      console.log('User:', user); // Log user object for debugging
  
      if (user) {
        // Generate a mock token (in a real application, use a proper JWT library)
        const token = 'mocked_jwt_token';
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      } else {
        // If user is not found or password does not match, return 401 Unauthorized
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      // Handle any errors reading the users file or parsing JSON
      console.error('Error reading users file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
