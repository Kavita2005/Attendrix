import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AddStudent from "./AddStudent";
import AddUser from "./AddUser";
import AdminDashboard from "./AdminDashboard";
import AllStudents from "./AllStudents";
import AllSubject from "./AllSubject";
import AllUser from "./AllUser";
import "./App.css";
import FacultyDashboard from "./FacultyDashboard";
import Footer from "./Footer";
import Login from "./Login";
import MarkAttendance from "./MarkAttendance";
import Profile from "./Profile";
import UpdateUser from "./UpdateUser";
import ViewAttendance from "./ViewAttendance";
import Welcome from "./Welcome";
import StudentRegistration from "./StudentRegistration";
import PendingStudents from "./PendingStudents";
import StudentDashboard from "./StudentDashboard";

function App() {
  return (
    <>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/student-registration"
          element={<StudentRegistration />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/add-student"
  element={
    <ProtectedRoute allowedRoles={["admin", "faculty"]}>
      <AddStudent />
    </ProtectedRoute>
  }
/>

<Route
  path="/all-students"
  element={
    <ProtectedRoute allowedRoles={["admin", "faculty"]}>
      <AllStudents />
    </ProtectedRoute>
  }
  />

        <Route
          path="/all-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-user/:username"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-subject"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllSubject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pending-students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PendingStudents />
            </ProtectedRoute>
          }
        />


        {/* ================= FACULTY ================= */}

        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mark-attendance"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <MarkAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty"]}>
              <ViewAttendance />
            </ProtectedRoute>
          }
        />


        {/* ================= STUDENT ================= */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty", "student"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;