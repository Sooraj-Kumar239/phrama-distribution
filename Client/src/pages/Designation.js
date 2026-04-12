    import { useEffect, useState } from "react";
    import Layout from "../components/Layout";
    import { useNavigate } from "react-router-dom";
    import API_BASE_URL from "../config";


    function Designation() {
            

        const [errors, setErrors] = useState({});
        const [title, setTitle] = useState("");
        const [baseSalary, setBaseSalary] = useState("");
        const [designation, setDesignation] = useState([]);

        const [message, setMessage] = useState("");
        const [msgType, setMsgType] = useState("");
        // show form
        const [showForm, setShowForm] = useState(false);
        const navigate = useNavigate(); 

        const inputStyle = {
            width: "20%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
        };

        const addBtn = {
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
        };

        // Fetch Data
        const fetchDesignation = () => {
            fetch(`${API_BASE_URL}/designation`)
                .then(res => res.json())
                .then(data => setDesignation(data))
                .catch(err => console.log(err));
        };

        useEffect(() => {
            fetchDesignation();
        }, []);
        useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("msg") === "updated") {
            setMessage("Designation Updated Successfully");
            setMsgType("success");

            setTimeout(() => setMessage(""), 3000);
        }
    }, []);

        // Add Designation
        const addDesignation = () => {
            // validation
        const newErrors = {};

            if (!title.trim()) newErrors.title = "Title required";
            if (!baseSalary.trim()) newErrors.baseSalary = "Base Salary required";
            else if (isNaN(baseSalary)) newErrors.baseSalary = "Must be number";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            fetch(`${API_BASE_URL}/designation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Title: title,
                    BaseSalary: baseSalary
                })
            })
            .then(res => res.text())
            .then(() => {
                setMessage("Designation Added Successfully");
                setMsgType("success");

                setTitle("");
                setBaseSalary("");

                fetchDesignation();
                setShowForm(false);
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => console.log(err));
            setShowForm(false);
        };

        // Delete
        const deleteDesignation = (id) => {
                // for debuggoing
                console.log("deletec clicked");
                // for pop up messggage confirmation
                const confrimDelete= window.confirm("you want to delete this designatioin?");
                    if(!confrimDelete)
                        {
                            return;
                        }
                fetch(`${API_BASE_URL}/designation/${id}`, {
                method: "DELETE"
            })
            .then(() => {
                setMessage("Deleted Successfully");
                setMsgType("delete");

                fetchDesignation();

                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => console.log(err));
        };

        return (
            
            <Layout>
                
                    <button 
                        onClick={() => setShowForm(!showForm)} 
                        style={{ marginBottom: "10px" }}
                        >
                        {showForm ? "Close Form" : "Add Designation"}
                    </button>
                <div>

                    {message && (
                        <div style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            backgroundColor:
                                msgType === "success" ? "green" :
                                msgType === "delete" ? "red" : "#007bff",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px"
                        }}>
                            {message}
                        </div>
                    )}

                    {/* <h3>Add Designation</h3> */}

                    {showForm && (
        <>
            <h3>Add Designation</h3>

            <input
                style={{
                    ...inputStyle,
                    border: errors.title ? "2px solid red" : "1px solid #ccc"
                }}
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: "" });
                }}
            />

            <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                {errors.title}
            </div>


            <input
                style={{
                    ...inputStyle,
                    border: errors.baseSalary ? "2px solid red" : "1px solid #ccc"
                    }}
                    placeholder="Base Salary"
                    value={baseSalary}
                    onChange={(e) => {
                        setBaseSalary(e.target.value);
                        setErrors({ ...errors, baseSalary: "" });
                    }}
                />

                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                    {errors.baseSalary}
                </div>

            <br />
            <button style={addBtn} onClick={addDesignation}>
                Add Designation
            </button>
        </>
    )}

                    <h2>All Designations</h2>

                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Base Salary</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {designation.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No data found</td>
                                </tr>
                            ) : (
                                designation.map((d) => (
                                    <tr key={d.DesignationID}>
                                        <td>{d.Title}</td>
                                        <td>{d.BaseSalary}</td>
                                        <td>
                                            <button
                                                onClick={() => navigate(`/designations/edit/${d.DesignationID}`)}
                                                style={{
                                                    backgroundColor: "blue",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px",
                                                    borderRadius: "5px"
                                                }}
                                                >
                                                edit
                                            </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => deleteDesignation(d.DesignationID)}
                                                        style={{
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "5px",
                                                        borderRadius: "5px"
                                                    }}
                                                    >
                                                    Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>
            </Layout>
        );
    }

    export default Designation;
    const internalCSS = `
    .form-box {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
    }

    .my-input {
        width: 100%;           /* Full width cover karega */
        max-width: 300px;      /* Lekin 300px se zyada bada nahi hoga */
        padding: 10px;
        margin-bottom: 5px;    /* Input ke niche thodi jagah */
        border-radius: 4px;
        border: 1px solid #ccc;
        display: block;        /* Ek ke niche ek aayenge */
    }

    .error-msg {
        color: red;
        font-size: 12px;
        margin-bottom: 10px;
        display: block;
    }

    .save-btn {
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .desig-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .desig-table th, .desig-table td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
    }

    .desig-table th {
        background-color: #f4f4f4;
    }
`;