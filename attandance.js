const express = require("express")
const employeeTable = require("./employeeTable")

const router = express.Router();

router.post('/', async (req, res) => {
    const {id, attendance } = req.body
    if (!id) {
        return res.status(400).json({ "error": "employe id not found." })
    }

    const attendanceEmp = employeeTable.update({
        "attendance": attendance
    }, { where: { id } })

    return res
        .status(200)
        .json({ message: "Employee attendance added" });
})

module.exports = router;