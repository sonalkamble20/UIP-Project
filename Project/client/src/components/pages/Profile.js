import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newPostContent, setNewPostContent] = useState("");
  const [newActivityComment, setNewActivityComment] = useState("");

  useEffect(() => {
    fetch(`/user/profile/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user profile");
        return res.json();
      })
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return alert("Post content cannot be empty.");

    try {
      const res = await fetch("/post/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPostContent, username}),
      });
      if (!res.ok) throw new Error("Failed to add post");

      const addedPost = await res.json();
      setProfileData((prev) => ({
        ...prev,
        posts: [addedPost, ...prev.posts], 
      }));
      setNewPostContent("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!newActivityComment.trim()) return alert("Comment cannot be empty.");

    try {
      const postid = profileData.posts.length > 0 ? profileData.posts[0]._id : "dummyPostId";

      const res = await fetch("/activity/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, comment: newActivityComment, postid }),
      });
      if (!res.ok) throw new Error("Failed to add activity");

      const addedActivity = await res.json();
      setProfileData((prev) => ({
        ...prev,
        activities: [addedActivity, ...prev.activities], 
      }));
      setNewActivityComment("");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  const { user, posts, activities } = profileData;

  return (
    <div className="profile-container">
      <button
        className="btn btn-danger logout-button"
        onClick={handleLogout}
        style={{ float: "right", marginBottom: "20px" }}
      >
        Logout
      </button>

      <h2>Welcome, {user.username}!!!</h2>
      <div className="profile-info">
        <p>Followers: {user.followers.length}</p>
        <p>Following: {user.following.length}</p>
      </div>

    
      <form onSubmit={handleAddPost} className="add-post-form">
        <input
          type="text"
          placeholder="Write something new..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="form-control"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>

      <h3 className="section-title">Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              {post.content}
              <br />
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddActivity} className="add-activity-form">
        <input
          type="text"
          placeholder="Add a comment/activity..."
          value={newActivityComment}
          onChange={(e) => setNewActivityComment(e.target.value)}
          className="form-control"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit" className="btn btn-primary">
          Add Activity
        </button>
      </form>

      <h3 className="section-title">Activities</h3>
      {activities.length === 0 ? (
        <p>No activities yet.</p>
      ) : (
        <ul className="activity-list">
          {activities.map((act) => (
            <li key={act._id}>
              {act.comment}
              <br />
              <small>{new Date(act.createdAt || act.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
