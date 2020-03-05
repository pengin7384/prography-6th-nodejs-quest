import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  todoId: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: Date,
});

commentSchema.plugin(require('@meanie/mongoose-to-json')); // _id to id (https://www.npmjs.com/package/@meanie/mongoose-to-json)
module.exports = mongoose.model('comment', commentSchema);
