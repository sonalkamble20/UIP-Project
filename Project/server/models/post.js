//1. import mongoose
const mongoose = require("mongoose");

//2. create schema for entity
const postSchema = new mongoose.Schema({
    userid: {type: String, unique: true, required: true},
    postid: {type: String, unnique: true, required: true},
    content: {type: String},
    likes: {type: Number, required: true},
    comments: [String]
})

//3. create model of schema
const Post = mongoose.model("Post", postSchema);

//4. create CRUD functions on model

//create

async function uploadPost(content, userid) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const newPost = await Post.create({
        content: content
    });

    return newPost;
}

//read
async function openPost(postid, userid) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const post = await getPost(postid);

    if(!post) throw Error('Post not found');

    return post;
}

//update
async function updatePost(postid, userid) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const post = await Post.updateOne({"_id": postid}, {$set: {content: content}});
    return post;
}

//delete
async function deletePost(postid, userid) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const post = await getPost(postid);

    if(!post) throw Error('post does not exist!');

    return await Post.findOne({ "content": content});
}

//5. eporting functions to routes

module.exports = {
    uploadPost, openPost, updatePost, deletePost
}