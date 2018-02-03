const router = require("express").Router();
const wordCollectionController = require("../../controllers/wordCollectionController");

// Matches with "/api/books"
router.route("/")
  .get(wordCollectionController.findAll)
  .post(wordCollectionController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(wordCollectionController.findById)
  .put(wordCollectionController.update)
  .delete(wordCollectionController.remove);

module.exports = router;