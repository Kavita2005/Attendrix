import { useEffect, useState } from "react";
import { userAPI } from "./apiService";
import AdminMenu from "./AdminMenu";

function PendingStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Get pending students
  const fetchPendingStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userAPI.getPendingStudents();

      setStudents(response.data || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load pending students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  // Approve or Reject
  const updateStatus = async (username, status) => {
    try {
      setMessage("");
      setError("");

      await userAPI.updateStudentStatus(username, status);

      if (status === "APPROVED") {
        setMessage("Student approved successfully.");
      } else {
        setMessage("Student rejected successfully.");
      }

      // Remove student from pending list
      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => student.username !== username
        )
      );

    } catch (err) {
      console.error(err);
      setError("Failed to update student status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Admin Menu */}
      <AdminMenu />

      <div className="p-6">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Pending Student Approvals
        </h1>

        {/* Success Message */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-gray-600">
            Loading pending students...
          </div>
        )}

        {/* No Students */}
        {!loading && students.length === 0 && !error && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-center">
              No pending student registrations.
            </p>
          </div>
        )}

        {/* Students */}
        {!loading && students.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="px-4 py-3 text-left">
                    Username
                  </th>

                  <th className="px-4 py-3 text-left">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center">
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {students.map((student) => (

                  <tr
                    key={student.username}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-3">
                      {student.username}
                    </td>

                    <td className="px-4 py-3">
                      {student.firstName} {student.lastName}
                    </td>

                    <td className="px-4 py-3">
                      {student.email}
                    </td>

                    <td className="px-4 py-3">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        {student.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">

                      <div className="flex justify-center gap-2">

                        {/* Approve */}
                        <button
                          onClick={() =>
                            updateStatus(
                              student.username,
                              "APPROVED"
                            )
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() =>
                            updateStatus(
                              student.username,
                              "REJECTED"
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default PendingStudents;