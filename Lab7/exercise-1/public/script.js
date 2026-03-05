const api = "http://localhost:3000/notes";


/* ADD NOTE */
function addNote(){

let title = document.getElementById("title").value;
let subject = document.getElementById("subject").value;
let description = document.getElementById("description").value;

fetch(api,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:title,
subject:subject,
description:description
})
})
.then(res=>res.json())
.then(data=>{
loadNotes();
});

}


/* VIEW NOTES */
function loadNotes(){

fetch(api)
.then(res=>res.json())
.then(data=>{

let output="";

data.forEach(note=>{

output+=`

<div class="note">
<h3>${note.title}</h3>
<p><b>Subject:</b> ${note.subject}</p>
<p>${note.description}</p>

<button onclick="deleteNote('${note._id}')">Delete</button>

<button onclick="updateNote('${note._id}')">Update</button>

</div>

`;

});

document.getElementById("notes").innerHTML=output;

});

}

loadNotes();



/* DELETE */
function deleteNote(id){

fetch(api+"/"+id,{
method:"DELETE"
})
.then(res=>res.json())
.then(data=>{
loadNotes();
});

}



/* UPDATE */
function updateNote(id){

let newTitle = prompt("Enter new title");
let newDesc = prompt("Enter new description");

fetch(api+"/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:newTitle,
description:newDesc
})
})
.then(res=>res.json())
.then(data=>{
loadNotes();
});

}