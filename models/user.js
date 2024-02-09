const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the preference schema
const PreferenceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User table
  min_age: Number,
  max_age: Number,
  gender_preference: String,
});

// Define the user schema
const UserSchema = new Schema({
  googleId: String,
  displayName: String,
  picture: String,
  email: String,
  birthdate: Date,
  gender: String,
  interests: [String],
  crush: String,
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }], // Reference to the Preference table
});

const Preference = mongoose.model('Preference', PreferenceSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { User, Preference };
