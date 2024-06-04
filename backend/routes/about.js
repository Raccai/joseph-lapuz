const express = require("express");

const {
  getAbout,
  getAboutAdmin,
  addAbout,
  updateAbout
} = require("../controllers/aboutController")

const router = express.Router();

// get about information at /About
router.get("/About", getAbout)

// get about information at /Admin
router.get("/Admin/About", getAboutAdmin)

// add about information
router.post("/Admin/About", addAbout)

// update about information
router.patch("/Admin/About", updateAbout)

module.exports = router;