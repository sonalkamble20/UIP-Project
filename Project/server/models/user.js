// 1. import mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// 2. create schema for entity
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    followers: [String],
    following: [String]
});

// 3. create model of schema
const User = mongoose.model("User", userSchema);

// 4. create CRUD functions on model

// create
async function register(username, password) {
    const user = await User.findOne({ username }); // ✅ replaced getUser()

    if (user) throw Error('Username already in use');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        password: hashed
    });

    return newUser;
}

// read
async function login(username, password) {
    const user = await User.findOne({ username }); // ✅ replaced getUser()

    if (!user) throw Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Wrong Password');

    return user;
}

// update
async function updatePassword(id, password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.updateOne({ _id: id }, { $set: { password: hashed } });
    return user;
}

// delete
async function deleteUser(id) {
    return await User.deleteOne({ _id: id });
}

async function getUserProfile(username) {
    const user = await User.findOne({ username }).select('-password').lean();
    return user;
}

module.exports = {
    register,
    login,
    updatePassword,
    deleteUser,
    getUserProfile
};
