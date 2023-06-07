const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:username', commentController.listSpecificUserComments);
router.patch('/:username', commentController.updateSingleUserComments);

module.exports = router;