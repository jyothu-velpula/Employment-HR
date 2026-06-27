import { Link, useNavigate} from "react-router-dom"
import { FaHome, FaUsers, FaUserPlus, FaUserCircle, FaSignOutAlt, FaDatabase } from "react-icons/fa"
import Swal from "sweetalert2"
import "../styles/sidebar.css"

function Sidebar({collapsed}){
    const navigate = useNavigate()
    const logout = ()=> {
        Swal.fire({
            title : "Logout?",
            text : "Do you want to Logout?",
            icon : "question",
            showCancelButton : true,
            confirmButtonText : "LogOut"
        }).then((result)=> {
            if(result.isConfirmed){
                localStorage.clear();
                navigate('/')
            }
        })
    }

    return(
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <h2>{collapsed ? "EPM" : "Employee Portal"}</h2>
            <ul>
                <li>
                    <Link to = "/dashboard">
                    <FaHome/>{!collapsed && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link to = "/dashboard/Employees">
                    <FaUsers/>{!collapsed && <span>Employees</span>}
                    </Link>
                </li>
                <li>
                    <Link to = "/dashboard/addEmployee">
                    <FaUserPlus/> {!collapsed && <span>Add Employee</span>}
                    </Link>
                </li>
                <li>
                    <Link to = "/dashboard/profile">
                    <FaUserCircle/> {!collapsed && <span>Profile</span>}
                    </Link>
                </li>

                <li>
                    <Link to = "/dashboard/masterData">
                    <FaDatabase/> {!collapsed && <span>Master Data</span>}
                    </Link>
                </li>

                <li onClick={logout}>
                    <FaSignOutAlt/> {!collapsed && <span>LogOut</span>}
                </li>
            </ul>
        </div>
    )
}

export default Sidebar