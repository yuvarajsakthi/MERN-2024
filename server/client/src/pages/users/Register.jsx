import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/userController";
import { UserContext } from "../../contexts/UserContext";

const Register = () => {
  // use user Context
  const { setUser } = useContext(UserContext);

  // Use Navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Handle login
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Register the user
      await registerUser(
        formData.email,
        formData.password,
        formData.passwordConfirm
      );
      // Update the user state
      setUser({ email: formData.email, posts: [] });
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create a new account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email Address"
          className="input"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={formData.passwordConfirm}
          onChange={(e) =>
            setFormData({
              ...formData,
              passwordConfirm: e.target.value,
            })
          }
        />
        <button className="btn">Register</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Register;
