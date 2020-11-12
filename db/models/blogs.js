const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  slug: { type: String, unique: true, sparse: true },
  title: { type: String, required: true, maxlength: 128 },
  subTitle: { type: String, required: true, },
  content: { type: String, required: true, },
  userId: {type: String, required: true},
  status: { type: String, required: true, default: 'draft', enum: ['draft', 'published']},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blogs", blogsSchema);
