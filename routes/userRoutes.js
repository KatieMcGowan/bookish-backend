const router = require("express").Router()
const ctrl = require("../controllers")
const auth = require("../auth")

router.get("/", ctrl.users.index);
router.get("/free-endpoint", ctrl.users.freeEndpoint)
router.get("/auth-endpoint", auth, ctrl.users.authEndpoint)
router.get("/:id", ctrl.users.show);
router.post("/", ctrl.users.create);
router.post("/login", ctrl.users.verify)
router.post("/getid", ctrl.users.getid)
router.put("/:id", ctrl.users.update);

module.exports = router;