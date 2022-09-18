const { Schema, model } = require('mongoose');
const Reactions = require('./Reaction');
const dayJs = require("dayjs");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength:1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      detault: Date.now(),
      get: (createdAtTime) => dayJs(createdAtTime).format('DD/MM/YYYY-hh:mm'),
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reactions: [Reactions],
  }, {
    toJSON: {
      getters: true,
      virtual: true,
    },
    id: false
  }
);

ThoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length
  })

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;