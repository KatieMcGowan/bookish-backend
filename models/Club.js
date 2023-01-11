const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  clubname: String,
  description: String,
  meetup: String,
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  members: [ { type: Schema.Types.ObjectId, ref: "User" } ],
  nextbook: Boolean,
  currentbook: { type: Schema.Types.ObjectId, ref: "Book" },
  pastbooks: [ { type: Schema.Types.ObjectId, ref: "Book" } ],
  questions: [ { type: String } ],
  userscompleted: [ { type: Schema.Types.ObjectId, ref: "User"} ],
  nominations: [ { type: Schema.Types.ObjectId, ref: "Book" } ],
})

const User = mongoose.model("Club", ClubSchema);

module.exports = User;