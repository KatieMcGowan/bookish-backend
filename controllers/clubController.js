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
  db.Club.findOne({clubname: req.body.clubname})
  .then((club) => {
    if (club) {
      res.status(500).send({
        errorcode: 1
      })
      return;
    } else {  
      db.Club.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedClub) => {
        if (err) console.log("Error in Club update", err)
        res.status(200).json({club: updatedClub})
      });
    };
  });  
};

const updateArray = (req, res) => {
  db.Club.findById(req.params.id, (err, foundClub) => {
    if (err) console.log("Error with update array")
    if ("member" in req.body) {
      foundClub.members.push(req.body.member)
      foundClub.save((err, savedClub) => {
        res.status(200).json({club: savedClub})
      })
    } else if ("pastbook" in req.body) {
      foundClub.pastbooks.push(req.body.pastbook)
      foundClub.save((err, savedClub) => {
        res.status(200).json({club: savedClub})
      })
    } else if ("question" in req.body) {
      foundClub.questions.push(req.body.question)
      foundClub.save((err, savedClub) => {
        res.status(200).json({club: savedClub})
      })
    } else if ("usercompleted" in req.body) {
      foundClub.userscompleted.push(req.body.usercompleted)
      // console.log(foundClub);
      foundClub.save((err, savedClub) => {
        if (err) console.log(err)
        res.status(200).json({club: savedClub})
      })
    } else if ("nomination" in req.body) {
      foundClub.nominations.push(req.body.nomination)
      foundClub.save((err, savedClub) => {
        res.status(200).json({club: savedClub})
      });
    };
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
  create,
  show,
  update,
  updateArray,
  destroy,
};