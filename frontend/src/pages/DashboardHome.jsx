import axios from "axios"
import "../styles/dashboard.css"
import { useState, useEffect } from "react"
import { getCodeIdData } from "../services/masterData.service"
import { getAllEmployees } from "../services/employee.service"

function DashboardHome() {
    const [department, setDepartment] = useState([])
    const [allDepart, setAllDepart] = useState([])
    const [eachDeaprt, setEachDepart] = useState({})
    const [loading, setLoading] = useState(true)

    const getDesig = async () => {
        try {
            const response = await getCodeIdData({ codeId: "DESC" })
            setDesignation(response.data.count)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDepart();
        getAllDeaprt()
    }, [])

    const getDepart = async () => {
        try {
            const response = await getCodeIdData({ codeId: "DEP" })
            setDepartment(response.data.count)
        } catch (err) {
            console.log(err)
        }
    }

    const getAllDeaprt = async () => {
        try {
            const response = await getAllEmployees()
            const employeesData = response.data.result
            setAllDepart(response.data.count)

            const departCount = employeesData.reduce((acc, emp) => {
                acc[emp.department] = (acc[emp.department] || 0) + 1
                return acc;
            }, {})

            setEachDepart(departCount)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="card-container">
                <div className="card">
                    <h3>Employees</h3>
                    <h2 style={{ marginTop: "20px" }}>{allDepart}</h2>
                </div>
                <div className="card">
                    <h3>Departments</h3>
                    <h2 style={{ marginTop: "20px" }}>{department}</h2>
                </div>
                <div className="card">
                    <h3>HR</h3>
                    <h2 style={{ marginTop: "20px" }}>2</h2>
                </div>
                <div className="card">
                    <h3>Admins</h3>
                    <h2 style={{ marginTop: "20px" }}>2</h2>
                </div>
            </div>
            <div className="department-list">
                <h3>Department Wise Data</h3>
                {Object.keys(eachDeaprt).length > 0 ? (
                    Object.entries(eachDeaprt).map(([dept, count]) => (
                        <div key={dept} className="department-item">
                            <span>{dept}</span>
                            <span>{count}</span>
                        </div>
                    ))
                ) : (
                    <p>No Data Is found.</p>
                )
                }
            </div>
        </div>
    )
}

export default DashboardHome