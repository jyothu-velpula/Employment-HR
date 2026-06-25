import { useState } from "react";
import Swal from "sweetalert2"
import { createEmployees } from "../services/employee.service";
import "../styles/employee.css"

const user = JSON.parse(localStorage.getItem('user'))

function AddEmployee() {
    const [employee, setEmployee] = useState({
        employeeName: "",
        email: "",
        mobileNo: "",
        department: "",
        employeeCode: "",
        designation: "",
        salary: "",
        gender: "",
        status: 1
    })

    const handlePage = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    const saveEmployee = async () => {
        try {
            const payload = {
                ...employee,
                userId: user?.loginId
            }
            const response = await createEmployees(payload)

            if (response.data.error == false) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(() => {
                    setEmployee({
                        employeeName: "",
                        employeeCode: "",
                        email: "",
                        mobileNo: "",
                        department: "",
                        designation: "",
                        salary: "",
                        gender: ""
                    })
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: response.data.message
                }).then(() => {
                    setEmployee({
                        employeeName: "",
                        employeeCode: "",
                        email: "",
                        mobileNo: "",
                        department: "",
                        designation: "",
                        salary: "",
                        gender: ""
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="page">
            <h2>Add Employee</h2>
            <div className="employee-form">
                <div className="form-group">
                    <label>Name : </label>
                    <input type="text" name="employeeName" value={employee.employeeName} onChange={handlePage} />
                </div>
                <div className="form-group">
                    <label>Gender : </label>
                    <select name="gender" value={employee.gender} onChange={handlePage}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>                </div>
                <div className="form-group">
                    <label>Email : </label>
                    <input type="email" name="email" value={employee.email} onChange={handlePage} />
                </div>
                <div className="form-group">
                    <label>MobileNo. : </label>
                    <input type="text" name="mobileNo" value={employee.mobileNo} onChange={handlePage} />
                </div>
                <div className="form-group">
                    <label>EmployeeCode : </label>
                    <input type="text" name="employeeCode" value={employee.employeeCode} onChange={handlePage} />
                </div>
                <div className="form-group">
                    <label>Department : </label>
                    <input type="text" name="department" value={employee.department} onChange={handlePage} />
                </div>
                <div className="form-group">
                    <label>Designation : </label>
                    <input type="text" name="designation" value={employee.designation} onChange={handlePage} />
                </div>
                <div className="form-group">
                    <label>Salary : </label>
                    <input type="text" name="salary" value={employee.salary} onChange={handlePage} />
                </div>

                <div className="form-group">
                    <label>Status : </label>
                    <div className="toggle-container">
                        <label className="switch">
                            <input type="checkbox" checked={employee.status == 1} onChange={(e) => setEmployee({
                                ...employee,
                                status: e.target.checked ? 1 : 0
                            })} /><span className="slider"></span>
                        </label>
                        <span className="staus-text">{employee.status == 1 ? "ON" : "OFF"}</span>
                    </div>
                </div>
                <div>
                    <button onClick={saveEmployee}>Save</button>
                </div>
            </div>

        </div>
    )
}

export default AddEmployee