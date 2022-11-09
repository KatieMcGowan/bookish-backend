const router = require("express").Router()
const ctrl = require("../controllers")

router.get("/", ctrl.clubs.index);
router.get("/adminshow/:id", ctrl.clubs.adminshow)
router.get("/membershow/:id", ctrl.clubs.membershow)
router.put("/requestinvite/:id", ctrl.clubs.requestinvite)
router.get("/sortclubs/:id", ctrl.clubs.sortclubs)
router.put("/addquestion/:id", ctrl.clubs.addquestion)
router.put("/finishbook/:id", ctrl.clubs.finishbook)
router.put("/nominatebook/:id", ctrl.clubs.nominatebook)
router.put("/initiatevote/:id", ctrl.clubs.initiatevote)
router.get("/:id", ctrl.clubs.show);
router.post("/", ctrl.clubs.create);
router.put("/:id", ctrl.clubs.update);
router.delete("/:id", ctrl.books.destroy)

module.exports = router;