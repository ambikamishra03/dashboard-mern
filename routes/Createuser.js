const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "mynameisambikamishra";
const bcrypt = require("bcrypt");

//  for signup user
router.post(
  "/creatuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        username: req.body.username,
        geolocation: req.body.location,
        mobile: req.body.mobile,
        email: req.body.email,
        password: securePassword,
        occupation: req.body.occupation
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// //   for login user
router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const email = req.body.email;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Oops! try login failed with correct credentials." });
      }

      const pswCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pswCompare) {
        return res
          .status(400)
          .json({ errors: "Oops! try login failed with correct credentials." });
      }
      const data = {
        user: {
          // sending id from database
          id: userData.id,
        },
      };

      //  Authentication
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.get('/getuser', async (req, res) => {
  try {
    // Fetch user data from your database (assuming you have a User model)
    const userData = await User.findOne({ /* your query criteria here */ });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {       
       name,
      username,
      location,
      mobile,
      email,
      password,
      occupation
} = userData;

    // Create a user object with the extracted data
    const userDataObject = {
      name,
      username,
      location,
      mobile,
      email,
      password,
      occupation
    };

    // Send the user data as JSON response
    res.json(userDataObject);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
