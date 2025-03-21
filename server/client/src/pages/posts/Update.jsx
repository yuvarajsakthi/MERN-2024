import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { updatePost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";

const Update = () => {
  // use posts Context
  const { posts, setPosts } = useContext(PostContext);
  // use navigate hook
  const navigate = useNavigate();
  const { state } = useLocation();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update post
      const data = await updatePost(state._id, title, body);
      // update posts state
      setPosts([...posts, data.post]);
      // navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Update your post</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Post Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="6"
          placeholder="Post Content"
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button className="btn">Update</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Update;
