const User = require('../models/user');
const express = require('express');
const bodyParser = require('body-parser');
const { use } = require('passport');
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();
const jwt = require('jsonwebtoken');
app.use(express.json())

// router.post('/users/saveBirthdate', userController.saveUserData);

// module.exports = router;

exports.saveUserData = async (req, res) => {
    try {
        const { googleId, name, picture, email, birthdate, gender, interests, crush } = req.body;
        console.log('Received user data: backend!', req.body);

        // Generate JWT token containing the user's Google ID
        const token = jwt.sign({ googleId }, process.env.JWT_SECRET, { expiresIn: '3d' });

        let user = await User.findOne({ googleId });

        if (!user) {
            // If the user does not exist, create a new user
            user = new User({
                googleId: googleId,
                displayName: name,
                picture: picture,
                email: email,
                birthdate: birthdate,
                gender: gender,
                interests: interests,
                crush: crush,
            });
        } else {
            // If the user already exists, update the necessary fields
            user.displayName = name;
            user.picture = picture;
            user.email = email;
            user.birthdate = birthdate;
            user.gender = gender;
            user.interests = interests;
            user.crush = crush;
        }

        await user.save();

        // Send JWT token along with the response
        res.json({ success: true, message: 'User data saved successfully on backend!', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while saving User data on backend!' });
    }
};


// module.exports = router;