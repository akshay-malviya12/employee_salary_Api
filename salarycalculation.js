const express = require("express")
const employeeTable = require("./employeeTable")

const router = express.Router();

const taxCalculation = (salary) => {
    if (salary <= 250000) { return 0 }
    else if (salary <= 500000) { return (salary - 250000) * 0.05 }
    else if (salary <= 1000000) { return (salary - 500000) * 0.02 + 12500 }
}

router.post('/calculate', async (req, res) => {
    const { id, Full_Days, Half_Days } = req.body
    if (!id) {
        return res.status(400).json({ "error": "employee details not found." })
    }

    const employee = await employeeTable.findOne({ where: { id } })

    if (employee.role !== 'HR') {
        return res.status(400).json({ "error": "onlyy hr calculate salary" })
    }
    const totalWorkingDayas = 30
    const Gross_Salary = employee.basic_salary + employee.HRA + employee.allowances
    const tax = taxCalculation(Gross_Salary)
    const PF_Deduction = (employee.basic_salary * 12) / 100
    const Daily_Wage = Gross_Salary / totalWorkingDayas
    const Full_Day_Salary = Daily_Wage
    const Half_Day_Salary = employee.dailyWorkingHours > 8 ? Half_Day_Salary = Daily_Wage / 2 : 1

    const Total_Salary = (Full_Days * Full_Day_Salary) + (Half_Days * Half_Day_Salary)
    const Net_Salary = Total_Salary - tax - PF_Deduction

    const salary = employeeTable.update({
        "tax": tax
    }, { where: { id } })

    return res
        .status(200)
        .json({ message: "Total salary after deduction is :" + Net_Salary });
})


router.get('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ error: "please enter months details." });
    }

    const monthformate = `${month}`
    const salaryEmpMonths = await employeeTable.findOne({
        where: {
            id: employeeId,
            month: monthformate
        }
    });
    return res
        .status(200)
        .json({ "Self employee salary moths based": salaryEmpMonths })
})

module.exports = router;