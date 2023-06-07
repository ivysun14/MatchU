const { User, Image, Comment } = require('../models/userModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// set storage
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
// set upload
const upload = multer({
    storage: storage
}).single('picture')

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
// insert a user with his/her image into database
exports.insertSingleUser = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new Image({
                data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                contentType: 'image/png/jpeg'
            });

            const newComment = new Comment();
            //console.log(newComment);

            const newUser = new User({
                id: req.body.id,
                password: req.body.password,
                age: req.body.age,
                campus: req.body.campus,
                gender: req.body.gender,
                major: req.body.major,
                aboutyou: req.body.aboutyou,
                pregender: req.body.pregender,
                picture: newImage,
                comments: newComment
            })

            newUser.save()
                .then(() => res.send('User profile and image successfully uploaded. Empty comment field initialized.'))
                .catch((err) => console.log(err));
        }
    })
}


// PATCH
// update a user in the database
exports.updateSingleUser = async (req, res) => {
    let param = req.params.username;
    let password = req.body.password;
    let age = req.body.age;
    let campus = req.body.campus;
    let gender = req.body.gender;
    let major = req.body.major;
    let aboutyou = req.body.aboutyou;
    let pregender = req.body.pregender;

    try {
        const updateUser = await User.updateOne(
            { id: param },
            {
                $set: {
                    password: password,
                    age: age,
                    campus: campus,
                    gender: gender,
                    major: major,
                    aboutyou: aboutyou,
                    pregender: pregender,
                },
            }
        );

        res.json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};
