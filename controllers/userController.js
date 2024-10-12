const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users
exports.getUsers = async (req, res) => {
    try{
    const users = await User.find({});
    res.json(users);
    }catch(err){
        console.error('Error fetching users:', error); // Log the error to the console
    res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add a user
exports.addUser = async (req, res) => {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.json(user);
};

// Claim random points
exports.claimPoints = async (req, res) => {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += points;
    await user.save();

    const history = new ClaimHistory({ userId, points });
    await history.save();

    res.json({ message: `User ${user.name} was awarded ${points} points.` });
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
    const leaderboard = await User.find().sort({ points: -1 });
    res.json(leaderboard);
};

// Get claim history
exports.getClaimHistory = async (req, res) => {
    const history = await ClaimHistory.find({}).populate('userId', 'name');
    res.json(history);
};
