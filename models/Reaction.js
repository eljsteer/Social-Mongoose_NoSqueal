const { Schema, Types } = require('mongoose');
const dayJs = require('dayjs')

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdAtTime) => dayJs(createdAtTime).format('DD/MM/YYYY-hh:mm'),
    }
  }, {
    toJSON: {
      getter: true,
    },
    id: false,
  }
);


module.exports = ReactionSchema;