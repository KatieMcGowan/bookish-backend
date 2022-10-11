const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/bookish"

const configOptions = {
  useNewUrlParser: true,
};

mongoose.connect(connectionString, configOptions)
  .then(() => console.log('MongoDB successfully connected.'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = ({
  User: require("./User"),
  Club: require("./Club"),
})