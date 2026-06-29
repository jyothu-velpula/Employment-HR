import SideBar from "../components/Sidebar"
import Header from "../components/Header"
import DashboardHome from "../pages/DashboardHome"
import MasterData from "../pages/masterData"
import "../styles/dashboard.css"
import { useState } from "react"
import LeaveManagement from "../pages/LeaveManagement"
import LeaveApproval from "./leaveApproval"

import { Routes, Route } from "react-router-dom"
import EmployeeList from "./EmployeeList"
import AddEmployee from "./AddEmployee"
import Profile from "./profile"

function Dashboard(){
    const [collapsed, setCollapsed] = useState(false)

    return(
        <div className="dashboard">
            <SideBar collapsed = {collapsed}/>
            <div className={`main-content ${collapsed ? "expanded" : ""}`}>
                <Header collasped = {collapsed} setCollapsed = {setCollapsed}/>
                <Routes>
                    <Route 
                    index
                    element ={<DashboardHome/>}/>
                    <Route 
                    path = "employees"
                    element = {<EmployeeList/>}/>
                    <Route 
                    path = "addEmployee"
                    element = {<AddEmployee/>}/>
                    <Route 
                    path = "profile"
                    element = {<Profile/>}/>
                    <Route 
                    path = "masterData"
                    element = {<MasterData/>}/>
                    <Route 
                    path = "leave"
                    element = {<LeaveManagement/>}/>
                    <Route
                    path = "leaveApproval"
                    element = {<LeaveApproval/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard