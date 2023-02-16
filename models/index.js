require("dotenv").config();
const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI

const configOptions = {
  useNewUrlParser: true,
};

mongoose.connect(connectionString, configOptions)
  .then(() => console.log('MongoDB successfully connected.'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = ({
  User: require("./User"),
  Club: require("./Club"),
  Book: require("./Book"),
})