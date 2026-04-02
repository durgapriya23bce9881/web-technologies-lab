import React from "react";
import StudentCard from "./components/StudentCard";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Student Details</h1>

      <StudentCard name="John Doe" department="CSE" marks="85" />
      <StudentCard name="Alice Smith" department="ECE" marks="90" />
      <StudentCard name="Rahul Kumar" department="ME" marks="78" />
      <StudentCard name="Priya Sharma" department="IT" marks="92" />
    </div>
  );
}

export default App;