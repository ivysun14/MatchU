const express = require('express'); // pull express packege

const personsRoute = require('./src/routes/persons'); // import the routes for persons
const campusesRoute = require('./src/routes/campuses'); // import the routes for campuses

const app = express(); // app variable that can be used to configure the server
const PORT = 8080; // define a port
const mongoose = require('mongoose'); // request mongoose package
require('dotenv/config');

// use middleware: function that executes when routes are being hit
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});
app.use('/api/v1/persons', personsRoute);
app.use('/api/v1/campuses', campusesRoute);

// fire api on the server
app.listen(
    PORT,
    () => console.log(`Running Express Server on http://localhost:${PORT}`)
);

// creating a route to http://localhost:8080/profile, run the handler function when the route is requested
// req: incoming data; res: data back to client
// "req" stands for "request", and "res" stands for "response"
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