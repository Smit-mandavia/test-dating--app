const express = require('express');
const app = express();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const User = require('../models/user');
app.use(express.json())

const router = express.Router();

// Define user-related routes

// router.get('/profile', userController.profile);
router.post('/saveuserData', userController.saveUserData);

router.post('/matchmaking', userController.matchmaking);

// router.post('/saveuser', userController.saveuser);
router.get('/api/user/google/:googleId', async (req, res) => {
    const googleId = req.params.googleId;
  
    // Query the database using the Google ID
    const user = await User.findOne({ googleId });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json(user);
  });

module.exports = router;
