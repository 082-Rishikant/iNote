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

module.exports = router