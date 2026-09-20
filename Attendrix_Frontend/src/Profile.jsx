import { useEffect, useState } from "react";
import { userAPI } from "./apiService";
import AdminMenu from "./AdminMenu";
import FacultyMenu from "./FacultyMenu";

function Profile() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  // Fetch user data
  useEffect(() => {
    userAPI.getUserByUsername(username)
      .then((response) => {
        setUser(response.data);
        setFormData(response.data);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    userAPI.updateUser(formData)
      .then((response) => {
        alert("Profile updated successfully!");
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating profile");
      });
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {role === "admin" ? <AdminMenu /> : <FacultyMenu />}
      <div className="flex justify-center py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(user);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;