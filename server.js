const express = require('express'); // pull express packege
const cors = require('cors');
const usersRoute = require('./src/routes/users'); // import the routes for users
const app = express(); // app variable that can be used to configure the server
const PORT = 8080; // define a port
const mongoose = require('mongoose'); // request mongoose package
require('dotenv/config'); // provide access to .env file

// use middleware: function that executes when routes are being hit
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});
app.use('/registration', usersRoute);

// fire api on the server
app.listen(
    PORT,
    () => console.log(`Running Express Server on http://localhost:${PORT}`)
);

// routes
app.get('/', (req, res) => {
    res.status(200).send('This is the home (login) page')
});

app.get('/match_display', (req, res) => {
    res.status(200).send('This is the match display page')
});

app.get('/chat', (req, res) => {
    res.status(200).send('This is the chat page')
});

// connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connected to DB')
);