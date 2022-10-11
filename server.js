//DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000
const routes = require("./routes");

//MIDDLEWARE
app.use(express.json())
app.use(cors());

//ROUTES
// app.use("/users", routes.users)
// app.use("/clubs", routes.clubs)

//LISTENER
app.listen(PORT, () => console.log(`Listening on ${PORT}`))