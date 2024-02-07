const jwt = require('jsonwebtoken');
const MyTrack = { 
    userId: 12345, 
    username: 'example_user', 
    role: 'admin' 
};
const loginId = 'example_login_id';
const GoogleID = 'Put_Required_ID';
const payload = { ...MyTrack, GoogleID };
const secretKey = 'This_is_Secrete';
const token = jwt.sign(payload, secretKey);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = authenticateToken;