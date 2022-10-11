//DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000
const routes = require("./routes");
const bcrypt = require("bcrypt");
const { response } = require("express");
const { User } = require("./models");

//MIDDLEWARE
app.use(express.json())
app.use(cors());

//ROUTES
app.use("/users", routes.users)
app.use("/clubs", routes.clubs)

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then((hashedPassword) => {
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    user.save()
    .then((result) => {
      res.status(201).send({
        message: "User created successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        error,
      })
    })
  })
  .catch((e) => {
    response.status(500).send({
      message: "Password was not hased successfully", e,
    })
  })
})

//LISTENER
app.listen(PORT, () => console.log(`Listening on ${PORT}`))