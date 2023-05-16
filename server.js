const express = require('express'); // pull express packege
const app = express(); // app variable that can be used to configure the server
const PORT = 8080; // define a port
const mongoose = require('mongoose'); // request mongoose package
require('dotenv/config');

// use middleware: function that executes when routes are being hit
// app.use(express.json());

// creating a route to http://localhost:8080/profile, run the handler function when the route is requested
// req: incoming data; res: data back to client
app.get('/profile', (req, res) => {
    res.status(200).send('This is the profile page')
});

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

// fire api on the server
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

/*
// POST: user is trying to create new data on the server
// sending data to server in json farmat
app.post('/profile/:id', (req, res) => {
    const { id } = req.params;
    const { photo } = req.body;

    if (!id) {
        res.status(418).send({ message: 'Have to have an id!' })
    }

    res.send({
        profile: `user with ${id} and ${photo}`,
    });
});
*/