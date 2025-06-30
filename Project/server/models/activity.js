const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userid: {type: String, unique: true, required: true},
    postid: {type: String, unnique: true, required: true},
    comment: {type: Number, required: true}
})

const Activity = mongoose.model("Activity", activitySchema);

async function createComment(userid, comment, postid) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const post = await getPost(postid);

    if(!post) throw Error('Post not found');

    const newActivity = await Activity.create({
        comment: comment
    });

    return newActivity;
}

async function readComment(userid, postid) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const post = await getPost(postid);

    if(!post) throw Error('Post not found');

    return post;
}

async function updateComment(userid, postid, comment) {
    const user = await getUser(userid);

    if(!user) throw Error('user does not exist!');

    const post = await getPost(postid);

    if(!post) throw Error('Post not found');

    const commnet = await Post.updateOne({"_id": postid}, {$set: {comment: comment}});
    return post;
}

//delete
async function deleteComment(comment, postid) {
    return await Activity.findOne({"comment": comment}, {"_id": postid});
}

module.exports = {
    createComment, updateComment, readComment, deleteComment
}