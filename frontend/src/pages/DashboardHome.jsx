import "../styles/dashboard.css"

function DashboardHome(){
    return(
        <div>
            <h2>Dashboard</h2>
            <div className="card-container">
                <div className="card">
                    <h3>Employees</h3>
                    <h2>120</h2>
                </div>
                <div className="card">
                    <h3>Departments</h3>
                    <h2>5</h2>
                </div>
                <div className="card">
                    <h3>HR</h3>
                    <h2>2</h2>
                </div>
                <div className="card">
                    <h3>Admins</h3>
                    <h2>2</h2>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome