const router = require("express").Router();
const wordController = require("../../controllers/wordController");

// Matches with "/api/books"
router.route("/")
  .get(wordController.findAll)
  .post(wordController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(wordController.findById)
  .put(wordController.update)
  .delete(wordController.remove);

module.exports = router;