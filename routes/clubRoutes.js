const router = require("express").Router()
const ctrl = require("../controllers")

router.get("/", ctrl.clubs.index);
router.post("/", ctrl.clubs.create);
router.put("/updatearray/:id", ctrl.clubs.updateArray);
router.put("/deletefromarray/:id", ctrl.clubs.deleteFromArray)
router.get("/:id", ctrl.clubs.show);
router.put("/:id", ctrl.clubs.update);
router.delete("/:id", ctrl.clubs.destroy)

module.exports = router;