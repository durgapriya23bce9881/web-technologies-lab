function createStudent(){

    // Getting user input
    const id = Number(document.getElementById("id").value);
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const marks = Number(document.getElementById("marks").value);

    // Creating student object
    const student = {
        id,
        name,
        department,
        marks
    };

    // Object destructuring
    const {id: studentId, name: studentName, department: dept, marks: studentMarks} = student;

    let firstLine = `${studentId} ${studentName} ${dept} ${studentMarks}`;

    console.log(firstLine);

    // Grade calculation
    let grade;

    if(studentMarks >= 90){
        grade = "A";
    }
    else if(studentMarks >= 75){
        grade = "B";
    }
    else if(studentMarks >= 50){
        grade = "C";
    }
    else{
        grade = "F";
    }

    // Spread operator
    const updatedStudent = {
        ...student,
        grade
    };

    console.log(updatedStudent);

    let secondLine = `{ id: ${updatedStudent.id}, name: '${updatedStudent.name}', department: '${updatedStudent.department}', marks: ${updatedStudent.marks}, grade: '${updatedStudent.grade}' }`;

    document.getElementById("output").innerHTML = `
        <span class="success">${firstLine}</span><br><br>
        ${secondLine}
    `;
}