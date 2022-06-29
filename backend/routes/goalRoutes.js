const express = require("express");
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  getGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getGoals).post(protect,setGoal);
router.route('/:id').get( protect,getGoal).put(protect,updateGoal).delete(protect,deleteGoal);

module.exports = router;
