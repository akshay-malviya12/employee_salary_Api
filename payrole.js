const express = require('express');
const router = express.Router();
const employeeTable = require("./employeeTable")

router.post('/distribute', async (req, res) => {

    const { month } = req.body;
    if (!month) {
        return res.status(400).json({ error: "please enter months details." });
    }

    const monthformate = `${month}`
    const PayrollDistribute = await employeeTable.findOne({
        where: {
            month: monthformate
        }
    });

    return res
        .status(200)
        .json({ "Payroll distributed": PayrollDistribute })
})



router.get('/history', async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ error: "please enter months details." });
    }

    const monthformate = `${month}`
    const payrollHistory = await employeeTable.findOne({
        where: {
            month: monthformate
        }
    });
    return res
        .status(200)
        .json({ "Payroll History": payrollHistory })

})
module.exports = router;