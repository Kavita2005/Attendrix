import { useLocation, Link } from "react-router-dom";

const functionalities = [
  {
    title: "Mark Attendance",
    description: "Easily mark student attendance for each class.",
    icon: "📋",
  },
  {
    title: "View Records",
    description: "Check attendance history and student records.",
    icon: "📑",
  },
  {
    title: "Manage Students",
    description: "Add, edit, or remove student details.",
    icon: "👨‍🎓",
  },
  {
    title: "Reports",
    description: "Generate and download attendance reports.",
    icon: "📊",
  },
];

const Welcome = () => {
  const location = useLocation(); // ✅ added

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Edutrack Pro UI</h1>

        {/* ✅ changed only href -> Link */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </header>

      {/* ✅ Logout Message (no CSS change) */}
      {location.state?.msg && (
        <p className="text-green-600 text-center mt-4">
          {location.state.msg}
        </p>
      )}

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
          Welcome to Student Attendance Management System
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {functionalities.map((func, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{func.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-blue-600">{func.title}</h3>
              <p className="text-gray-600 text-sm">{func.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Welcome;