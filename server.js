const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/questions', (req, res) => {
    fs.readFile(path.join(__dirname, 'frontend', 'question.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Błąd odczytu pliku:', err);
            return res.status(500).send('Błąd odczytu pliku');
        }

        const questions = data.split('\n').map(line => {
            const parts = line.split(';');
            if (parts.length === 2) {
            return {
                question: parts[0].trim(),
                answer: parts[1].trim()
            };
        }
        });

        res.json(questions); 
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;