const express = require('express');
const app = express();

const mongoose = require(mongoose);
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("mongodb connected."))
.catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

app.get('/api/test', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

app.post('/api/user', async (req, res) => {
    const {name, email, age} = req.body;
    const user = new User({name, email, age});

    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error: "Error creating user."});
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching users' });
    }
});

app.put('/api/users/:id', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Error updating user' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Error deleting user' });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
