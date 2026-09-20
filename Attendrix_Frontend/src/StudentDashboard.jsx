import { useEffect, useState } from "react";
import { attendanceAPI, studentAPI } from "./apiService";

function StudentDashboard() {

  const username = localStorage.getItem("username");

  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH STUDENT + ATTENDANCE
  // ==========================================

  useEffect(() => {

    if (!username) {
      setError("Student username not found.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {

      try {

        // Get logged-in student's information
        const studentResponse =
          await studentAPI.getStudentByUsername(username);

        setStudent(studentResponse.data);


        // Get only logged-in student's attendance
        const attendanceResponse =
          await attendanceAPI.getMyAttendance(username);

        setAttendance(
          attendanceResponse.data || []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load student information or attendance."
        );

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, [username]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <p className="text-lg text-gray-600">
            Loading student dashboard...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <h2 className="text-xl font-bold text-red-600 mb-3">
            Error
          </h2>

          <p className="text-gray-600">
            {error}
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // CALCULATE ATTENDANCE
  // ==========================================

  const totalClasses = attendance.length;

  const presentClasses = attendance.reduce(
    (total, record) => {

      if (
        record.students &&
        record.students.some(
          (stu) =>
            stu.username === username
        )
      ) {
        return total + 1;
      }

      return total;
    },

    0
  );


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">

      {/* Student Header */}

      <div className="bg-white shadow-md">

        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold text-blue-700">
              Attendrix
            </h1>

            <p className="text-sm text-gray-500">
              Student Portal
            </p>

          </div>

          <div className="text-right">

            <p className="font-semibold text-gray-700">
              {student
                ? student.name
                : username}
            </p>

            <p className="text-sm text-gray-500">
              Student
            </p>

          </div>

        </div>

      </div>


      <div className="max-w-6xl mx-auto py-10 px-4">


        {/* Welcome */}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Welcome, {student
              ? student.name
              : username}
          </h2>

          <p className="text-gray-600">
            View your subjects and attendance below.
          </p>

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


          {/* Student */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h3 className="text-gray-500 text-sm mb-2">
              Username
            </h3>

            <p className="text-xl font-bold text-blue-700">
              {username}
            </p>

          </div>


          {/* Total Classes */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h3 className="text-gray-500 text-sm mb-2">
              Attendance Records
            </h3>

            <p className="text-3xl font-bold text-purple-700">
              {totalClasses}
            </p>

          </div>


          {/* Present */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h3 className="text-gray-500 text-sm mb-2">
              Your Attendance
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {presentClasses}
            </p>

          </div>

        </div>


        {/* My Attendance */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              My Attendance
            </h2>

            <span className="text-sm text-gray-500">
              {attendance.length} record(s)
            </span>

          </div>


          {attendance.length === 0 ? (

            <div className="text-center py-10">

              <p className="text-gray-500">
                No attendance records found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="border p-3 text-left">
                      Subject
                    </th>

                    <th className="border p-3 text-left">
                      Date
                    </th>

                    <th className="border p-3 text-left">
                      Time
                    </th>

                    <th className="border p-3 text-left">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {attendance.map(
                    (record) => {

                      const isPresent =
                        record.students &&
                        record.students.some(
                          (stu) =>
                            stu.username === username
                        );

                      return (

                        <tr
                          key={record.id}
                          className="hover:bg-gray-50"
                        >

                          <td className="border p-3">

                            {record.subject
                              ? record.subject.name
                              : "Unknown Subject"}

                          </td>


                          <td className="border p-3">

                            {record.date}

                          </td>


                          <td className="border p-3">

                            {record.time}

                          </td>


                          <td className="border p-3">

                            {isPresent ? (

                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                                Present
                              </span>

                            ) : (

                              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                                Absent
                              </span>

                            )}

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;