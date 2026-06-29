import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/leaveApproval.css"

import {

    getAllLeave,

    approveLeave

} from "../services/leave.service";

import "../styles/leave.css";

const user = JSON.parse(localStorage.getItem("user"));

function LeaveApproval() {

    const [leaveList, setLeaveList] = useState([]);

    const [remarks, setRemarks] = useState("");

    const [selectedLeave, setSelectedLeave] = useState(null);

    useEffect(() => {

        loadLeave();

    }, []);

    const loadLeave = async () => {

        const response = await getAllLeave({});

        setLeaveList(response.data.result);

    }

    const updateStatus = async (status) => {

        const response = await approveLeave({

            id: selectedLeave,

            status,

            approvedBy: user.loginId,

            remarks

        });

        if (!response.data.error) {

            Swal.fire({

                icon: "success",

                text: response.data.message

            });

            setRemarks("");

            setSelectedLeave(null);

            loadLeave();

        }

    }

    return (

        <div className="leave-container">

            <h2>Leave Approval</h2>

            <table>

                <thead>

                    <tr>

                        <th>SL</th>

                        <th>Employee</th>

                        <th>Department</th>

                        <th>Leave Type</th>

                        <th>From</th>

                        <th>To</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        (Array.isArray(leaveList) && leaveList.length > 0 ?
                            (
                                leaveList.map((item, index) => (

                                    <tr key={item.id}>

                                        <td>{index + 1}</td>

                                        <td>{item.employeeName}</td>

                                        <td>{item.department}</td>

                                        <td>{item.leaveType}</td>

                                        <td>{item.fromDate}</td>

                                        <td>{item.toDate}</td>

                                        <td>

                                            <span className={`status ${item.status.toLowerCase()}`}>

                                                {item.status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                item.status == "Pending" &&

                                                <>

                                                    <button

                                                        className="approve-btn"

                                                        onClick={() => setSelectedLeave(item.id)}

                                                    >

                                                        Approve

                                                    </button>

                                                </>

                                            }

                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                        No Data Found
                                    </td>
                                </tr>)
                        )

                    }

                </tbody>

            </table>

            {

                selectedLeave &&

                <div className="modal-overlay">

                    <div className="modal">

                        <h2>Approve Leave</h2>

                        <textarea

                            rows="5"

                            placeholder="Remarks"

                            value={remarks}

                            onChange={(e) => setRemarks(e.target.value)}

                        />

                        <div className="modal-buttons">

                            <button

                                className="approve-btn"

                                onClick={() => updateStatus("Approved")}

                            >

                                Approve

                            </button>

                            <button

                                className="reject-btn"

                                onClick={() => updateStatus("Rejected")}

                            >

                                Reject

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    )

}

export default LeaveApproval;