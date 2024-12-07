const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/save-json', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'config.json');

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save JSON' });
        }
        res.status(200).json({ message: 'JSON saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});