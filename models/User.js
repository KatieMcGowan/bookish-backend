const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayname: String,
  username: {type: String, required: true, unique: true},
  password: String,
  clubsadmin: [ { type: Schema.Types.ObjectId, ref: "Club" } ],
  clubsmember: [ { type: Schema.Types.ObjectId, ref: "Club" } ],
  invitesreceived: [ { type: Schema.Types.ObjectId, ref: "User"} ],
  invitessent: [ { type: Schema.Types.ObjectId, ref: "User"} ],
})

const User = mongoose.model("User", UserSchema);

module.exports = User;