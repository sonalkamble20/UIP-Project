const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  postid: { type: String, unique: true, required: true },
  content: { type: String },
  likes: { type: Number, required: true, default: 0 },  // add default
  comments: [String]
}, { timestamps: true });


const Post = mongoose.model("Post", postSchema);

async function uploadPost(content, username) {
  if (!content || !username) throw new Error('Content and username required');

  const newPost = await Post.create({
    content,
    username,
    postid: generateUUID()
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

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  Post,
  uploadPost,
  openPost,
  updatePost,
  deletePost
};
