import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function FacultyMenu() {
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/", {
      replace: true,
      state: { msg: "You are logged out!" }
    });
  };

  return (
    <div className="bg-gray-50">
      <nav className="bg-white shadow flex items-center justify-between px-6 py-4">

        <div className="text-lg font-bold text-blue-600">Attendrix</div>

        <div className="flex items-center gap-6">

          <Link to="/faculty-dashboard">Dashboard</Link>

          <div className="relative">
            <button onClick={() => setStudentMenuOpen(!studentMenuOpen)}>
              Students ▼
            </button>

            {studentMenuOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <Link to="/add-student">Add Students</Link> <br />
                <Link to="/all-students">All Students</Link>
              </div>
            )}
          </div>

          <Link to="/mark-attendance">Mark Attendance</Link>
          <Link to="/view-attendance">View Attendance</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/my-profile">My Profile</Link>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded">
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
}

export default FacultyMenu;