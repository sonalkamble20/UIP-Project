
const express = require("express");
const Post = require('../models/activity');
const router = express.Router();

router
  .post('/activity', async (req, res) => {
    try {
      const comment = await Activity.openActivity(req.body.userid, req.body.comment, req.body.postid);
      res.send({...comment});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/readComment', async (req, res) => {
    try {
      const comment = await Post.uploadPost(req.body.userid, req.body.postid);
      res.send({...comment});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/updateComment', async (req, res) => {
    try {
      const comment = await Post.updatePost(req.body.postid, req.body.userid, req.body.comment);
      res.send({...comment});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/deleteComment', async (req, res) => {
    try {
      await Post.deletePost(req.body.comment, req.body.postid);
      res.send({ success: "Comment deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

module.exports = router;