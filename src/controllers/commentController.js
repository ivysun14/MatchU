const { User, Image, Comment } = require('../models/userModel');

// GET
// get a user's comments
exports.listSpecificUserComments = async (req, res) => {

    try {
        let { username } = req.params;
        const theUser = await User.findOne({ id: username });
        res.json(theUser.comments.comment);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

// PATCH
// modify a user's comments
exports.updateSingleUserComments = async (req, res) => {

    let param = req.params.username;
    let comment = req.body.comments;

    try {
        const updateUser = await User.updateOne(
            { id: param },
            { $push: { "comments.comment": comment } }
        );

        res.json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}
