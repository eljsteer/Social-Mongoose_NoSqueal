const { Schema, model, } = require('mongoose');
const reactionSchema = require('./Reaction');

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
      validate: function(val) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(val);
      },
      message: props => `${props.value} is not a valid email`
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
    return this.friends.length
  })

const User = model('user', UserSchema);

module.exports = User;