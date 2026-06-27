import React from "react";
import { useState, useEffect } from "react";
import { createMasterData, getAllMasterData, updateMasterData } from "../services/masterData.service"
import Swal from "sweetalert2";
import "../styles/masterData.css"
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function MasterData() {
    const [masterDataList, setMasterDataList] = useState([])
    const [updateData, setUpdateData] = useState({
        codeType: "",
        systemCode: "",
        systemCodeDesc: ""
    })
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [masterData, setMasterData] = useState({
        codeType: "",
        systemCode: "",
        systemCodeDesc: ""
    })

    useEffect(() => {
        console.log("useEffect called");
        loadingMasterData()
    }, [])

    const handlepage = (e) => {
        setMasterData({
            ...masterData,
            [e.target.name]: e.target.value
        })
    }

    const updateHandlePage = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    }

    const showToast = (message) => {

    }

    const createMaster = async () => {
        if (!masterData.codeType?.trim()) {
            toast.error("Code Type is required");
            return;
        }

        if (!masterData.systemCode?.trim()) {
            toast.error("System Code is required");
            return;
        }

        if (!masterData.systemCodeDesc?.trim()) {
            toast.error("System Code Description is required");
            return;
        }
        try {
            const response = await createMasterData(masterData)

            if (response.data.error == false) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then((result) => {
                    setMasterData({
                        codeType: "",
                        systemCode: "",
                        systemCodeDesc: ""
                    })

                    setShowForm(false);
                    loadingMasterData()
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: response.data.message
                }).then((result) => {
                    setMasterData({
                        codeType: "",
                        systemCode: "",
                        systemCodeDesc: ""
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateMaster = async () => {
        if (!updateData.codeId?.trim()) {
            toast.error("Code Id is required");
            return;
        }

        if (!updateData.systemCode?.trim()) {
            toast.error("System Code is required");
            return;
        }

        if (!updateData.systemCodeDesc?.trim()) {
            toast.error("System Code Description is required");
            return;
        }
        try {
            const response = await updateMasterData(updateData)
            setShowUpdateForm(false);

            if (response.data.error == false) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then((result) => {
                    setUpdateData({
                        codeType: "",
                        systemCode: "",
                        systemCodeDesc: ""
                    })

                    setShowUpdateForm(false);
                    loadingMasterData()
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: response.data.message
                }).then((result) => {
                    setUpdateData({
                        codeType: "",
                        systemCode: "",
                        systemCodeDesc: ""
                    })

                    setShowUpdateForm(false);
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadingMasterData = async () => {
        try {
            setLoading(true)
            const response = await getAllMasterData()
            setMasterDataList(response.data.result)
            setLoading(false)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const filterData = (masterDataList || []).filter((mas) => {
        return (
            mas.codeId?.toUpperCase().includes(search.toUpperCase()) ||
            mas.codeType?.toUpperCase().includes(search.toUpperCase()) ||
            mas.systemCode?.toUpperCase().includes(search.toUpperCase()) ||
            mas.systemCodeDsesc?.toUpperCase().includes(search.toUpperCase())
        );
    });


    return (
        <>
            <div>
                <div>
                    <button className="add-btn" onClick={() => setShowForm(!showForm)}>{showForm ? "Close" : "Add"}</button>
                    {
                        showForm && (
                            <div className="form-container">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label> Code Type : <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" name="codeType" placeholder="Enter CodeType" value={masterData.codeType} onChange={handlepage} />
                                    </div>
                                    <div className="form-group">
                                        <label> SystemCode : <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" name="systemCode" placeholder="Enter systemCode" value={masterData.systemCode} onChange={handlepage} />
                                    </div>
                                    <div className="form-group">
                                        <label> SystemCode Desc : <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" name="systemCodeDesc" placeholder="Enter systemCodeDesc" value={masterData.systemCodeDesc} onChange={handlepage} />
                                    </div>

                                    <div className="form-group">
                                    </div>

                                </div>
                                <div className="save-div" style={{ alignItems: "center" }}>
                                    <button className="save-btn" onClick={createMaster}>Save</button>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className="list-container">
                    <h2>Master Data</h2>
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search " value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {
                        loading ?
                            (<h3>Loading Employees.....</h3>) :
                            (
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Sl. No.</td>
                                                <td>CodeId</td>
                                                <td>CodeType</td>
                                                <td>System Code</td>
                                                <td>System Code Desc</td>
                                                <td>Action</td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                (
                                                    filterData.length > 0 ?
                                                        (
                                                            filterData.map((item, index) => (
                                                                <tr key={item.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.codeId}</td>
                                                                    <td>{item.codeType}</td>
                                                                    <td>{item.systemCode}</td>
                                                                    <td>{item.systemCodeDsesc}</td>

                                                                    <td>
                                                                        <button className="update-btn" onClick={() => {
                                                                            setUpdateData({
                                                                                id: item.id,
                                                                                codeId: item.codeId,
                                                                                systemCode: item.systemCode,
                                                                                systemCodeDesc: item.systemCodeDesc
                                                                            });
                                                                            setShowUpdateForm(true)
                                                                        }}>Edit</button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) :
                                                        (
                                                            <tr>
                                                                <td colSpan='8' style={{ textAlign: "center" }}>No Data Found.....</td>
                                                            </tr>
                                                        )
                                                )
                                            }
                                        </tbody>
                                    </table>

                                    {
                                        showUpdateForm && (
                                            <div className="modal-overlay">
                                                <div className="modal">
                                                    <div className="form-group">
                                                        <label style={{ color: "#857b7b" }}> CodeId : <span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" name="codeId" placeholder="Enter CodeId" value={updateData.codeId} readOnly />
                                                    </div>
                                                    <div className="form-group">
                                                        <label> SystemCode : <span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" name="systemCode" placeholder="Enter systemCode" value={updateData.systemCode} onChange={updateHandlePage} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label> SystemCode Desc : <span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" name="systemCodeDesc" placeholder="Enter systemCodeDesc" value={updateData.systemCodeDesc} onChange={updateHandlePage} />
                                                    </div>

                                                    <div className="modal-buttons" >
                                                        <button className="cancel-btn" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                                                        <button className="save-btn" onClick={updateMaster}>Save</button>
                                                    </div>

                                                </div>
                                                {/* <div className="modal-buttons" >
                                                <button className="cancel-btn" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                                                <button className="save-btn" onClick={updateMaster}>Save</button>
                                            </div> */}
                                            </div>
                                        )
                                    }
                                </>
                            )
                    }
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </>
    )

}

export default MasterData