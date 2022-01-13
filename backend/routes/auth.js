const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using :POST.  "/api/auth/createuser".   NO Login Required.
router.post('/createuser', [
  body('email', 'Enter valid email').isEmail(),
  body('name', 'Enter valid email').isLength({ min: 3 }),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  // Check fo vaidation whether is any rule(defined in User model) breaked or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check Whether user with same email id exist or not
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry user with same email id already exist" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some erroe occured");
  }
})

module.exports = router