const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const config = require("./config");
require("dotenv").config();

const index = (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) console.log("Error with User index", err)
    if (!foundUsers) return res.json({
      message: "No Users found in database"
    });
    res.status(200).json({users: foundUsers})
  });
};

const getid = (req, res) => {
  let token = req.body.token
  if (!token) {
    return res.status(401).send({auth: false, message: "No token provided."})
  }  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth: false, message: "Failed to authenticate token."})
    }  
    res.status(200).send(decoded)
  })
}

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
  let lowerCaseUser = req.body.username.toLowerCase()
  db.User.findOne({username: lowerCaseUser})
  .then((user) => {
    if (user) {
      res.status(500).send({
        errorcode: 1
      })
      return;
    } else {
      bcrypt.hash(req.body.password, 10)
      .then((hashedPassword) => {
        db.User.create({
          displayname: req.body.displayname,
          username: lowerCaseUser,
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
  })
}    

const verify = (req, res) => {
  let lowerCaseUser = req.body.username.toLowerCase()
  db.User.findOne({ username: lowerCaseUser })
  .then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then((passwordCheck) => {
      if(!passwordCheck) {
        return res.status(400).send({
          errorcode: 1,
          message: "Passwords do not match, password check failed",
        })
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userName: user.username,
          userDisplayName: user.displayname
        },
        process.env.SECRET, 
        { expiresIn: "24h" }
      )
      res.status(200).send({
        message: "Login successful",
        id: user.id,
        token,
      })
    })
    .catch((error) => {
      res.status(400).send({
        errorcode: 1,
        message: "Passwords do not match, password check surpassed",
        error,
      })
      console.log(error);
    })
  })
  .catch((e) => {
    res.status(404).send({
      message: "Username not found",
      errorcode: 1,
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

const updateArray = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log("Error with User update array")
    if ("clubadmin" in req.body) {
      foundUser.clubsadmin.push(req.body.clubadmin)
      foundUser.save((err, savedUser) => {
        res.status(200).json({user: savedUser})
      })
    } else if ("clubmember" in req.body) {
      foundUser.clubsmember.push(req.body.clubmember)
      foundUser.save((err, savedUser) => {
        res.status(200).json({user: savedUser})
      });
    };
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  updateArray,
  verify,
  getid,
  freeEndpoint,
  authEndpoint,
}