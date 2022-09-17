const { Schema, model, } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: [true, 'User Email required'],
      unique: true,
      match: [
        /^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email address.",
      ],
      message: "Please enter a valid email"
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  }, {
    toJSON: {
      getters: true,
      virtual: true,
    },
    id: false,
  }
);

UserSchema
  .virtual('friendCount')
  .get(function() {
    return this.friends.length;
  })

const User = model('user', UserSchema);

module.exports = User;