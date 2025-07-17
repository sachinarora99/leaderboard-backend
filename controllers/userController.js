const User = require('../models/user');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Claim random points
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: randomPoints } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    const history = new ClaimHistory({
      userId,
      pointsClaimed: randomPoints,
    });
    await history.save();

    res.json({ user, randomPoints });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get leaderboard (sorted users with rank)
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const leaderboard = users.map((user, index) => ({
      ...user._doc,
      rank: index + 1,
    }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get claim history
exports.getClaimHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate('userId', 'name');
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
