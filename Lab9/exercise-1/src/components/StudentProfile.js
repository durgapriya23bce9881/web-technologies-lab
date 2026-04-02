// src/components/StudentProfile.js

import React from "react";

function StudentProfile() {
  // Storing student details in variables
  const name = "Durga Priya";
  const department = "Computer Science";
  const year = "3rd Year";
  const section = "A";

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Section:</strong> {section}</p>
      </div>
    </div>
  );
}

export default StudentProfile;