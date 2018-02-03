const router = require("express").Router();
const bookRoutes = require("./books");
const wordRoutes = require("./wordsCollections");

// Book routes
router.use("/books", bookRoutes);
router.use("/words", wordRoutes);

module.exports = router;
