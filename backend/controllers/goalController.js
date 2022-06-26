const asyncHanlder = require('express-async-handler');
const goalModel = require('../model/goalModel');
// @desc        Get goals
// @Route       GET  /api/goals
// @access      Private
const getGoals = asyncHanlder(async(req,res) => {
    const goals = await goalModel.find({}).sort({createdAt:-1});
    res.status(200).json(goals);
})
// @desc        Post goal
// @Route       POST  /api/goals
// @access      Private
const setGoal = asyncHanlder(async(req,res) => {
    if(!req.body.text) {
        throw new Error('please provide text field');
    }
    const goal = await goalModel.create({...req.body});
    if(!goal) throw new Error('Goal is not added...');
    res.status(200).json(goal);
})
// @desc        Update goal
// @Route       PUT  /api/goals/:id
// @access      Private
const updateGoal = asyncHanlder(async(req,res) => {
    const { id } = req.params;
    const goal = await goalModel.findOneAndUpdate({_id:id},{...req.body});
    if(!goal) {
        res.status(400);
        throw new Error('Goal is not updated!!');
    }
    res.status(200).json(goal);
})
// @desc        Delete goal
// @Route       DELETE  /api/goals/:id
// @access      Private
const deleteGoal = asyncHanlder(async(req,res) => {
    const { id } = req.params;
    const goal = await goalModel.findOneAndDelete({_id:id});
    if(!goal) {
        res.status(400);
        throw new Error('Goal is not deleted successfully...');
    }
    res.status(200).json(goal);
})
// @desc        Get goal
// @Route       GET  /api/goals/:id
// @access      Private
const getGoal = asyncHanlder(async(req,res) => {
    const { id } = req.params;
    const goal = await goalModel.find({ _id: id });
    if(!goal) {
        res.status(400);
        throw new Error('Goal not found!!');
    }
    res.status(200).json(goal);
})
module.exports = {
    getGoal,
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}