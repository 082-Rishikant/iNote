const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Router 1: Get all notes of user using:GET   '/api/notes/fetchallnotes'   Login required;
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({ notes });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Router 2: Add a note using:POST   '/api/notes/addnote'   Login required;
router.post('/addnote', fetchuser,
  [
    body('title', 'title must be of 3 characters').isLength({ min: 3 }),
    body('description', 'description must be of 3 characters').isLength({ min: 5 })
  ], async (req, res) => {
    // Check fo vaidation whether is any rule(defined in User model) breaked or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // De-structuring the note send in request by user by filling the form
      const { description, title, tag } = req.body;
      // Make a new note using new keyword
      const note = new Note({ description, tag, title, user: req.user.id });
      // Now save it to database
      const savedNotes = await note.save();
      res.send(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

// Router 3: Update an existing Note using:PUT   '/api/notes/updatenote/:id'   Login required;
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // De-strucure the request body that contain info to update note
    // Making a note that will replace old existing note
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    // checking whether note exist or not, If exist then Update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // checking whether user owns this Note or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    // finaly updating the existing note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Router 4: Delete an existing Note using:DELTE   '/api/notes/deletenote:id'   Login required;
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // checking whether note exist or not, If find then delete
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // checking whether user owns this note or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    // finaly Deleting the existing note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Delete":"Successfully Deleted",note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports = router;