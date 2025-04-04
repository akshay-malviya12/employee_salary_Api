const express = require("express")
const employee = require("./employeeTable")

const router = express.Router();


router.post('/', async (req, res) => {

    const { basic_salary, HRA, allowances, role, workingHours, deductions, attendance } = req.body

    if (!basic_salary || !HRA || !allowances || !role || !workingHours || !deductions || !attendance) {
        return res.status(400).json("please fill all require fields. ")
    }

    const employeeTable = employee.create({
        "basic_salary": basic_salary,
        "HRA": HRA,
        "allowances": allowances,
        "role": role,
        "workingHours": workingHours,
        "deductions": deductions,
        "attendance": attendance,
        "tax": 0,
        "PF": 0,
        "month": 0
    })

    return res
        .status(200)
        .json({ "message": "employee details added successfully." })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const singleEmployee =await employee.findOne({ where: { "id": id } })
    
    return res
        .status(200)
        .json({ "employee": singleEmployee })
})

module.exports = router;