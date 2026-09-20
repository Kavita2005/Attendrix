import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "./apiService";

function Login() {
  const navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setLoginRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await userAPI.loginUser(loginRequest);
      const user = response.data;

      if (user && user.username) {

        // Save login information
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);

        // Admin
        if (user.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        }

        // Faculty
        else if (user.role === "faculty") {
          navigate("/faculty-dashboard", { replace: true });
        }

        // Student
        else if (user.role === "student") {
          navigate("/student-dashboard", { replace: true });
        }

        // Other role
        else {
          navigate("/", { replace: true });
        }

      } else {
        setError(
          "Login failed. If you are a student, your account may still be waiting for admin approval."
        );
      }

    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">

      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={submitHandler}
      >

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login
        </h2>

        {/* Username */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Username
          </label>

          <input
            type="text"
            id="username"
            name="username"
            value={loginRequest.username}
            onChange={inputHandler}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter username"
            required
          />

        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={loginRequest.password}
            onChange={inputHandler}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter password"
            required
          />

        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Student Registration */}
        <div className="text-center text-sm text-gray-600">

          <span>New student? </span>

          <button
            type="button"
            onClick={() => navigate("/student-registration")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </button>

        </div>

      </form>

    </div>
  );
}

export default Login;