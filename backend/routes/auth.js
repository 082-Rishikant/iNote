const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // it is used for password hashing 
const jwt = require('jsonwebtoken');

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

    // hashing of password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    // create A new User
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword
    })

    // returning user id in Token
    const JWT_secret = "Rishiisa@boy";
    const data = { id: user.id };
    const auth_token = jwt.sign(data, JWT_secret);
    res.json({ auth_token });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})


// Login a User using credential.  "/api/auth/login".   NO Login Required.
router.post('/login', [
  body('email', 'Enter valid email').isEmail(),
  body('password', 'password can not be blank').exists(),
], async (req, res) => {
  // Check for vaidation according to the rule defined at line no. 53, 54;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructure the email and password from body request
  const { email, password } = req.body;

  try {
    // Checking whether email is exist or not 
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login using correct credentials" });
    }

    // Now Comparing password with help of bcryptjs
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res.status(400).json({ error: "Please try to login using correct credentials" });
    }

    // Now if user enter coorect password and login then user got logged in;
    // And We will send authtoken to user;
    // returning user id in Token
    const JWT_secret = "Rishiisa@boy";
    const data = { id: user.id };
    const auth_token = jwt.sign(data, JWT_secret);
    res.json({ auth_token });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})

module.exports = router