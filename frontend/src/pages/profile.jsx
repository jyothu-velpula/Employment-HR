import "../styles/employee.css"
import "../styles/profile.css"
import { FaBuilding, FaEnvelope, FaUserCircle, FaUsers, FaUserTag } from "react-icons/fa"

function Profile(){
    const user = JSON.parse(localStorage.getItem("user"))
    
    return(
        <div className="profile-page">
            <h2>My Profile</h2>
            <div className="profile-container">
                <div className="profile-left">
                    <div className="profile-header">
                        <h3>{user.name}</h3>
                    </div>

                    <div className="profile-image">
                        <FaUserCircle/>
                    </div>

                    <div className="profile-info">
                        <div className="info-row">
                            <FaEnvelope/>
                            <span>{user.email}</span>
                        </div>

                        <div className="info-row">
                            <FaUserTag/>
                            <span>{user.role}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-right">
                    <h3>User Details</h3>
                    <div className="details-table">
                        <div className="label">Name : </div>
                        <div className="value">{user.name}</div>
                    </div>

                    <div className="details-table">
                        <div className="label">Email : </div>
                        <div className="value">{user.email}</div>
                    </div>

                    <div className="details-table">
                        <div className="label">Gender : </div>
                        <div className="value">{user.gender || "NA"}</div>
                    </div>

                    <div className="details-table">
                        <div className="label">Role : </div>
                        <div className="value">{user.role}</div>
                    </div>

                    <div className="details-table">
                        <div className="label">UserType : </div>
                        <div className="value">{user.userType}</div>
                    </div>
                    
                </div>

                {/* <h3>{user.name}</h3>
                <h3>Email : {user.email}</h3>
                <h3>Gender : {user.gender}</h3>
                <h3>Role : {user.role}</h3>
                <h3>UserType : {user.userType}</h3> */}
            </div>
        </div>
    )
}

export default Profile