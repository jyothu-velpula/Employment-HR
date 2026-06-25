import SideBar from "../components/Sidebar"
import Header from "../components/Header"
import DashboardHome from "../pages/DashboardHome"
import "../styles/dashboard.css"
import { useState } from "react"

import { Routes, Route } from "react-router-dom"
import EmployeeList from "./EmployeeList"
import AddEmployee from "./AddEmployee"
import Profile from "./profile"

// function Dashboard() {
//     return (
//         <div className="dashboard">
//             <SideBar />
//             <div className="main-content">
//                 <Header />
//                 <Routes>
//                     <Route 
//                     index
//                     element ={<DashboardHome/>}/>
//                     <Route 
//                     path = "employees"
//                     element = {<EmployeeList/>}/>
//                     <Route 
//                     path = "addEmployee"
//                     element = {<AddEmployee/>}/>
//                     <Route 
//                     path = "profile"
//                     element = {<Profile/>}/>
//                 </Routes>
//             </div>
//         </div>
//     )
// }

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
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard