const express = require("express");
const { uploadPost, openPost, updatePost, deletePost } = require("../models/post");
const router = express.Router();

router
  .post('/open', async (req, res) => {
    try {
      const post = await openPost(req.body.postid);
      res.json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })

  .post('/upload', async (req, res) => {
    try {
      const post = await uploadPost(req.body.content, req.body.username, req.body.postid);
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await updatePost(req.body.postid, req.body.content);
      res.json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await deletePost(req.body.postid);
      res.json({ success: "Post deleted" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

module.exports = router;
