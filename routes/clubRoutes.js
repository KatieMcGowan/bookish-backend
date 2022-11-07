const router = require("express").Router()
const ctrl = require("../controllers")

router.get("/", ctrl.clubs.index);
router.get("/adminshow/:id", ctrl.clubs.adminshow)
router.get("/membershow/:id", ctrl.clubs.membershow)
router.put("/requestinvite/:id", ctrl.clubs.requestinvite)
router.get("/sortclubs/:id", ctrl.clubs.sortclubs)
router.put("/addquestion/:id", ctrl.clubs.addquestion)
router.get("/:id", ctrl.clubs.show);
router.post("/", ctrl.clubs.create);
router.put("/:id", ctrl.clubs.update);

module.exports = router;