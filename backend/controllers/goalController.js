const asyncHanlder = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const goalModel = require("../model/goalModel");
const userModel = require("../model/userModel");

// @desc        Get goals
// @Route       GET  /api/goals
// @access      Private
const getGoals = asyncHanlder(async (req, res) => {
  const goals = await goalModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });
  res.status(200).json(goals);
});
// @desc        Post goal
// @Route       POST  /api/goals
// @access      Private
const setGoal = asyncHanlder(async (req, res) => {
  if (!req.body.text) {
    throw new Error("please provide text field");
  }
  const goal = await goalModel.create({ ...req.body, user: req.user._id });
  if (!goal) throw new Error("Goal is not added...");
  res.status(200).json(goal);
});
// @desc        Update goal
// @Route       PUT  /api/goals/:id
// @access      Private
const updateGoal = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Goal not found!!");
  }
  const goal = await goalModel.findById(id);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }
  if (JSON.stringify(req.user._id) !== JSON.stringify(goal.user)) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  const updatedGoal = await goalModel.findByIdAndUpdate(id, { ...req.body });
  res.status(200).json(updatedGoal);
});
// @desc        Delete goal
// @Route       DELETE  /api/goals/:id
// @access      Private
const deleteGoal = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Goal not found!!");
  }
  const goal = await goalModel.findById(id);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }
  if (JSON.stringify(req.user._id) !== JSON.stringify(goal.user)) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  const deletedGoal = await goalModel.findOneAndDelete({ _id: id });
  res.status(200).json(deletedGoal);
});
// @desc        Get goal
// @Route       GET  /api/goals/:id
// @access      Private
const getGoal = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(401);
    throw new Error("Goal not found");
  }
  const goal = await goalModel.findById(id);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }
  if (JSON.stringify(req.user._id) !== JSON.stringify(goal.user)) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  res.status(200).json(goal);
});
module.exports = {
  getGoal,
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
