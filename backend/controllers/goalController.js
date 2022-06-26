const asyncHanlder = require('express-async-handler');
// @desc        Get goals
// @Route       GET  /api/goals
// @access      Private
const getGoals = asyncHanlder(async(req,res) => {
    res.json({mssg:"getGoals"})
})
// @desc        Post goal
// @Route       POST  /api/goals
// @access      Private
const setGoal = asyncHanlder(async(req,res) => {
    if(!req.body.text) {
        throw new Error('please provide text field');
    }
    res.json({mssg:"setGoals"});
})
// @desc        Update goal
// @Route       PUT  /api/goals/:id
// @access      Private
const updateGoal = asyncHanlder(async(req,res) => {
    res.json({mssg:"updateGoal"});
})
// @desc        Delete goal
// @Route       DELETE  /api/goals/:id
// @access      Private
const deleteGoal = asyncHanlder(async(req,res) => {
    res.json({mssg:"deleteGoal"});
})
// @desc        Get goal
// @Route       GET  /api/goals/:id
// @access      Private
const getGoal = asyncHanlder(async(req,res) => {
    res.json({mssg:"getGoal"});
})
module.exports = {
    getGoal,
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}