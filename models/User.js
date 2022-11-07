const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  clubsadmin: [ { type: Schema.Types.ObjectId, ref: "Club" } ],
  clubsmember: [ { type: Schema.Types.ObjectId, ref: "Club" } ],
  clubinvitesreceived: [ { type: Schema.Types.ObjectId, ref: "Club"} ],
  userinvitessent: [ { type: Schema.Types.ObjectId, ref: "User"} ],
})

const User = mongoose.model("User", UserSchema);

module.exports = User;