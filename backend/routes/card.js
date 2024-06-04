const express = require("express");

const {
  getCards,
  getCardsAdmin,
  getCard,
  addCard,
  updateCard
} = require("../controllers/cardController")

const router = express.Router();

// get cards information at /About
router.get("/Cards", getCards)

// get cards information at /Admin
router.get("/Admin/Cards", getCardsAdmin)

// get one card's information at /Admin
router.get("/Admin/Cards/:id", getCard)

// add cards information
router.post("/Admin/Cards", addCard)

// update cards information
router.patch("/Admin/Cards/:id", updateCard)

module.exports = router;