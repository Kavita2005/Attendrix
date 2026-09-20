import { useState } from "react";
import { userAPI } from "./apiService";

function StudentRegistration() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role: "student",
    firstName: "",
    lastName: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await userAPI.registerUser(form);

      setSuccess(
        "Registration successful! Your account is waiting for admin approval."
      );

      setForm({
        username: "",
        password: "",
        email: "",
        role: "student",
        firstName: "",
        lastName: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4">

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-5"
      >

        <h2 className="text-2xl font-bold text-center text-blue-600">
          Student Registration
        </h2>

        {/* First Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={inputHandler}
            placeholder="Enter first name"
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={inputHandler}
            placeholder="Enter last name"
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={inputHandler}
            placeholder="Create username"
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={inputHandler}
            placeholder="Enter email"
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={inputHandler}
            placeholder="Create password"
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* Hidden role */}
        <input
          type="hidden"
          name="role"
          value="student"
        />

        {/* Messages */}
        {success && (
          <div className="text-green-600 text-sm text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>

      </form>
    </div>
  );
}

export default StudentRegistration;