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