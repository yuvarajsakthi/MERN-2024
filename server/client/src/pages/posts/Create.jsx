import React, { useContext, useState } from "react";

import Alert from "../../components/Alert";
import { createPost } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const Create = () => {

    // use posts Context
    const { posts, setPosts } = useContext(PostContext);
    // use navigate hook
    const navigate = useNavigate();
    
  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // create new post
      const data = await createPost(title, body);
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
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handleCreate}>
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
        <button className="btn">Create</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Create;
