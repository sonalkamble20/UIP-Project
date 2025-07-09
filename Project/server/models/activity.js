const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    username: { type: String, required: true },
    postid: { type: String, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });

const Activity = mongoose.model("Activity", activitySchema);

async function createComment(username, comment, postid) {
  const newActivity = await Activity.create({ username, comment, postid });
  return newActivity;
}

async function readCommentsByUser(username) {
  return await Activity.find({ username }).populate('postid').lean();
}

async function updateComment(activityId, comment) {
  const updated = await Activity.findByIdAndUpdate(activityId, { comment }, { new: true });
  if (!updated) throw new Error('Activity not found');
  return updated;
}

async function deleteComment(activityId) {
  const deleted = await Activity.findByIdAndDelete(activityId);
  if (!deleted) throw new Error('Activity not found');
  return deleted;
}

module.exports = {
  Activity,
  createComment,
  readCommentsByUser,
  updateComment,
  deleteComment
};
