const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let elections = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
})
app.post('/election', (req, res) => {
    const election = req.body;
    // Output the book to the console for debugging
    console.log(election);
    books.push(election);
    res.send('Election is added to the database');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));