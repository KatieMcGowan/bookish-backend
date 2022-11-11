const db = require("../models");

const index = (req, res) => {
  db.Book.find({}, (err, foundBooks) => {
    if (err) console.log("Error with Book index", err)
    if (!foundBooks) return res.json({
      message: "No Books found in database"
    });
    res.status(200).json({books: foundBooks})
  });
};

const show = (req, res) => {
  db.Book.findById(req.params.id, (err, foundBook) => {
    if (err) console.log("Error with Book show");
    if (!foundBook) return res.json({
      message: "Book not found in database"
    });
    res.status(200).json({book: foundBook})
  });
};

const create = (req, res) => {
  db.Book.create(req.body, (err, savedBook) => {
    if (err) console.log("Error with Book create", err)
    res.status(201).json({book: savedBook})
  });
}

//These may not be needed
const update = (req, res) => {
  db.Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBook) => {
    if (err) console.log("Error with Book update", err)
    res.status(200).json({book: updatedBook})
  });
};

const destroy = (req, res) => {
  db.Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    if (err) console.log("Error with Book delete", err)
    // db.Club.findOne({"currentbook": req.params.id}, (err, foundBook) => {
    //   foundClub.currentbook.remove(req.params.id);
    //   foundClub.save((err, updatedClub) => {
        res.status(200).json({book: deletedBook})
      });
  //   });
  // });
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};