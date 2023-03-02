const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId()
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;