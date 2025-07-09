const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    postid: { type: String, unique: true, required: true },
    content: { type: String },
    likes: { type: Number, required: true, default: 0 },
    comments: [String]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

async function uploadPost(content, username) {
  const newPost = await Post.create({
    username,
    content,
    postid: uuidv4(),
    likes: 0
  });
  return newPost;
}

async function openPost(postid) {
  const post = await Post.findOne({ postid });
  if (!post) throw new Error('Post not found');
  return post;
}

async function updatePost(postid, content) {
  const updated = await Post.findOneAndUpdate({ postid }, { content }, { new: true });
  if (!updated) throw new Error('Post not found');
  return updated;
}

async function deletePost(postid) {
  const deleted = await Post.findOneAndDelete({ postid });
  if (!deleted) throw new Error('Post not found');
  return deleted;
}

module.exports = {
  Post,
  uploadPost,
  openPost,
  updatePost,
  deletePost
};
