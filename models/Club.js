const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  clubname: String,
  description: String,
  meetup: String,
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  members: [ { type: Schema.Types.ObjectId, ref: "User" } ],
  invitedmembers: [ { type: Schema.Types.ObjectId, ref: "User" } ],
  usersrequestedinvite: [ { type: Schema.Types.ObjectId, ref: "User" } ],
  currentbook: String,
  pastbooks: [ String ],
  questions: [ String ],
  userscompleted: [ { type: Schema.Types.ObjectId, ref: "User"} ],
  nominations: [ String ],
  transition: Boolean,
})

const User = mongoose.model("Club", ClubSchema);

module.exports = User;