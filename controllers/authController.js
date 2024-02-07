const passport = require("passport");
const jwt = require('jsonwebtoken');

// Middleware to generate JWT token after successful Google authentication
exports.googleCallback = (req, res) => {
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // User has been authenticated successfully
        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '3d' });

        // Send the token to the client
        res.json({ token });
    })(req, res);
};

// Middleware to verify JWT token for protected routes
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = decoded;
        next();
    });
};

exports.authenticateGoogle = passport.authenticate("google", { scope: ["profile", "email"] });

exports.failure = (req, res) => {
    res.send("Something went wrong");
};

exports.protectedRoute = (req, res) => {
    console.log("Accessing /auth/protected");
    console.log(req.user);
    const name = req.user.name; // Assuming 'name' is included in the JWT payload
    // You can add more data to the payload when creating the JWT token to include picture info
    const picture = req.user.picture || "default_picture_url";
    res.redirect(
        `http://localhost:3001/success?name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`
    );
};

exports.index = (req, res) => {
    res.send('Welcome to the app!, Server running!');
};

exports.login = (req, res) => {
    // Implementation for login route
    res.send('Login route');
};

exports.logout = (req, res) => {
    // Implementation for logout route
    res.send('Logout route');
};
