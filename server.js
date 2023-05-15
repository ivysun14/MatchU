// import express packege
const express = require('express');
const app = express();
const PORT = 8080;

// use middleware
app.use(express.json())

// fire api on the server
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

// GET http://localhost:8080/profile
// run the handler function when the route is requested
// req: incoming data
// res: data back to client
app.get('/profile', (req, res) => {
    res.status(200).send({
        user: 'userOne',
        major: 'computer science'
    })
});

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