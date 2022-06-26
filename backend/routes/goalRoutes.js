const express = require("express");
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  getGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal);

module.exports = router;
