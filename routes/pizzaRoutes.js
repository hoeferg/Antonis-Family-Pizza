const express = require("express");
const router = express.Router();
const {
  getPizzas,
  addPizza,
  deletePizza,
  updatePizza,
} = require("../controllers/pizzaController");

router.get("/", getPizzas);
router.post("/", addPizza);
router.delete("/:id", deletePizza);
router.put("/:id", updatePizza);

module.exports = router;
