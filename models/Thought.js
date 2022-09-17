const { Schema, model } = require('mongoose');
const Reactions = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      detault: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reactions],
  }, {
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);

ThoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length
  })

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;