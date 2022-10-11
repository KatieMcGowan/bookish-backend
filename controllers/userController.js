const db = require("../models");
const bcrypt = require("bcrypt")

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
}