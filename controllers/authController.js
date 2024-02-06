const passport = require("passport");
const jwt = require('jsonwebtoken');

exports.authenticateGoogle = passport.authenticate("google", { scope: ["profile", "email"] });

exports.googleCallback = passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
}), (req, res) => {
    // User has been authenticated successfully
    const user = { id: req.user.id, name: req.user.name }; // This should be the user object from your database

    const token = jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: '3d' });

    // Send the token to the client
    res.json({ token });
};

exports.failure = (req, res) => {
    res.send("Something went wrong");
};

exports.protectedRoute = (req, res) => {
    console.log("Accessing /auth/protected");
    console.log(req.user);
    const name = req.user.displayName;
    const picture =
        req.user.photos && req.user.photos.length > 0
            ? req.user.photos[0].value
            : "default_picture_url";
    res.redirect(
        `http://localhost:3001/success?name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`
    );
};

exports.index = (req, res) => {
    res.send('Welcome to the app!, Server running!');
};

// controllers/authController.js
exports.login = (req, res) => {
    // Implementation for login route
    res.send('Login route');
};

exports.logout = (req, res) => {
    // Implementation for logout route
    res.send('Logout route');
};
