// import "../styles/dashboard.css"
// import { FaBars } from "react-icons/fa"
// const user = JSON.parse(localStorage.getItem('user'))

// function Header({ collapsed, setCollapsed }){
//     return(
//         <div className="header">
//             <FaBars className="menu-btn" onClick={()=>setCollapsed(!collapsed)}/>
//             <div>
//                 <h3>Welcome, {user.name || "Admin"}</h3>
//             </div>
//         </div>
//     )
// }

// export default Header


import { FaBars } from "react-icons/fa";

const user = JSON.parse(localStorage.getItem("user"));

function Header({ collapsed, setCollapsed }) {

    return (
        <div className="header">

            <FaBars
                className="menu-btn"
                onClick={() => {
                    console.log("Before:", collapsed);
                    setCollapsed(prev => !prev);
                }}
            />

            <h3>Welcome, {user.name}</h3>

        </div>
    );
}

export default Header;