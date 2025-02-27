const express = require("express");
const router = express.Router();
const {
  getToppings,
  addTopping,
  deleteTopping,
  updateTopping,
} = require("../controllers/toppingController");

router.get("/", getToppings);
router.post("/", addTopping);
router.delete("/:id", deleteTopping);
router.put("/:id", updateTopping);

module.exports = router;
