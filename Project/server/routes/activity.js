const express = require("express");
const { createComment, readCommentsByUser, updateComment, deleteComment } = require("../models/activity");
const router = express.Router();

router
  .post('/createComment', async (req, res) => {
    try {
      const comment = await createComment(req.body.username, req.body.comment, req.body.postid);
      res.json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

  .get('/comments/:username', async (req, res) => {
    try {
      const comments = await readCommentsByUser(req.params.username);
      res.json(comments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })

  .put('/updateComment', async (req, res) => {
    try {
      const comment = await updateComment(req.body.activityId, req.body.comment);
      res.json(comment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })

  .delete('/deleteComment', async (req, res) => {
    try {
      await deleteComment(req.body.activityId);
      res.json({ success: "Comment deleted" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

module.exports = router;
