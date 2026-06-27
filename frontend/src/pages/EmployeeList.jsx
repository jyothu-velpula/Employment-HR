import React , { useState, useEffect } from "react"
import {getEmployees, getAllEmployees, createEmployees, deleteEmployees, updateEmployees} from "../services/employee.service"
import Swal from "sweetalert2"
import "../styles/employee.css"

function EmployeeList(){
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    const [search,setSearch] = useState("")

    useEffect(()=>{
        loadEmployees()
    },[])

    const loadEmployees = async()=> {
        try{
            setLoading(true)
            const response = await getAllEmployees();
            setEmployee(response.data.result);
        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const deleteEmp = async(id)=>{
        Swal.fire({
            title : "Delete Employee ?",
            text : "This Action Cannot Be Undo.",
            icon : "warning",
            showCloseButton : true,
            confirmButtonColor : "#d33",
            confirmButtonText : "Delete"
        }).then(async(result)=> {
            if(result.isConfirmed){
                const response = await deleteEmployees(id)
                if(response.data.error == false){
                    Swal.fire({
                        title : "Deleted!",
                        text : response.data.message,
                        icon : "success"
                    })
                    loadEmployees()
                } else {
                    Swal.fire({
                        title : "Error!",
                        text : response.data.message,
                        icon : "error"
                    })
                    loadEmployees()
                }
            }
        })
    }

    const filteredEmployees = (employee || []).filter((emp)=> {
        return(
            emp.employeeName.toUpperCase().includes(search.toUpperCase()) || 
            emp.department.toUpperCase().includes(search.toUpperCase()) ||
            emp.designation.toUpperCase().includes(search.toUpperCase()) ||
            emp.mobileNo.includes(search) ||
            emp.email.includes(search) || emp.salary.includes(search)
        )
    })

    return(
        <div className="employee-container">
            <h2>Employee Management</h2>
            <input type= "text" placeholder="Search" className="search-box" value={search}
            onChange={(e)=>setSearch(e.target.value)}></input>

            {
                loading ?
                <h3>Loading Employees.....</h3> : 
                <table>
                    <thead>
                        <tr>
                            <td>SL. No.</td>
                            <td>Emp Name</td>
                            <td>Email</td>
                            <td>Phone No.</td>
                            <td>Department</td>
                            <td>Designation</td>
                            <td>Salary</td>
                            <td>Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (
                            filteredEmployees.length>0 ?
                            (
                                filteredEmployees.map((employee,index)=>(
                                    <tr key={employee.id}>
                                        <td>{index+1}</td>
                                        <td>{employee.employeeName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobileNo}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.salary}</td>

                                        <td>
                                            <button className="delete-btn" onClick={()=> deleteEmp(employee.id)}>
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : 
                            (
                                <tr>
                                    <td colSpan='8' style={{textAlign: "center"}}>No Employees Found</td>
                                </tr>
                            )
                        )
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default EmployeeList