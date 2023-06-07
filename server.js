const express = require('express'); // pull express packege
const cors = require('cors');
const usersRoute = require('./src/routes/users'); // import the routes for users
const commentsRoute = require('./src/routes/comments'); // import the routes for comments
const app = express(); // app variable that can be used to configure the server
const PORT = 8080; // define a port
const mongoose = require('mongoose'); // request mongoose package
require('dotenv/config'); // provide access to .env file

// use middleware: function that executes when routes are being hit
app.use(cors());

//login-support
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});
app.use('/registration', usersRoute);
app.use('/comments', commentsRoute);

// fire api on the server
app.listen(
    PORT,
    () => console.log(`Running Express Server on http://localhost:${PORT}`)
);

// connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connected to DB')
);