const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const Note = require("./models/Note");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentNotes");

console.log("MongoDB Connected");

console.log("MongoDB Connected");



/* ADD NOTE */
app.post("/notes", async (req, res) => {

    const note = new Note({
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description
    });

    await note.save();

    res.json(note);
});



/* VIEW NOTES */
app.get("/notes", async (req, res) => {

    const notes = await Note.find();

    res.json(notes);
});



/* UPDATE NOTE */
app.put("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await Note.updateOne(
        {_id: id},
        {$set:{
            title:req.body.title,
            description:req.body.description
        }}
    );

    res.json({message:"Note updated"});
});



/* DELETE NOTE */
app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await Note.deleteOne({_id:id});

    res.json({message:"Note deleted"});
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});