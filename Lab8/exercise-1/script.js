// Arrow function using ES6
const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
};

function calculateMarks(){

    // Getting user inputs
    let studentName = document.getElementById("name").value;

    let mark1 = Number(document.getElementById("mark1").value);
    let mark2 = Number(document.getElementById("mark2").value);
    let mark3 = Number(document.getElementById("mark3").value);

    let total = mark1 + mark2 + mark3;

    // Calculating average using arrow function
    let average = calculateAverage(mark1, mark2, mark3);

    // Template literals
    let output = `
        Student Name: ${studentName} <br><br>
        Total Marks: ${total} <br><br>
        Average Marks: ${average.toFixed(2)}
    `;

    document.getElementById("result").innerHTML = output;

    // Console output
    console.log(`Student Name: ${studentName}`);
    console.log(`Total Marks: ${total}`);
    console.log(`Average Marks: ${average.toFixed(2)}`);
}