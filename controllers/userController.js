const db = require("../models");

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
  db.User.create(req.body, (err, savedUser) => {
    if (err) console.log("Error with User create", err)
    res.status(201).json({user: savedUser})
  });
};

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