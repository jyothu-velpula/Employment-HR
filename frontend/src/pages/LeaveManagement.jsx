import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/leave.css"

import {
    createLeave,
    getAllLeave,
    deleteLeave
} from "../services/leave.service";

import "../styles/leave.css";

const user = JSON.parse(localStorage.getItem("user"));
console.log("use",user.employeeId)

function LeaveManagement() {

    const [leaveList, setLeaveList] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [leave, setLeave] = useState({

        employee: user.employeeId,

        userId: user.loginId,

        leaveType: "",

        fromDate: "",

        toDate: "",

        reason: ""

    });

    useEffect(() => {

        loadLeave();

    }, []);

    const handleChange = (e) => {

        setLeave({

            ...leave,

            [e.target.name]: e.target.value

        });

    };

    const saveLeave = async () => {

        const response = await createLeave(leave);

        if (!response.data.error) {

            Swal.fire({

                icon: "success",

                text: response.data.message

            });

            setShowForm(false);

            loadLeave();

        } else {

            Swal.fire({

                icon: "error",

                text: response.data.message

            });

        }

    };

    const loadLeave = async () => {

        const response = await getAllLeave();

        setLeaveList(response.data.result || []);

    };

    const removeLeave = (id) => {

        Swal.fire({

            title: "Delete?",

            icon: "warning",

            showCancelButton: true

        }).then(async (result) => {

            if (result.isConfirmed) {

                await deleteLeave({ id });

                loadLeave();

            }

        });

    };

    return (

        <div className="leave-container">

            <div className="top-bar">

                <h2>Leave Management</h2>

                <button

                    className="add-btn"

                    onClick={() => setShowForm(!showForm)}

                >

                    {showForm ? "Close" : "Apply Leave"}

                </button>

            </div>

            {
                showForm &&

                <div className="leave-form">

                    <div className="form-group">

                        <label>Leave Type</label>

                        <select

                            name="leaveType"

                            value={leave.leaveType}

                            onChange={handleChange}

                        >

                            <option value="">Select</option>

                            <option value="CL">Casual Leave</option>

                            <option value="SL">Sick Leave</option>

                            <option value="EL">Earned Leave</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>From Date</label>

                        <input

                            type="date"

                            name="fromDate"

                            value={leave.fromDate}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group">

                        <label>To Date</label>

                        <input

                            type="date"

                            name="toDate"

                            value={leave.toDate}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group full">

                        <label>Reason</label>

                        <textarea

                            rows="4"

                            name="reason"

                            value={leave.reason}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="save-div">

                        <button

                            className="save-btn"

                            onClick={saveLeave}

                        >

                            Submit

                        </button>

                    </div>

                </div>

            }

            <table>

                <thead>

                    <tr>

                        <th>SL</th>

                        <th>Leave Type</th>

                        <th>From</th>

                        <th>To</th>

                        <th>Total Days</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaveList.length > 0 ?

                            leaveList.map((item, index) => (

                                <tr key={item.id}>

                                    <td>{index + 1}</td>

                                    <td>{item.leaveType}</td>

                                    <td>{item.fromDate}</td>

                                    <td>{item.toDate}</td>

                                    <td>{item.totalDays}</td>

                                    <td>{item.status}</td>

                                    <td>

                                        <button

                                            className="delete-btn"

                                            onClick={() => removeLeave(item.id)}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td

                                    colSpan="7"

                                    align="center"

                                >

                                    No Leave Applied

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default LeaveManagement;