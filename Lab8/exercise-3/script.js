// ES6 Class
class Course {

    constructor(courseName, instructor){
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse(){
        return `Course: ${this.courseName}, Instructor: ${this.instructor}`;
    }

}

// store seats for each course
let courseSeats = {};

function enroll(){

    let courseName = document.getElementById("courseName").value;
    let instructor = document.getElementById("instructor").value;

    let course1 = new Course(courseName, instructor);

    let courseDetails = course1.displayCourse();

    console.log(courseDetails);

    // initialize seats only if course does not exist
    if(courseSeats[courseName] === undefined){
        courseSeats[courseName] = 3; //For each course 3 seats were initialized
    }

    let enrollCourse = new Promise((resolve, reject)=>{

        if(courseSeats[courseName] > 0){

            courseSeats[courseName]--;

            resolve("Enrollment Successful");

        }
        else{

            reject("Course Full");

        }

    });

    enrollCourse
    .then(msg => {

    document.getElementById("output").innerHTML =
    `${courseDetails} <br><br>
    <span class="success">${msg}</span> <br>
    Seats Left: ${courseSeats[courseName]}`;

})
.catch(err => {

    document.getElementById("output").innerHTML =
    `${courseDetails} <br><br>
    <span class="error">${err}</span>`;

});

}