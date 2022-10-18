const db = require("../models")

const index = (req, res) => {
  db.Club.find({}, (err, foundClubs) => {
    if (err) console.log("Error with Club index", err)
    if (!foundClubs) return res.json({
      message: "No Clubs found in database"
    });
    res.status(200).json({clubs: foundClubs})
  });
};


const adminshow = (req, res) => {
  db.Club.find({admin: req.params.id}, (err, foundClubs) => {
    if (err) console.log("Error with admin show", err)
    if (!foundClubs) return res.json({
      message: "Admin clubs not found in database"
    });
    res.status(200).json({clubs: foundClubs})
  });
};

const membershow = (req, res) => {
  db.Club.find({members: req.params.id}, (err, foundClubs) => {
    if (err) console.log("Error with admin show", err)
    if (!foundClubs) return res.json({
      message: "Member clubs not found in database"
    });
    res.status(200).json({clubs: foundClubs})
  });
};

const show = (req, res) => {
  db.Club.findById(req.params.id, (err, foundClub) => {
    if (err) console.log("Error with Club show");
    if (!foundClub) return res.json({
      message: "Club not found in database"
    });
    res.status(200).json({club: foundClub})
  });
};

const create = (req, res) => {
  db.Club.findOne({clubname: req.body.clubname})
  .then((club) => {
    if (club) {
      res.status(500).send({
        errorcode: 1
      })
      return;
    } else {
      db.Club.create(req.body, (err, savedClub) => {
        if (err) console.log("Error with Club create", err)
        db.User.findById(req.body.admin, (err, foundUser) => {
          foundUser.clubsadmin.push(savedClub);
          foundUser.save((err, savedUser) => {
            res.status(201).json({club: savedClub})
          });
        });
      });
    };
  });    
};

const update = (req, res) => {
  db.Club.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedClub) => {
    if (err) console.log("Error in Club update", err)
    res.status(200).json({club: updatedClub})
  });
};

const destroy = (req, res) => {
  db.Club.findByIdAndDelete(req.params.id, (err, deletedClub) => {
    if (err) console.log("Error with Club delete", err)
    db.User.findOne({"clubs": req.params.id}, (err, foundUser) => {
      foundUser.Clubs.remove(req.params.id);
      foundUser.save((err, updatedUser) => {
        res.status(200).json({club: deletedClub})
      });
    });
  });
};

module.exports = {
  index,
  show,
  adminshow,
  membershow,
  create,
  update,
  destroy,
};