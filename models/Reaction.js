const { Schema, Types } = require('mongoose');
const dayJs = require('dayjs/local')

const ReactionSchema = new Schema(
  {
    reactonID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 250,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dayJs().format('DD/MM/YYYY'),
    }
  }, {
    toJSON: {
      getter: true,
    },
    id: false,
  }
);


module.exports = ReactionSchema;