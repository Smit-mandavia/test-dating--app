// Import Mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MatchingPreferencesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  min_age: Number,
  max_age: Number,
  gender_preference: String,
});

// Define the user schema
const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  picture:String,
  email:String,
  birthdate: Date,
  gender:String,
  interests: [{ // Add the new interests field
    type: String
  }],
  crush: String,
});

// Create the user model
const User = mongoose.model('user', UserSchema);

// Export the user model
module.exports = User;