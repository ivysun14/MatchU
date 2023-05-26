const User = require('../models/userModel');


// GET
// get all users
exports.listUsers = async (req, res) => {

    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

exports.listSpecificUsers = async (req, res) => {

    try {
        let { username } = req.params;
        const theUser = await User.findOne({ id: username }).select('+password');
        res.json(theUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}


// POST
// insert a user into database
exports.insertSingleUser = async (req, res) => {

    const newUser = new User({
        id: req.body.id,
        password: req.body.password,
        age: req.body.age,
        campus: req.body.campus,
        gender: req.body.gender,
        major: req.body.major,
        aboutyou: req.body.aboutyou,
        pregender: req.body.pregender,
        picture: req.body.picture
    });

    try {
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

// PATCH
// update a user in the database
exports.updateSingleUser = async (req, res) => {

    let paramID = req.params.id;
    let pregender = req.body.pregender;

    try {
        const updateUser = await User.updateOne({ _id: paramID }, { pregender: pregender });
        res.json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

// insert dummy users into database
/*
async function insertUsers() {
    try {
        await User.insertMany([
            {
                "id": "David",
                "password": "05242023",
                "age": 22,
                "campus": "UC Davis",
                "gender": "Male",
                "major": "Biology",
                "pregender": "Female"
            },
            {
                "id": "Alexa",
                "password": "05242022",
                "age": 20,
                "campus": "UC Berkeley",
                "gender": "Female",
                "major": "Engineering",
                "pregender": "Female"
            },
            {
                "id": "Caroline",
                "password": "05222022",
                "age": 21,
                "campus": "UC Merced",
                "gender": "Female",
                "major": "English",
                "pregender": "Male"
            },
            {
                "id": "Tony",
                "password": "05222021",
                "age": 21,
                "campus": "UC Riverside",
                "gender": "Male",
                "major": "Computer Science",
                "pregender": "Female"
            },
            {
                "id": "Spencer",
                "password": "05222025",
                "age": 20,
                "campus": "UC Irvine",
                "gender": "Male",
                "major": "Business",
                "pregender": "Female"
            },
            {
                "id": "Jessica",
                "password": "05222225",
                "age": 22,
                "campus": "UCLA",
                "gender": "Female",
                "major": "Statistics",
                "pregender": "Male"
            },
        ]);
    } catch (error) {
        console.log(error);
    }
}

insertUsers();
*/