import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deletePost, getUserPosts } from "../../controllers/postsController.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import Post from "../../components/Post.jsx";
import Alert from "../../components/Alert.jsx";
import Success from "../../components/Success.jsx";

const Dashboard = () => {
  // Use user context
  const { user, setUser } = useContext(UserContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);
  // Success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      // Grab user's post
      const { userPosts, email } = await getUserPosts();
      // update user state
      setUser({ email, posts: userPosts });
      // Remove the loading
      setLoading(false);
    }, 500);
  }, []);

  // Handle delete posts
  const handleDelete = async (_id) => {
    if (confirm("Confirm Delete?")) {
      try {
        // delete post
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      const newPosts = user.posts.filter((post) => post._id !== _id);
      setUser({ ...user, posts: newPosts });
    }
  };

  return (
    <section className="card">
      <p>{user.email}</p>
      <h1 className="title">User Dashboard</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

      {user.posts &&
        user.posts.map((post) => (
          <div key={post._id}>
            <Post post={post}>
              <div className="flex items-center gap-2">
                <Link
                  className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                  title="Update"
                  state={post}
                  to="/update"
                ></Link>
                <button
                  className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                  title="Delete"
                  onClick={() => handleDelete(post._id)}
                ></button>
              </div>
            </Post>
          </div>
        ))}
    </section>
  );
};

export default Dashboard;
