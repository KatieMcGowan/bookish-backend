//DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || process.env.URL;
const routes = require("./routes");

//MIDDLEWARE
app.use(express.json())
app.use(cors({
  origin: "https://bookish-9kgt.onrender.com"
}));

//ROUTES
app.use("/users", routes.users)
app.use("/clubs", routes.clubs)
app.use("/books", routes.books)

app.get("/", (req, res) => {
  res.send("<h1>Bookish API</h1>")
})

//CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

//LISTENER
app.listen(PORT, () => console.log(`Listening on ${PORT}`))