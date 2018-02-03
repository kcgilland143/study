const router = require("express").Router();
const bookRoutes = require("./books");
const wordBankRoutes = require("./wordsCollections");
const wordRoutes = require("./words")


// Book routes
router.use("/books", bookRoutes);
router.use("/wordBanks", wordBankRoutes);
router.use("/words", wordRoutes);

module.exports = router;
