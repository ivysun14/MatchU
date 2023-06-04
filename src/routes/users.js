const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/userController');

router.get('/', userContoller.listUsers);
router.get('/:username', userContoller.listSpecificUsers);
router.post('/', userContoller.insertSingleUser);
router.patch('/:id', userContoller.updateSingleUser);

module.exports = router;