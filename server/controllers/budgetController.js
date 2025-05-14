const { where } = require("sequelize");
const db = require("../models");
const Budget = db.budget;

const createBudget = async (req, res) => {
  const body = req.body;
  try {
    const createdBudget = await Budget.create({
      user_id: body.userId,
      bugetId: body.id,
      budgetName: body.name,
      budget: body.budget,
      spent: body.spent,
      color: body.color,
    });
    const budgetData = createdBudget.toJSON();
    return res.status(201).send(budgetData);
  } catch (err) {
    return console.log("Error");
  }
};

getAllBudgetsByUserId = async (req, res) => {
  try {
    const userid = req.params.id;
    //console.log("Useris ", userid);

    const budgets = await Budget.findAll({
      where: { user_id: userid },
    });

    if (budgets.length > 0) {
      const results = budgets.map((budget) => {
        const result = budget.toJSON();
        delete result.user_id;
        delete result.id;
        return budget;
      });
      return res.status(200).send(results);
    } else {
      return res
        .status(200)
        .json({ message: "No Budgets found for this user" });
    }
  } catch (err) {
    return res.status(404).json({
      message: "Error found",
      Error: err.message,
    });
  }
};

const getBudgetById = async (req, res) => {
  try {
    const budgetid = req.params.id;
    const budget = await Budget.findOne({
      where: {
        bugetId: budgetid,
      },
    });
    if (budget) {
      return res.send(budget);
    } else {
      return res.send("Budget Not found");
    }
  } catch (err) {
    return res.status(404).json({
      message: "Error found",
      Error: err.message,
    });
  }
};

module.exports = { createBudget, getBudgetById, getAllBudgetsByUserId };
