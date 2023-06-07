const express = require('express');
const router = express.Router();

// Import your models
const User = require('./models/User');
const Comment = require('./models/Comment');

// Route to post a comment
router.post('/comments', async (req, res) => {
    const { userId, commentText } = req.body.comment;

    // Create a new comment
    const comment = new Comment({
        user: userId,
        comment: commentText
    });

    try {
        // Save the comment to the database
        const savedComment = await comment.save();

        // Find the user and add the comment to their comments array
        const user = await User.findById(userId);
        user.comments.push(savedComment);
        await user.save();

        // Return the saved comment
        res.json(savedComment);
    } catch (err) {
        // Return error message
        res.status(500).json({ message: err.message });
    }
});

// Route to get a user's comments
router.get('/users/:userId/comments', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user
        const user = await User.findById(userId).populate('comments');
        res.json(user.comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
