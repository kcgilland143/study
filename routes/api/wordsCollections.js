const router = require("express").Router();
const wordCollectionController = require("../../controllers/wordCollectionController");
const authMiddleware = require('../../Auth').authMiddleware

// Matches with "/api/books"
router.route("/")
  .get(wordCollectionController.findAll)
  .post(authMiddleware, wordCollectionController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(wordCollectionController.findById)
  .put(authMiddleware, wordCollectionController.update)
  .delete(authMiddleware, wordCollectionController.remove);

module.exports = router;