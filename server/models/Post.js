const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String },
  url: { type: String },
  status: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('posts', PostSchema);
