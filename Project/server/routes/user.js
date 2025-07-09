
const express = require("express");
const User = require('../models/user');
const Post = require('../models/post').Post; 
const Activity = require('../models/activity').Activity;

const router = express.Router();


router
  .post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body.username, req.body.password);
      res.send({...user.toObject(), password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/register', async (req, res) => {
    try {
      const user = await User.register(req.body.username, req.body.password);
      res.send({...user.toObject(), password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const user = await User.updatePassword(req.body.id, req.body.password);
      res.send({...user, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await User.deleteUser(req.body.id);
      res.send({ success: "Account deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  });

  router.get('/profile/:username', async (req, res) => {
    try {
      const username = req.params.username;
  
      const user = await User.getUserProfile(username);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const posts = await Post.find({ username }).lean();
      const activities = await Activity.find({ username }).lean();
  
      res.json({ user, posts, activities });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
