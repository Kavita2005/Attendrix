import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAPI } from "./apiService";
import AdminMenu from "./AdminMenu";

function UpdateUser() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    firstName: "",
    lastName: "",
  });

  // Fetch user details by username
  useEffect(() => {
    userAPI.getUserByUsername(username)
      .then((response) => setUser(response.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [username]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    userAPI.updateUser(user)
      .then(() => {
        alert("User updated successfully!");
        navigate("/all-users");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Failed to update user!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />
      <div className="flex justify-center items-center py-12 px-4">
        <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-green-600 text-center mb-2">Update User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                disabled
                className="border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;