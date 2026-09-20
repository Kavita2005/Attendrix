import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

        <div className="flex items-center gap-3">

          <Link to="/admin-dashboard" className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50">
            Dashboard
          </Link>

          <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="font-semibold text-blue-600 px-3 py-2">
              User ▼
            </button>

            {userMenuOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <Link to="/add-user" className="block px-4 py-2 hover:bg-blue-100">Add User</Link>
                <Link to="/all-users" className="block px-4 py-2 hover:bg-blue-100">All User</Link>
              </div>
            )}
          </div>

          <Link to="/all-subject" className="px-3 py-2">All Subject</Link>
          <Link to="/view-attendance" className="px-3 py-2">View Attendance</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/my-profile">MyProfile</Link>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded">
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
}

export default AdminMenu;