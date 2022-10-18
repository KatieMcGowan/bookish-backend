const router = require("express").Router()
const ctrl = require("../controllers")

router.get("/", ctrl.clubs.index);
router.get("/adminshow/:id", ctrl.clubs.adminshow)
router.get("/membershow/:id", ctrl.clubs.membershow)
router.get("/:id", ctrl.clubs.show);
router.post("/", ctrl.clubs.create);
router.put("/:id", ctrl.clubs.update);

module.exports = router;