const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Username is Required",
    },

    email: {
      type: String,
      unique: true,
      required: "Username is Required",
    // mongoose matching validation for email pattern
      match: [/.+@.+\..+/],
    },

    thoughts: [
    // reference _id from thought model
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
    // self reference _id from user model
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
// turn virtuals on to prevent default bahavior
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });
  
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;