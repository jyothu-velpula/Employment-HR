import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { createEmployees } from "../services/employee.service";
import { getCodeIdData } from "../services/masterData.service"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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

    const [genderList, setGenderList] = useState([])
    const [allDesig, setAllDesig] = useState([])
    const [allDepart, setAllDepart] = useState([])

    let handlePage = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        loadGender();
        getAllDepart();
        getAllDesig()
    }, [])

    const saveEmployee = async () => {
        try {

            if(!employee.employeeName || !employee.email || !employee.gender
                || !employee.mobileNo || !employee.department || !employee.employeeCode
                || !employee.salary || !employee.status
            ){
                toast.error("All Mandatory Fields Are Required.")
                return;
            }

            if (!emailRegex.test(employee.email)) {
                toast.error("Please enter a valid Email Address.");
                return;
            }

            // Mobile validation
            const mobileRegex = /^[6-9]\d{9}$/;

            if (!mobileRegex.test(employee.mobileNo)) {
                toast.error("Please enter a valid 10-digit Mobile Number.");
                return;
            }

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
                        gender: "",
                        status: 1
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
                        gender: "",
                        status: 1
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadGender = async () => {
        try {

            const response = await getCodeIdData({ codeId: "GEN" })
            setGenderList(response.data.result)
        } catch (err) {
            console.log(err)
        }
    }

    const getAllDepart = async () => {
        try {

            const response = await getCodeIdData({ codeId: "DEP" })
            setAllDepart(response.data.result)
        } catch (err) {
            console.log(err)
        }
    }

    const getAllDesig = async () => {
        try {

            const response = await getCodeIdData({ codeId: "DES" })
            setAllDesig(response.data.result)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="page">
                <h2>Add Employee</h2>
                <div className="employee-form">
                    <div className="form-group">
                        <label>Name : <span style={{ color: "red" }}>*</span></label>
                        <input type="text" name="employeeName" value={employee.employeeName} onChange={handlePage} />
                    </div>
                    <div className="form-group">
                        <label>Gender : <span style={{ color: "red" }}>*</span></label>
                        <select name="gender" value={employee.gender} onChange={handlePage}>
                            <option value="">Select Gender</option>
                            {
                                genderList.map((item) => (
                                    <option key={item.id} value={item.systemCode}> {item.systemCodeDsesc} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Email : <span style={{ color: "red" }}>*</span></label>
                        <input type="email" name="email" value={employee.email} onChange={handlePage} />
                    </div>
                    <div className="form-group">
                        <label>MobileNo. : <span style={{ color: "red" }}>*</span></label>
                        <input type="tel" name="mobileNo" value={employee.mobileNo} onChange={handlePage} maxLength={10}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }} />
                    </div>
                    <div className="form-group">
                        <label>EmployeeCode : <span style={{ color: "red" }}>*</span> </label>
                        <input type="text" name="employeeCode" value={employee.employeeCode} onChange={handlePage} />
                    </div>
                    <div className="form-group">
                        <label>Department : <span style={{ color: "red" }}>*</span></label>
                        <select name="department" value={employee.department} onChange={handlePage}>
                            <option value="">Select Deparment</option>
                            {
                                allDepart.map((item) => (
                                    <option key={item.id} value={item.systemCode}> {item.systemCodeDsesc} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Designation : <span style={{ color: "red" }}>*</span></label>
                        <select name="department" value={employee.designation} onChange={handlePage}>
                            <option value="">Select Designation</option>
                            {
                                allDesig.map((item) => (
                                    <option key={item.id} value={item.systemCode}> {item.systemCodeDsesc} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Salary : <span style={{ color: "red" }}>*</span></label>
                        <input type="text" name="salary" value={employee.salary} onChange={handlePage} onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                        }} />
                    </div>

                    <div className="form-group">
                        <label>Status : <span style={{ color: "red" }}>*</span></label>
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
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </>
    )
}

export default AddEmployee