import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [selectedDate, setSelectedDate] = useState("2026-06-23");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");

  const [students, setStudents] = useState([
    {
      id: 1,
      rollNo: "CS001",
      name: "Arun Kumar",
      batch: "Batch A",
      course: "React Development",
      status: "Present",
    },
    {
      id: 2,
      rollNo: "CS002",
      name: "Divya S",
      batch: "Batch A",
      course: "React Development",
      status: "Absent",
    },
    {
      id: 3,
      rollNo: "CS003",
      name: "Karthik R",
      batch: "Batch A",
      course: "React Development",
      status: "Present",
    },
    {
      id: 4,
      rollNo: "CS004",
      name: "Meena K",
      batch: "Batch A",
      course: "React Development",
      status: "Present",
    },
    {
      id: 5,
      rollNo: "CS005",
      name: "Priya M",
      batch: "Batch B",
      course: "Java Full Stack",
      status: "Present",
    },
    {
      id: 6,
      rollNo: "CS006",
      name: "Ravi Kumar",
      batch: "Batch B",
      course: "Java Full Stack",
      status: "Absent",
    },
    {
      id: 7,
      rollNo: "CS007",
      name: "Sangeetha R",
      batch: "Batch B",
      course: "Java Full Stack",
      status: "Present",
    },
    {
      id: 8,
      rollNo: "CS008",
      name: "Vignesh P",
      batch: "Batch B",
      course: "Java Full Stack",
      status: "Absent",
    },
    {
      id: 9,
      rollNo: "CS009",
      name: "Anjali S",
      batch: "Batch C",
      course: "Python Programming",
      status: "Present",
    },
    {
      id: 10,
      rollNo: "CS010",
      name: "Bharath K",
      batch: "Batch C",
      course: "Python Programming",
      status: "Present",
    },
    {
      id: 11,
      rollNo: "CS011",
      name: "Chandru V",
      batch: "Batch C",
      course: "Python Programming",
      status: "Absent",
    },
    {
      id: 12,
      rollNo: "CS012",
      name: "Deepika M",
      batch: "Batch C",
      course: "Python Programming",
      status: "Present",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    rollNo: "",
    name: "",
    batch: "Batch A",
    course: "",
  });

  const filteredStudents = students.filter((student) => {
    const batchMatch =
      selectedBatch === "All Batches" || student.batch === selectedBatch;

    const searchMatch =
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchText.toLowerCase());

    return batchMatch && searchMatch;
  });

  const totalStudents = filteredStudents.length;

  const presentStudents = filteredStudents.filter(
    (student) => student.status === "Present"
  ).length;

  const absentStudents = filteredStudents.filter(
    (student) => student.status === "Absent"
  ).length;

  const attendancePercentage =
    totalStudents > 0
      ? ((presentStudents / totalStudents) * 100).toFixed(1)
      : 0;

  const markAttendance = (id, status) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, status: status } : student
    );

    setStudents(updatedStudents);
  };

  const markAllPresent = () => {
    const updatedStudents = students.map((student) => {
      if (
        selectedBatch === "All Batches" ||
        student.batch === selectedBatch
      ) {
        return { ...student, status: "Present" };
      }
      return student;
    });

    setStudents(updatedStudents);
    setMessage("All students marked as Present!");
  };

  const markAllAbsent = () => {
    const updatedStudents = students.map((student) => {
      if (
        selectedBatch === "All Batches" ||
        student.batch === selectedBatch
      ) {
        return { ...student, status: "Absent" };
      }
      return student;
    });

    setStudents(updatedStudents);
    setMessage("All students marked as Absent!");
  };

  const saveAttendance = () => {
    setMessage(
      `Attendance saved successfully for ${selectedDate}!`
    );
  };

  const addStudent = (e) => {
    e.preventDefault();

    if (
      newStudent.rollNo === "" ||
      newStudent.name === "" ||
      newStudent.course === ""
    ) {
      setMessage("Please fill all student details!");
      return;
    }

    const studentData = {
      id: students.length + 1,
      rollNo: newStudent.rollNo,
      name: newStudent.name,
      batch: newStudent.batch,
      course: newStudent.course,
      status: "Absent",
    };

    setStudents([...students, studentData]);

    setNewStudent({
      rollNo: "",
      name: "",
      batch: "Batch A",
      course: "",
    });

    setMessage("New student added successfully!");
  };

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this student?"
    );

    if (confirmDelete) {
      const updatedStudents = students.filter(
        (student) => student.id !== id
      );

      setStudents(updatedStudents);
      setMessage("Student removed successfully!");
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>TrainTrack</h2>
          <p>Attendance System</p>
        </div>

        <nav>
          <a href="#dashboard" className="active-link">
            📊 Dashboard
          </a>
          <a href="#attendance">📝 Attendance</a>
          <a href="#students">👨‍🎓 Students</a>
          <a href="#reports">📄 Reports</a>
          <a href="#settings">⚙️ Settings</a>
        </nav>

        <div className="trainer-info">
          <p>Trainer</p>
          <h4>Rakshitha V</h4>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div>
            <h1>Trainer Session Attendance Dashboard</h1>
            <p>Manage daily attendance across training batches</p>
          </div>

          <div className="profile-box">
            <span className="profile-icon">RV</span>
            <div>
              <h4>Rakshitha V</h4>
              <p>Training Manager</p>
            </div>
          </div>
        </header>

        {message && (
          <div className="message-box">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}

        <section className="filter-section">
          <div className="filter-box">
            <label>Select Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option>All Batches</option>
              <option>Batch A</option>
              <option>Batch B</option>
              <option>Batch C</option>
            </select>
          </div>

          <div className="filter-box">
            <label>Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="filter-box search-box">
            <label>Search Student</label>
            <input
              type="text"
              placeholder="Search by name or roll no"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </section>

        <section className="summary-cards">
          <div className="summary-card total-card">
            <div className="card-icon">👨‍🎓</div>
            <div>
              <p>Total Students</p>
              <h2>{totalStudents}</h2>
            </div>
          </div>

          <div className="summary-card present-card">
            <div className="card-icon">✅</div>
            <div>
              <p>Present</p>
              <h2>{presentStudents}</h2>
            </div>
          </div>

          <div className="summary-card absent-card">
            <div className="card-icon">❌</div>
            <div>
              <p>Absent</p>
              <h2>{absentStudents}</h2>
            </div>
          </div>

          <div className="summary-card percentage-card">
            <div className="card-icon">📈</div>
            <div>
              <p>Attendance</p>
              <h2>{attendancePercentage}%</h2>
            </div>
          </div>
        </section>

        <section className="progress-section">
          <div className="progress-title">
            <h3>Overall Attendance Percentage</h3>
            <span>{attendancePercentage}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </section>

        <section className="attendance-section" id="attendance">
          <div className="section-header">
            <div>
              <h2>Student Attendance List</h2>
              <p>
                Batch: <b>{selectedBatch}</b> | Date: <b>{selectedDate}</b>
              </p>
            </div>

            <div className="action-buttons">
              <button className="all-present-btn" onClick={markAllPresent}>
                Mark All Present
              </button>

              <button className="all-absent-btn" onClick={markAllAbsent}>
                Mark All Absent
              </button>

              <button className="save-btn" onClick={saveAttendance}>
                Save Attendance
              </button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Batch</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Mark Attendance</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.rollNo}</td>
                      <td className="student-name">{student.name}</td>
                      <td>{student.batch}</td>
                      <td>{student.course}</td>
                      <td>
                        <span
                          className={
                            student.status === "Present"
                              ? "status present-status"
                              : "status absent-status"
                          }
                        >
                          {student.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="present-btn"
                          onClick={() =>
                            markAttendance(student.id, "Present")
                          }
                        >
                          Present
                        </button>

                        <button
                          className="absent-btn"
                          onClick={() =>
                            markAttendance(student.id, "Absent")
                          }
                        >
                          Absent
                        </button>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="add-student-section" id="students">
          <h2>Add New Student</h2>

          <form onSubmit={addStudent} className="student-form">
            <input
              type="text"
              placeholder="Roll Number"
              value={newStudent.rollNo}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  rollNo: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  name: e.target.value,
                })
              }
            />

            <select
              value={newStudent.batch}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  batch: e.target.value,
                })
              }
            >
              <option>Batch A</option>
              <option>Batch B</option>
              <option>Batch C</option>
            </select>

            <input
              type="text"
              placeholder="Course Name"
              value={newStudent.course}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  course: e.target.value,
                })
              }
            />

            <button type="submit" className="add-btn">
              Add Student
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;