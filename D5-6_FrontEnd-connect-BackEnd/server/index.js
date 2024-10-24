const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // Parse JSON data in request body
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB (replace <your_connection_string> with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/userDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 18, required: true }
});

// Create a model for users
const User = mongoose.model('User', userSchema);

// GET endpoint to fetch all users
app.get('/api/user', async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the database
        res.json(users);  // Return the array of users
    } catch (err) {
        console.error('Error fetching users:', err); // Log error details
        res.status(500).json({ error: "Error fetching users." });
    }
});

// POST endpoint to add a new user
app.post('/api/user', async (req, res) => {
    const { name, email, age } = req.body; // Destructure the incoming data
    console.log(req.body); // Log incoming data for debugging
    if (!name || !email || !age) {
        return res.status(400).send('Missing required fields'); // Handle missing fields
    }

    try {
        const newUser = new User({ name, email, age }); // Create a new user instance
        await newUser.save(); // Save to the database
        res.status(201).json(newUser); // Respond with the created user
    } catch (error) {
        console.error('Error saving user:', error); // Log error details
        res.status(500).send('Error saving user'); // Respond with error
    }
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
