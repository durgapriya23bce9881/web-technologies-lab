import React from "react";

function StudentCard(props) {
  return (
    <div className="card">
      <h2 className="name">{props.name}</h2>
      
      <div className="details">
        <p><span>Department:</span> {props.department}</p>
        <p><span>Marks:</span> {props.marks}</p>
      </div>
    </div>
  );
}

export default StudentCard;