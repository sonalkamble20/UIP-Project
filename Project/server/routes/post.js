
const express = require("express");
const Post = require('../models/post');
const router = express.Router();

// 2. create all routes to access database
router
  .post('/post', async (req, res) => {
    try {
      const post = await Post.openPost(req.body.postid, req.body.userid);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/upload', async (req, res) => {
    try {
      const post = await Post.uploadPost(req.body.content, req.body.userid);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/updatePost', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.postid, req.body.userid);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/deletePost', async (req, res) => {
    try {
      await Post.deletePost(req.body.postid, req.body.userid);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;