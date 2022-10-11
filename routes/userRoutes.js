const router = require("express").Router()
const ctrl = require("../controllers")

router.get("/", ctrl.users.index);
router.get("/:id", ctrl.users.show);
router.post("/", ctrl.users.create);
// router.post("/register", ctrl.users.create);
router.put("/:id", ctrl.users.update);

// router.post("/register", (req, res) => {
//   bcrypt.hash(req.body.password, 10)
//   .then((hashedPassword) => {
//     const user = new User({
//       username: req.body.username,
//       password: hashedPassword
//     });
//     user.save()
//     .then((result) => {
//       res.status(201).send({
//         message: "User created successfully",
//         result,
//       });
//     })
//     .catch((error) => {
//       response.status(500).send({
//         message: "Error creating user",
//         error,
//       })
//     })
//   })
//   .catch((e) => {
//     response.status(500).send({
//       message: "Password was not hased successfully", e,
//     })
//   })
// })

module.exports = router;