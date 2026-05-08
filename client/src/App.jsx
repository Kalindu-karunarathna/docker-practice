import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // load users when page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users",
        formData
      );

      // clear form
      setFormData({
        name: "",
        email: "",
      });

      // refresh user list
      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management App</h1>

      {/* Add User Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Add User
        </button>
      </form>

      <hr />

      {/* User List */}
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid gray",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;