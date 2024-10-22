const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
