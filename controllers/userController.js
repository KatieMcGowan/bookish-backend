const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const index = (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) console.log("Error with User index", err)
    if (!foundUsers) return res.json({
      message: "No Users found in database"
    });
    res.status(200).json({users: foundUsers})
  });
};

const show = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log("Error with User show");
    if (!foundUser) return res.json({
      message: "User not found in database"
    });
    res.status(200).json({user: foundUser})
  });
};

const create = (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then((hashedPassword) => {
    db.User.create({
      username: req.body.username,
      password: hashedPassword
    })
    .then((result) => {
      res.status(201).send({
        message: "User created successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      })
    })
  })
  .catch((e) => {
    res.status(500).send({
      message: "Password was not hashed successfully", e,
    })
  })
}

const verify = (req, res) => {
  db.User.findOne({ username: req.body.username })
  .then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then((passwordCheck) => {
      if(!passwordCheck) {
        return res.status(400).send({
          message: "Passwords do not match",
          error,
        })
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userName: user.username
        },
        "RANDOM-TOKEN", 
        { expiresIn: "24h" }
      )
      res.status(200).send({
        message: "Login successful",
        username: user.username,
        token,
      })
    })
    .catch((error) => {
      res.status(400).send({
        message: "Passwords do not match",
        error,
      })
    })
  })
  .catch((e) => {
    res.status(404).send({
      message: "Username not found",
      e,
    })
  })
}

const freeEndpoint = (req, res) => {
  res.json({ message: "Free access" })
}

const authEndpoint = (req, res) => {
  res.json({ message: "Authorized access" })
}

const update = (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) console.log("Error in User update", err)
    res.status(200).json({request: updatedUser})
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  verify,
  freeEndpoint,
  authEndpoint,
}