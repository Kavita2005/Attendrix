import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check the user's role
  if (allowedRoles && !allowedRoles.includes(role)) {

    if (role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (role === "faculty") {
      return <Navigate to="/faculty-dashboard" replace />;
    }

    if (role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;