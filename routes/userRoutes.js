const express = require('express');
const app = express();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
app.use(express.json())

const router = express.Router();

// Define user-related routes

// router.get('/profile', userController.profile);
router.post('/saveuserData', userController.saveUserData);

// router.post('/saveuser', userController.saveuser);


module.exports = router;
