const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllUsers);
router.post('/', controller.addUser);
router.post('/claim/:userId', controller.claimPoints);
router.get('/leaderboard', controller.getLeaderboard);
router.get('/history', controller.getClaimHistory);

module.exports = router;
