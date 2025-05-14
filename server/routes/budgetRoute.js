const express = require("express");
const router = express.Router();
const {
  createBudget,
  getBudgetById,
  getAllBudgetsByUserId,
} = require("../controllers/budgetController.js");

router.post("/create-budget", createBudget);

router.get("/getBudgetByUserId/:id", getAllBudgetsByUserId);

router.get("/getBudgetById/:id", getBudgetById);

module.exports = router;
