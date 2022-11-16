const router = require("express").Router()
const ctrl = require("../controllers")

router.get("/", ctrl.books.index);
router.get("/searchtitle", ctrl.books.searchTitle)
router.get("/searchauthor", ctrl.books.searchAuthor)
router.get("/:id", ctrl.books.show);
router.post("/", ctrl.books.create);
router.put("/:id", ctrl.books.update);
router.delete("/:id", ctrl.books.destroy)


module.exports = router;